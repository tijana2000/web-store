using Microsoft.AspNetCore.Http;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Store.Core.DTOs.ArticleDTOs
{
    public class CreateArticleDTO
    {
        public string Name { get; set; }
        public float Price { get; set; }
        public int Quantity { get; set; }
        public string Description { get; set; }
        public string Picture { get; set; }
        public int SalesmanId { get; set; }
        public IFormFile File { get; set; }
    }
}
