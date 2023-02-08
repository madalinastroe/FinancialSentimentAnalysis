using MediatR;
using sentiment_analysis_be.Business.Queries.TextAnalysis;
using sentiment_analysis_be.Services;

namespace sentiment_analysis_be.Business.Handlers.TextAnalysis;

public class GetSentimentScoreQueryHandler : IRequestHandler<GetSentimentScoreQuery, string>
{
    private const string ScriptLocation = "./scripts/SentimentAnalysis/SentimentAnalyzer.py";
    
    private readonly HuggingFaceUtils _huggingFace;

    public GetSentimentScoreQueryHandler(HuggingFaceUtils huggingFace)
    {
        _huggingFace = huggingFace;
    }
    
    public async Task<string> Handle(GetSentimentScoreQuery request, CancellationToken cancellationToken)
    {
        return await _huggingFace.GetSentimentScore(request.Args);
    }
}