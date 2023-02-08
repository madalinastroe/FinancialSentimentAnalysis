using MediatR;
using sentiment_analysis_be.Data.Models;

namespace sentiment_analysis_be.Business.Queries.Users;

/// <summary>
/// Get all Users stored in database.
/// </summary>
public class GetUsersQuery : IRequest<IEnumerable<User>>
{

}