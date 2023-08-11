using System.ComponentModel.DataAnnotations;

namespace Store.Api.Request.ItemRequest
{
    public class CreateOrderItemRequest
    {
        [Required]
        [Range(1, int.MaxValue)]
        public int Quantity { get; set; }
        [Required]
        [Range(1, int.MaxValue)]
        public int ArticleId { get; set; }
    }
}
