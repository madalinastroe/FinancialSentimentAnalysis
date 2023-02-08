using MediatR;
using sentiment_analysis_be.Business.Queries.TextAnalysis;
using sentiment_analysis_be.Services;

namespace sentiment_analysis_be.Business.Handlers.TextAnalysis;

public class GetScoreForTextQueryHandler : IRequestHandler<GetTextSummaryQuery, string>
{
    private readonly HuggingFaceUtils _huggingFace;

    public GetScoreForTextQueryHandler(HuggingFaceUtils huggingFace)
    {
        _huggingFace = huggingFace;
    }

    public async Task<string> Handle(GetTextSummaryQuery request, CancellationToken cancellationToken)
    {
        return await _huggingFace.GetSummary(request.Args);
    }
}