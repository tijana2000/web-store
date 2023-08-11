using Store.Core.DTOs.ItemDTOs;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Store.Core.DTOs.OrderDTOs
{
    public class CreateOrderDTO
    {
        public CreateOrderItemDTO Item { get; set; }
        public string Comment { get; set; }
        public string Address { get; set; }
        public int UserId { get; set; }
        public int SalesmanId { get; set; }
    }
}
