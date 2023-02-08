using MediatR;
using Microsoft.AspNetCore.Mvc;
using sentiment_analysis_be.Business.Commands.Articles;
using sentiment_analysis_be.Business.Queries.Articles;

namespace sentiment_analysis_be.API.API_Controllers;

public class ArticleController: Controller
{
    private readonly IMediator _mediator;

    public ArticleController(IMediator mediator)
    {
        _mediator = mediator;
    }
    
    [HttpPost]
    [Route("articles")]
    public async Task<IActionResult> Create([FromBody] AddArticleCommand command)
    {
        return Ok(await _mediator.Send(command));
    }
    
    [HttpPost]
    [Route("get-article")]
    public async Task<IActionResult> Get([FromBody] GetUserArticleQuery query)
    {
        return Ok(await _mediator.Send(query));
    }
    
    [HttpPost]
    [Route("get-articles")]
    public async Task<IActionResult> Get([FromBody] GetArticlesQuery query)
    {
        return Ok(await _mediator.Send(query));
    }

    [HttpDelete]
    [Route("/delete-article")]
    public async Task<IActionResult> DeleteArticle([FromBody] DeleteArticleCommand command)
    {
        return Ok(await _mediator.Send(command));
    }
}