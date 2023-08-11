using Store.Core.DTOs.OrderDTOs;
using Store.Core.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Store.Core.Common.Interfaces.Services
{
    public interface IOrderService
    {
        public Task<List<GetOrderHistoryDTO>> History(int id);
        public Task<bool> CancelOrder(CancleOrderDTO cancelOrder);
        public Task<List<GetActiveOrderDTO>> GetActiveOrders(int id);
        public Task<bool> Create(CreateOrderDTO newOrder);
        public Task<List<GetAllOrderDTO>> AllOrders();
    }
}
