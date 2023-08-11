using Store.Core.Common.Interfaces.Repositories;
using Store.Core.Common.Interfaces.UnitOfWork;
using Store.Core.Data.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Xml.Linq;

namespace Store.Core.Data
{
    public class UnitOfWork : IUnitOfWork
    {
        private readonly StoreDataContext _context;

        public UnitOfWork(StoreDataContext context)
        {
            _context = context;
        }

        public IUserRepository UserRepository => new UserRepository(_context);
        public IArticleRepository ArticleRepository => new ArticleRepository(_context);
        public IOrderRepository OrderRepository => new OrderRepository(_context);
        public async Task<bool> SaveAsync()
        {
            return await _context.SaveChangesAsync() > 0;
        }
        public void Dispose()
        {
            _context.Dispose();
        }
    }
}
