using MediatR;
using sentiment_analysis_be.Business.Models.UserKeywordSearches;

namespace sentiment_analysis_be.Business.Queries.UserKeywordSearches;

public class GetSearchNumberOfOccurrencesQuery: IRequest<ICollection<UserKeywordSearchIdentifier>>
{
    
}