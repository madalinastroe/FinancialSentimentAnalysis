using MediatR;
using Microsoft.AspNetCore.Mvc;
using sentiment_analysis_be.Business.Commands.Keywords;
using sentiment_analysis_be.Business.Queries.Keywords;

namespace sentiment_analysis_be.API.API_Controllers;

public class KeywordController: Controller
{
    private readonly IMediator _mediator;

    public KeywordController(IMediator mediator)
    {
        _mediator = mediator;
    }
    
    [HttpPost]
    [Route("add-keywords")]
    public async Task<IActionResult> Create([FromBody] AddKeywordCommand command)
    {
        return Ok(await _mediator.Send(command));
    }
    
    [HttpGet]
    [Route("get-keywords")]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _mediator.Send(new GetKeywordsQuery()));
    }
}