using Store.Core.DTOs.ArticleDTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace Store.Core.Common.Interfaces.Services
{
    public interface IArticleService
    {
        public Task<bool> Update(UpdateArticleDTO oldArticle);
        public Task<List<GetAllArticlesDTO>> GetAllArticles();
        public Task<GetArticleDTO> GetArticle(int id);
        public Task<List<GetSalesmanArticlesDTO>> GetSalesmanArticles(int id);
        public Task<bool> Delete(int id, int salesman);
        public Task<bool> Create(CreateArticleDTO newArticle);
    }
}
