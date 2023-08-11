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
    public class ArticleRepository : IArticleRepository
    {
        private readonly StoreDataContext _data;

        public ArticleRepository(StoreDataContext data)
        {
            _data = data;
        }
        public async Task<bool> Create(Article article)
        {
            _data.Articles.Add(article);
            await _data.SaveChangesAsync();
            return true;
        }
        public async Task<Article> GetArticle(int id)
        {
            var article = await _data.Articles.FirstOrDefaultAsync(a => a.Id == id);
            return article;
        }
        public async Task<bool> Update(Article article)
        {
            var oldArticle = await _data.Articles.SingleOrDefaultAsync(x => x.Id == article.Id);

            if (oldArticle != null && oldArticle.SalesmanId == article.SalesmanId)
            {

                oldArticle.Name = article.Name;
                oldArticle.Price = article.Price;
                oldArticle.Quantity = article.Quantity;
                oldArticle.Description = article.Description;
                if(!String.IsNullOrWhiteSpace( article.Picture))
                    oldArticle.Picture = article.Picture;
                await _data.SaveChangesAsync();
                return true;
            }
            return false;
        }
        public async Task<bool> Delete(int id, int salesmanId)
        {
            var oldArticle = await _data.Articles.FindAsync(id);
            var itemsToDelete = await _data.Items.Where(a => a.ArticleId == id).ToListAsync();
            var orderIdsToDelete = itemsToDelete.Select(i => i.OrderId).Distinct().ToList();
            var ordersToDelete = await _data.Orders.Where(o => orderIdsToDelete.Contains(o.Id)).ToListAsync();

            if (ordersToDelete != null && ordersToDelete.Count > 0)
            {
                foreach (var order in ordersToDelete)
                {
                    if (order.Status == "Delivering")
                        return false;
                }
            }

            if (oldArticle != null && oldArticle.SalesmanId == salesmanId)
            {
                _data.Items.RemoveRange(itemsToDelete);
                _data.Orders.RemoveRange(ordersToDelete);
                _data.Articles.RemoveRange(oldArticle);
                await _data.SaveChangesAsync();
                return true;
            }
            return false;
        }
        public async Task<bool> DoesArticleExistById(int id)
        {
            return await _data.Articles.AnyAsync(u => u.Id == id);
        }
        //public async Task<List<Article>> GetSalesmanArticles(int id)
        //{
        //    return await _data.Articles.Where(a => a.SelesmanId == id).ToListAsync();
        //}

        //public async Task<List<Article>> GetAllArticles()
        //{
        //    return await _data.Articles.Where(a => a.Quantity > 0).ToListAsync();
        //}

        public async Task<IEnumerable<Article>> Find(Expression<Func<Article, bool>> predicate)
        {
            return await _data.Articles.Where(predicate).ToListAsync();
        }
    }
}
