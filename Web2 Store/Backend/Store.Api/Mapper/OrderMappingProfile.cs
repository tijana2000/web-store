using AutoMapper;
using Store.Api.Request.ItemRequest;
using Store.Api.Request.OrderRequest;
using Store.Api.Response.ItemResponse;
using Store.Api.Response.OrderResponse;
using Store.Core.DTOs.ItemDTOs;
using Store.Core.DTOs.OrderDTOs;
using Store.Core.Models;

namespace Store.Api.Mapper
{
    public class OrderMappingProfile : Profile
    {
        public OrderMappingProfile() 
        {
            //create order
            CreateMap<CreateOrderRequest, CreateOrderDTO>();
            CreateMap<CreateOrderItemRequest, CreateOrderItemDTO>();
            CreateMap<CreateOrderDTO, Order>()
                .ForMember(dest => dest.Item, opt => opt.MapFrom(src => src.Item))
                .ForMember(dest => dest.User, opt => opt.Ignore())
                .ForMember(dest => dest.Salesman, opt => opt.Ignore()); 
            CreateMap<CreateOrderItemDTO, Item>();
            //cancel order
            CreateMap<CancleOrderRequest, CancleOrderDTO>();
            //get order history
            CreateMap<Order, GetOrderHistoryDTO>()
                .ForMember(dest => dest.Item, opt => opt.MapFrom(src => src.Item));
            CreateMap<Item, GetOrderItemHistoryDTO>();
            CreateMap<GetOrderHistoryDTO, GetOrderHistoryResponse>()
                .ForMember(dest => dest.Item, opt => opt.MapFrom(src => src.Item));
            CreateMap<GetOrderItemHistoryDTO, GetOrderItemHistoryResponse>();
            //get all orders
            CreateMap<Order, GetAllOrderDTO>()
                .ForMember(dest => dest.Item, opt => opt.MapFrom(src => src.Item));
            CreateMap<Item, GetAllOrderItemDTO>();
            CreateMap<GetAllOrderDTO, GetAllOrderResponse>()
                .ForMember(dest => dest.Item, opt => opt.MapFrom(src => src.Item));
            CreateMap<GetAllOrderItemDTO, GetAllOrderItemResponse>();
            //get active orders
            CreateMap<Order, GetActiveOrderDTO>()
                .ForMember(dest => dest.Item, opt => opt.MapFrom(src => src.Item));
            CreateMap<Item, GetActiveOrderItemDTO>();
            CreateMap<GetActiveOrderDTO, GetActiveOrderResponse>()
                .ForMember(dest => dest.Item, opt => opt.MapFrom(src => src.Item));
            CreateMap<GetActiveOrderItemDTO, GetActiveOrderItemResponse>();
        }

    }
}
