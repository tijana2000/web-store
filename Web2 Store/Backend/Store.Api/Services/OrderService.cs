using AutoMapper;
using Store.Core.Common.Interfaces.Services;
using Store.Core.Common.Interfaces.UnitOfWork;
using Store.Core.DTOs.OrderDTOs;
using Store.Core.Models;

namespace Store.Api.Services
{
    public class OrderService : IOrderService
    {
        private readonly IUnitOfWork _uow;
        private readonly IMapper _mapper;

        public OrderService(IUnitOfWork uow, IMapper mapper) 
        {
            _uow = uow;
            _mapper = mapper;
        }
        public async Task<List<GetOrderHistoryDTO>> History(int id)
        {
            if (!await _uow.UserRepository.Check(u => u.Id == id))
                return null;

            await _uow.OrderRepository.UpdateDeliveryStatus();

            var result = await _uow.OrderRepository.History(id);
            var history = _mapper.Map<List<GetOrderHistoryDTO>>(result);
            return history;
        }
        public async Task<bool> CancelOrder(CancleOrderDTO cancelOrder)
        {
            await _uow.OrderRepository.UpdateDeliveryStatus();
            var result = await _uow.OrderRepository.CancelOrder(cancelOrder.OrderId, cancelOrder.UserId);
            return result;
        }
        public async Task<List<GetActiveOrderDTO>> GetActiveOrders(int id)
        {
            await _uow.OrderRepository.UpdateDeliveryStatus();
            List<GetActiveOrderDTO> returnValue = new List<GetActiveOrderDTO>();
            if (await _uow.UserRepository.Check(u => u.Id == id && u.Role == "Customer"))
            {
                var result = await _uow.OrderRepository.Find(o => o.UserId == id && o.Status == "Delivering");
                returnValue = _mapper.Map<List<GetActiveOrderDTO>>(result);
            }
            else if(await _uow.UserRepository.Check(u => u.Id == id && u.Role == "Salesman"))
            {
                var result = await _uow.OrderRepository.Find(o => o.SalesmanId == id && o.Status == "Delivering");
                returnValue = _mapper.Map<List<GetActiveOrderDTO>>(result);
            }
            return returnValue;
        }
        public async Task<bool> Create(CreateOrderDTO newOrder)
        {
            if (!await _uow.UserRepository.Check(u => u.Id == newOrder.UserId && u.Role == "Customer"))
                return false;
            if (!await _uow.UserRepository.Check(u => u.Id == newOrder.SalesmanId && u.Role == "Salesman"))
                return false;
            if (!await _uow.ArticleRepository.DoesArticleExistById(newOrder.Item.ArticleId)) 
                return false;
            var order = _mapper.Map<Order>(newOrder);
            var result = await _uow.OrderRepository.Create(order);
            if (result == null)
                return false;
            return true;
        }
        public async Task<List<GetAllOrderDTO>> AllOrders()
        {
            await _uow.OrderRepository.UpdateDeliveryStatus();
            var result = await _uow.OrderRepository.GetAllOrders();
            var returnValue = _mapper.Map<List<GetAllOrderDTO>>(result);
            return returnValue;
        }
    }
}
