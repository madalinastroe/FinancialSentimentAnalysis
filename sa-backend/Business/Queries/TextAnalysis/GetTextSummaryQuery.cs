using MediatR;

namespace sentiment_analysis_be.Business.Queries.TextAnalysis;

public class GetTextSummaryQuery: IRequest<string>
{ 
    public string Args { get; set; }

}