using MediatR;
using sentiment_analysis_be.Business.Models.Users;

namespace sentiment_analysis_be.Business.Queries.Users;

/// <summary>
/// Login user with Username/Email and Password.
/// </summary>
public class LoginUserQuery : IRequest<LoggedInUserModel>
{
    public string LoginResource { get; set; }
    public string Password { get; set; }
}