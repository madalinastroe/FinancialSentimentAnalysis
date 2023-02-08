using MediatR;

namespace sentiment_analysis_be.Business.Queries.TextAnalysis;

public class GetKeyphrasesQuery: IRequest<IEnumerable<string>>
{ 
    public string Args { get; set; }
}