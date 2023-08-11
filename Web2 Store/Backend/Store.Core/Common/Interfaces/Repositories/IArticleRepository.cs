using Store.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Store.Core.Common.Interfaces.Repositories
{
    public interface IArticleRepository
    {
        public Task<bool> Create(Article article);
        public Task<Article> GetArticle(int id);
        public Task<bool> Update(Article article);
        public Task<bool> Delete(int id, int salesmanId);
        public Task<bool> DoesArticleExistById(int id);
        public Task<IEnumerable<Article>> Find(Expression<Func<Article, bool>> predicate);
    }
}
