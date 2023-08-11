using System.ComponentModel.DataAnnotations;

namespace Store.Api.Request.ArticleRequest
{
    public class UpdateArticleRequest
    {
        [Required]
        [Range(1, int.MaxValue)]
        public int Id { get; set; }

        [Required]
        [StringLength(100)]
        public string Name { get; set; }
        [Required]
        [Range(0, float.MaxValue)]
        public float Price { get; set; }
        [Required]
        [Range(1, int.MaxValue)]
        public int Quantity { get; set; }
        [Required]
        [StringLength(255)]
        public string Description { get; set; }
        [Required]
        public string Picture { get; set; }
        [Required]
        public int SalesmanId { get; set; }
        public IFormFile? File { get; set; }
    }
}
