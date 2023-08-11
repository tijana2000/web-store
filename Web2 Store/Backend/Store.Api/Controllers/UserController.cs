using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Store.Api.Request.UserRequest;
using Store.Api.Response.OrderResponse;
using Store.Api.Response.UserResponse;
using Store.Core.Common.Interfaces.Services;
using Store.Core.DTOs.OrderDTOs;
using Store.Core.DTOs.UserDTOs;
using System.Threading.Channels;

namespace Store.Api.Controllers
{
    [Authorize]
    public class UserController : BaseController
    {
        private readonly IUserService _userService;
        private readonly IMapper _mapper;

        public UserController(IUserService userService, IMapper mapper)
        {
            _userService = userService;
            _mapper = mapper;
        }

        [HttpPost("login")]
        [AllowAnonymous]
        public async Task<IActionResult> Login(LoginUserRequest loginUser)
        {
            var login = _mapper.Map<LoginUserDTO>(loginUser);
            var response = await _userService.Login(login);

            if (response == null)
                return BadRequest("Invalid credentials");
            return Ok(response);
        }

        [HttpPost("register")]
        [AllowAnonymous]
        public async Task<IActionResult> Register([FromForm] RegisterUserRequest newUser)
        {
            if (newUser.Birthday.Date > DateTime.Now.Date)
                return BadRequest("Date is older than current date");

            var register = _mapper.Map<RegisterUserDTO>(newUser);
            if (!await _userService.Register(register))
                return BadRequest("Invalid input");
            return Ok();
        }


        [HttpGet("details/{id}")]
        [Authorize(Roles = "Customer,Salesman,Administrator")]
        public async Task<IActionResult> Details(int id)
        {
            if (id < 1)
                return BadRequest("Invalid ID provided");
            var result = await _userService.GetUserDetails(id);
            if (result == null)
                return BadRequest("User not found");
            var user = _mapper.Map<GetUserResponse>(result);
            return Ok(user);
        }

        [HttpPatch("update")]
        [Authorize(Roles = "Customer, Salesman, Administrator")]
        public async Task<IActionResult> Update([FromForm] UpdateUserRequest updated)
        {

            if (updated.Birthday.Date > DateTime.Now.Date)
                return BadRequest("Date is older than current date");

            var user = _mapper.Map<UpdatedUserDTO>(updated);
            if (!await _userService.Update(user))
                return BadRequest("Invalid inputs");
            return Ok();
        }

        [HttpPatch("verify/{id}")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> VerifyOrDeny(int id,VerifyOrDenyUserRequest verification)
        {
            if (id <= 0)
                return BadRequest("Invalid user id");
            if (!await _userService.VerifyOrDeny(id, verification.Action))
                return BadRequest("No users found with this id");
            return Ok();
        }

        [HttpGet("salesman")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> GetSellers()
        {
            var result = await _userService.GetSalesman();
            if (result != null && result.Count == 0)
                return Ok(new List<GetSalesmansResponse>());
            var salesman = _mapper.Map<List<GetSalesmansResponse>>(result);
            return Ok(salesman);
        }
    }
}
