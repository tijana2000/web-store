using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Store.Api.Request.OrderRequest;
using Store.Api.Response.OrderResponse;
using Store.Core.Common.Interfaces.Services;
using Store.Core.DTOs.ArticleDTOs;
using Store.Core.DTOs.OrderDTOs;
using System.Threading.Channels;

namespace Store.Api.Controllers
{
    public class OrderController : BaseController
    {
        private readonly IOrderService _orderService;
        private readonly IMapper _mapper;

        public OrderController(IOrderService orderService, IMapper mapper)
        {
            _orderService = orderService;
            _mapper = mapper;
        }

        [HttpPost("create")]
        [Authorize(Roles = "Customer")]
        public async Task<IActionResult> Create(CreateOrderRequest newOrder)
        {
            var order = _mapper.Map<CreateOrderDTO>(newOrder);
            var result = await _orderService.Create(order);
            if (result == null)
                return BadRequest("Order is not valid");

            return Ok(result);
        }

        [HttpGet("all")]
        [Authorize(Roles = "Administrator")]
        public async Task<IActionResult> AllOrder()
        {
            var result = await _orderService.AllOrders();
            if(result != null && result.Count == 0)
                return Ok(new List<GetAllOrderResponse>());
            var orders = _mapper.Map<List<GetAllOrderResponse>>(result);
            return Ok(orders);
        }

        [HttpGet("active/{id}")]
        [Authorize(Roles = "Customer,Salesman")]
        public async Task<IActionResult> GetActiveOrders(int id)
        {
            var result = await _orderService.GetActiveOrders(id);
            if (result == null)
                return BadRequest("Bad ID");
            if (result != null && result.Count == 0)
                return Ok(new List<GetActiveOrderResponse>());
            var orders = _mapper.Map<List<GetActiveOrderResponse>>(result);
            return Ok(orders);
        }


        [HttpGet("history/{id}")]
        [Authorize(Roles = "Customer,Salesman")]
        public async Task<IActionResult> History(int id)
        {
            var result = await _orderService.History(id);
            if (result == null)
                return BadRequest("Bad ID");
            if (result != null && result.Count == 0)
                return Ok(new List<GetOrderHistoryResponse>());
            var orders = _mapper.Map<List<GetOrderHistoryResponse>>(result);
            return Ok(orders);
        }

        [HttpPatch("cancel")]   
        [Authorize(Roles = "Customer")]
        public async Task<IActionResult> CancelOrder(CancleOrderRequest cancel)
        {
            var order = _mapper.Map<CancleOrderDTO>(cancel);
            if (!await _orderService.CancelOrder(order))
                return BadRequest();
            return Ok();
        }
    }
}
