using Microsoft.EntityFrameworkCore;
using Store.Core.Common.Interfaces.Repositories;
using Store.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Store.Core.Data.Repositories
{
    public class OrderRepository : IOrderRepository
    {
        private readonly StoreDataContext _data;

        public OrderRepository(StoreDataContext data)
        {
            _data = data;
        }

        public async Task<Order> Create(Order newOrder)
        {
            var article = await _data.Articles.SingleOrDefaultAsync(x => x.Id == newOrder.Item.ArticleId);
            if (article.Quantity < newOrder.Item.Quantity)
                return null;
            Random random = new Random();
            int randomMinutes = random.Next(10, 59);
            newOrder.Creation = DateTime.Now;
            newOrder.Delivery= DateTime.Now.AddHours(1).AddMinutes(randomMinutes);
            newOrder.Status = "Delivering";
            newOrder.Price = (article.Price * newOrder.Item.Quantity) + 20; //for delivery it costs 20
            newOrder.Item.ArticleName = article.Name;
            var result = await _data.Orders.AddAsync(newOrder);
            article.Quantity -= newOrder.Item.Quantity;
            await _data.SaveChangesAsync();
            return result.Entity;
        }

        public async Task<List<Order>> History(int id)
        {
            var historys = await _data.Orders
                .Include(o => o.Item)
                .Where(o => (o.UserId == id || o.SalesmanId == id) && o.Status == "Delivered")
                .ToListAsync();
            return historys;
        }

        public async Task<List<Order>> GetAllOrders()
        {
            var orders = await _data.Orders
                .Include(o => o.Item)
                .ToListAsync();
            return orders;
        }

        public async Task UpdateDeliveryStatus()
        {
            var orders = await _data.Orders.Where(o => o.Status == "Delivering").ToListAsync();

            foreach (var order in orders)
            {
                if (order.Delivery < DateTime.Now)
                    order.Status = "Delivered";
            }

            await _data.SaveChangesAsync();
        }

        //public async Task<List<Order>> GetUserActiveOrders(int id)
        //{
        //    var userOrders = await _data.Orders.Where(o => o.UserId == id && o.Status == "Delivering")
        //       .Include(o => o.Item)
        //       .ToListAsync();
        //    return userOrders;
        //}

        //public async Task<List<Order>> GetSelesmanActiveOrders(int id)
        //{
        //    var userOrders = await _data.Orders.Where(o => o.SelesmanId == id && o.Status == "Delivering")
        //       .Include(o => o.Item)
        //       .ToListAsync();
        //    return userOrders;
        //}

        public async Task<IEnumerable<Order>> Find(Expression<Func<Order, bool>> predicate)
        {
            return await _data.Orders.Where(predicate)
                .Include(o => o.Item)
                .ToListAsync();
        }

        public async Task<bool> CancelOrder(int orderId, int userId)
        {
            var order = await _data.Orders
                .Where(o => o.Id == orderId)
                .Include(o => o.Item)
                .SingleOrDefaultAsync();
            if (order == null || order.UserId != userId)
                return false;

            TimeSpan elapsed = DateTime.Now - order.Creation;
            if (elapsed.TotalHours < 1)
                return false;

            var article = await _data.Articles.Where(a => a.Id == order.Item.ArticleId).SingleOrDefaultAsync();
            if (article == null)
                return false;

            article.Quantity += order.Item.Quantity;
            order.Status = "Cancelled";
            await _data.SaveChangesAsync();
            return true;
        }
    }
}
