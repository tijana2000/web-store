using Store.Core.DTOs.UserDTOs;
using Store.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace Store.Core.Common.Interfaces.Repositories
{
    public interface IUserRepository
    {
        public Task<User> Login(string email, string password);
        public Task<bool> Register(User user);
        public Task<User> Update(UpdatedUserDTO updatedUser);
        public Task<bool> CheckPassword(int id, string password);
        public Task<User> VerifyOrDeny(int userId, string status);
        public Task<bool> Check(Expression<Func<User, bool>> predicate);
        public Task AddProfilePictureToUser(string email, string picture);
        public Task UpdateUserProfilePicture(int id, string picture);
        public Task<List<User>> GetSalesmans();
        public Task<User> GetUser(int id);
    }
}
