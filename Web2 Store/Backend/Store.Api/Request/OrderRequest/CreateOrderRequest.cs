using Store.Core.DTOs.ItemDTOs;
using System.ComponentModel.DataAnnotations;

namespace Store.Api.Request.OrderRequest
{
    public class CreateOrderRequest
    {
        [Required]
        public CreateOrderItemDTO Item { get; set; }

        [Required]
        public string Comment { get; set; }

        [Required]
        public string Address { get; set; }
        [Required]
        [Range(1, int.MaxValue)]
        public int UserId { get; set; }
        [Required]
        [Range(1, int.MaxValue)]
        public int SalesmanId { get; set; }
    }
}
