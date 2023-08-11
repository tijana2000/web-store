﻿using Store.Api.Response.ItemResponse;
using Store.Core.DTOs.ItemDTOs;

namespace Store.Api.Response.OrderResponse
{
    public class GetActiveOrderResponse
    {
        public int Id { get; set; }
        public GetActiveOrderItemResponse Item { get; set; }
        public string Comment { get; set; }
        public string Address { get; set; }
        public DateTime Creation { get; set; }
        public DateTime Delivery { get; set; }
        public float Price { get; set; }
        public string Status { get; set; }
    }
}
