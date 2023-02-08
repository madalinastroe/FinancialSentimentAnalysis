using MediatR;
using Microsoft.AspNetCore.Mvc;
using sentiment_analysis_be.Business.Commands.UserKeywordSearches;
using sentiment_analysis_be.Business.Queries.UserKeywordSearches;

namespace sentiment_analysis_be.API.API_Controllers;

public class UserKeywordSearchController : Controller
{
    private readonly IMediator _mediator;

    public UserKeywordSearchController(IMediator mediator)
    {
        _mediator = mediator;
    }
    
    [HttpPost]
    [Route("searches")]
    public async Task<IActionResult> Create([FromBody] AddUserKeywordSearchCommand command)
    {
        return Ok(await _mediator.Send(command));
    }
    
    [HttpGet]
    [Route("get-searches")]
    public async Task<IActionResult> GetSearches()
    {
        return Ok(await _mediator.Send(new GetUserKeywordSearchesQuery()));
    }
    
    [HttpGet]
    [Route("occurrences")]
    public async Task<IActionResult> GetNumberOfOccurrences()
    {
        return Ok(await _mediator.Send(new GetSearchNumberOfOccurrencesQuery()));
    }
    
    [HttpDelete]
    [Route("/delete-search")]
    public async Task<IActionResult> DeleteUserKeywordSearch([FromBody] DeleteUserKeywordSearchCommand command)
    {
        return Ok(await _mediator.Send(command));
    }
    
    [HttpPost]
    [Route("/filter")]
    public async Task<IActionResult> FilterSearched([FromBody] FilterSearchesByPeriodCommand command)
    {
        return Ok(await _mediator.Send(command));
    }
    
    [HttpPost]
    [Route("/get-statistics")]
    public async Task<IActionResult> GetKeywordStatistics([FromBody] GetKeywordStatisticsQuery command)
    {
        return Ok(await _mediator.Send(command));
    }
}