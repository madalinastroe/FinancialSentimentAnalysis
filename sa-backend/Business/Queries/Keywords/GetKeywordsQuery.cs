using MediatR;
using sentiment_analysis_be.Data.Models;

namespace sentiment_analysis_be.Business.Queries.Keywords;

public class GetKeywordsQuery : IRequest<ICollection<Keyword>>
{
    
}