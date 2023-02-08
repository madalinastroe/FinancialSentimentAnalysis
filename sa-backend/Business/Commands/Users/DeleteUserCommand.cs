using MediatR;

namespace sentiment_analysis_be.Business.Commands.Users;

public class DeleteUserCommand : IRequest<bool>
{
    public Guid Id { get; set; }
    public Guid AccessToken { get; set; }
    public string Password { get; set; }
}