using MediatR;
using sentiment_analysis_be.Business.Models.Users;

namespace sentiment_analysis_be.Business.Queries.Users;

public class GetUserDetailsQuery : IRequest<UserIdentifier>
{
    public Guid UserId { get; set; }
    public Guid AccessToken { get; set; }
}