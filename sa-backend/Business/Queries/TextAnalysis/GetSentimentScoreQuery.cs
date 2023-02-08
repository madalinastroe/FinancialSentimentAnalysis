using MediatR;

namespace sentiment_analysis_be.Business.Queries.TextAnalysis;

public class GetSentimentScoreQuery: IRequest<string>
{ 
    public string Args { get; set; }
    
}