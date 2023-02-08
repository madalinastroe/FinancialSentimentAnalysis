using MediatR;

namespace sentiment_analysis_be.Business.Commands.Users;

/// <summary>
/// Register user (add new user) with JWT and send registration mail.
/// </summary>
public class AddUserCommand : IRequest<bool>
{
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string Password { get; set; }
}