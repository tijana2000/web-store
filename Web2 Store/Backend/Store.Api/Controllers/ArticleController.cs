using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Store.Api.Request.ArticleRequest;
using Store.Api.Response.ArticleResponse;
using Store.Api.Response.OrderResponse;
using Store.Api.Response.UserResponse;
using Store.Core.Common.Interfaces.Services;
using Store.Core.DTOs.ArticleDTOs;

namespace Store.Api.Controllers
{
    public class ArticleController : BaseController
    {
        private readonly IArticleService _articleService;
        private readonly IMapper _mapper;

        public ArticleController(IArticleService articleService, IMapper mapper) 
        {
            _articleService = articleService;
            _mapper = mapper;
        }

        [HttpPost("create")]
        [Authorize(Roles = "Salesman")]
        public async Task<IActionResult> Create([FromForm] CreateArticleRequest newArticle)
        {
            var article = _mapper.Map<CreateArticleDTO>(newArticle);
            if (!await _articleService.Create(article))
                return BadRequest("Invalid input");
            return Ok();
        }


        [HttpGet("detail/{id}")]
        [Authorize(Roles = "Salesman")]
        public async Task<IActionResult> GetArticle(int id)
        {
            if (id < 1)
                return BadRequest("Invalid id");
            var result = await _articleService.GetArticle(id);
            if (result == null)
                return BadRequest("Article does not exist");
            var article = _mapper.Map<GetArticleResponse>(result);
            return Ok(article);
        }

        [HttpPatch("update")]
        [Authorize(Roles = "Salesman")]
        public async Task<IActionResult> Update([FromForm] UpdateArticleRequest updatedArticle)
        {
            var article = _mapper.Map<UpdateArticleDTO>(updatedArticle);
            if (!await _articleService.Update(article))
                return BadRequest("Update faild, bad input");
            return Ok();
        }

        [HttpGet("all")]
        [Authorize(Roles = "Customer")]
        public async Task<IActionResult> GetAllArticles()
        {
            var result = await _articleService.GetAllArticles();
            if (result != null && result.Count == 0)
                return Ok(new List<GetAllArticlesResponse>());
            var articles = _mapper.Map<List<GetAllArticlesResponse>>(result);
            return Ok(articles);
        }

        [HttpGet("salesman/{id}")]
        [Authorize(Roles = "Salesman")]
        public async Task<IActionResult> GetSalesmanArticles(int id)
        {
            var result = await _articleService.GetSalesmanArticles(id);
            if (result == null)
                return BadRequest("Not salesman exist with this id");
            if (result != null && result.Count == 0)
                return Ok(new List<GetSalesmanArticlesResponse>());
            var articles = _mapper.Map<List<GetSalesmanArticlesResponse>>(result);
            return Ok(articles);
        }

        [HttpDelete("delete/{articleId}/{salesmanId}")]
        [Authorize(Roles = "Salesman")]
        public async Task<IActionResult> Delete(int articleId, int salesmanId)
        {
            if (!await _articleService.Delete(articleId, salesmanId))
                return BadRequest("Invalid id-s");
            return Ok();
        }
    }
}
