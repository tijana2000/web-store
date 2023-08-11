﻿using Store.Core.Common.Interfaces.Repositories;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Store.Core.Common.Interfaces.UnitOfWork
{
    public interface IUnitOfWork : IDisposable
    {
        IUserRepository UserRepository { get; }
        IArticleRepository ArticleRepository{ get; }
        IOrderRepository OrderRepository{ get; }
        Task<bool> SaveAsync();
    }
}
