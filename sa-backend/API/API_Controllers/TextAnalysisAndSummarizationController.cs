using MediatR;
using Microsoft.AspNetCore.Mvc;
using sentiment_analysis_be.Business.Queries.TextAnalysis;

namespace sentiment_analysis_be.API.API_Controllers;

public class TextAnalysisController : Controller
{
    private readonly IMediator _mediator;

    public TextAnalysisController(IMediator mediator)
    {
        _mediator = mediator;
    }
    
    [HttpPost]
    [Route("summarize")]
    public async Task<IActionResult> Create([FromBody] GetTextSummaryQuery query)
    {
        return Ok(await _mediator.Send(query));
    }
    
    [HttpPost]
    [Route("sentiment-score")]
    public async Task<IActionResult> Create([FromBody] GetSentimentScoreQuery query)
    {
        return Ok(await _mediator.Send(query));
    }
    
    [HttpPost]
    [Route("keywords")]
    public async Task<IActionResult> Create([FromBody] GetKeyphrasesQuery query)
    {
        return Ok(await _mediator.Send(query));
    }
}