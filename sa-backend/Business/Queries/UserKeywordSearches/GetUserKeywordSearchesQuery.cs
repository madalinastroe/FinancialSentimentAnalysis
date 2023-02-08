using MediatR;
using sentiment_analysis_be.Data.Models;

namespace sentiment_analysis_be.Business.Queries.UserKeywordSearches;

public class GetUserKeywordSearchesQuery : IRequest<ICollection<UserKeywordSearch>>
{
    
}