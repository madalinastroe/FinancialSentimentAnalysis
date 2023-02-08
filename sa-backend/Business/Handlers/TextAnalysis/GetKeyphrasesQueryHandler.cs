using MediatR;
using sentiment_analysis_be.Business.Queries.TextAnalysis;
using sentiment_analysis_be.Services;

namespace sentiment_analysis_be.Business.Handlers.TextAnalysis;

public class GetKeyphrasesQueryHandler : IRequestHandler<GetKeyphrasesQuery, IEnumerable<string>>
{
    private readonly HuggingFaceUtils _huggingFace;

    public GetKeyphrasesQueryHandler(HuggingFaceUtils huggingFace)
    {
        _huggingFace = huggingFace;
    }

    public async Task<IEnumerable<string>> Handle(GetKeyphrasesQuery request, CancellationToken cancellationToken)
    {
        return await _huggingFace.GetKeyphrases(request.Args);
    }
}