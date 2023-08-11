using AutoMapper;
using Store.Api.Request.ArticleRequest;
using Store.Api.Response.ArticleResponse;
using Store.Core.DTOs.ArticleDTOs;
using Store.Core.Models;

namespace Store.Api.Mapper
{
    public class ArticleMappingProfile : Profile
    {
        public ArticleMappingProfile()
        {
            // create article
            CreateMap<CreateArticleRequest, CreateArticleDTO>();
            CreateMap<CreateArticleDTO, Article>();

            // update article
            CreateMap<UpdateArticleRequest, UpdateArticleDTO>();
            CreateMap<UpdateArticleDTO, Article>();

            // get all articles
            CreateMap<Article, GetAllArticlesDTO>();
            CreateMap<GetAllArticlesDTO, GetAllArticlesResponse>();
            // get article details
            CreateMap<Article, GetArticleDTO>();
            CreateMap<GetArticleDTO, GetArticleResponse>();
            // get salesman articles 
            CreateMap<Article, GetSalesmanArticlesDTO>();
            CreateMap<GetSalesmanArticlesDTO, GetSalesmanArticlesResponse>();
        }

    }
}
