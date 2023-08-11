using Store.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Store.Core.Common.Interfaces.Repositories
{
    public interface IOrderRepository
    {
        public Task<Order> Create(Order newOrder);
        public Task<List<Order>> History(int id);
        public Task<List<Order>> GetAllOrders();
        public Task UpdateDeliveryStatus();
        public Task<IEnumerable<Order>> Find(Expression<Func<Order, bool>> predicate);
        public Task<bool> CancelOrder(int orderId, int userId);
    }
}
