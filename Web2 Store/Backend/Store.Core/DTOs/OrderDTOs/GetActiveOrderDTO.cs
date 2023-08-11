using Store.Core.DTOs.ItemDTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Store.Core.DTOs.OrderDTOs
{
    public class GetActiveOrderDTO
    {
        public int Id { get; set; }
        public GetActiveOrderItemDTO Item { get; set; }
        public string Comment { get; set; }
        public string Address { get; set; }
        public DateTime Creation { get; set; }
        public DateTime Delivery { get; set; }
        public float Price { get; set; }
        public string Status { get; set; }
    }
}
