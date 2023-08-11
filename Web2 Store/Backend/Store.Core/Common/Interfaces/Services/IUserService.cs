using Microsoft.Extensions.Configuration;
using Microsoft.IdentityModel.Tokens;
using Store.Core.DTOs.UserDTOs;
using Store.Core.Models;
using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;

namespace Store.Core.Common.Interfaces.Services
{
    public interface IUserService
    {
        public Task<string> Login(LoginUserDTO loginUser);
        public Task<bool> Register(RegisterUserDTO newUser);
        public Task<bool> Update(UpdatedUserDTO updatedUser);
        public Task<bool> VerifyOrDeny(int id, string verification);
        public Task<List<GetSalesmansDTO>> GetSalesman();
        public Task<GetUserDTO> GetUserDetails(int id);
    }
}
