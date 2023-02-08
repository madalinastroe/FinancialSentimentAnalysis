using MediatR;
using Microsoft.AspNetCore.Mvc;
using sentiment_analysis_be.Business.Commands.Users;
using sentiment_analysis_be.Business.Queries.Users;

namespace sentiment_analysis_be.API.API_Controllers;

[ApiController]
public class UserController : Controller
{
    private readonly IMediator _mediator;

    public UserController(IMediator mediator)
    {
        _mediator = mediator;
    }
    
    [HttpPost]
    [Route("users")]
    public async Task<IActionResult> Create([FromBody] AddUserCommand command)
    {
        return Ok(await _mediator.Send(command));
    }
    
    [HttpGet]
    [Route("users")]
    public async Task<IActionResult> GetAll()
    {
        return Ok(await _mediator.Send(new GetUsersQuery()));
    }
    
    [HttpPost]
    [Route("login")]
    public async Task<IActionResult> Login([FromBody] LoginUserQuery query)
    {
        return Ok(await _mediator.Send(query));
    }
    
    [HttpPut]
    [Route("edit")]
    public async Task<IActionResult> Edit([FromBody] EditUserCommand command)
    {
        return Ok(await _mediator.Send(command));
    }
    
    [HttpPost]
    [Route("display")]
    public async Task<IActionResult> GetUserDetails([FromBody] GetUserDetailsQuery query)
    {
        return Ok(await _mediator.Send(query));
    }
    
    [HttpDelete]
    [Route("delete")]
    public async Task<IActionResult> Delete([FromBody] DeleteUserCommand command)
    {
        return Ok(await _mediator.Send(command));
    }
}