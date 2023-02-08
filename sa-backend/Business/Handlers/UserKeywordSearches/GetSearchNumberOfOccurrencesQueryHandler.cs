using MediatR;
using sentiment_analysis_be.Business.Models.UserKeywordSearches;
using sentiment_analysis_be.Business.Queries.UserKeywordSearches;
using sentiment_analysis_be.Data;
using sentiment_analysis_be.Data.Models;

namespace sentiment_analysis_be.Business.Handlers.UserKeywordSearches;

public class GetSearchNumberOfOccurrencesQueryHandler: IRequestHandler<GetSearchNumberOfOccurrencesQuery, ICollection<UserKeywordSearchIdentifier>>
{
    private readonly Context _context;

    public GetSearchNumberOfOccurrencesQueryHandler(Context context)
    {
        _context = context;
    }
    
    public async Task<ICollection<UserKeywordSearchIdentifier>> Handle(GetSearchNumberOfOccurrencesQuery request, CancellationToken cancellationToken)
    {
        var searches = _context.UserKeywordSearches.ToList();
        var searchesWithoutDuplicates = searches
            .Distinct()
            .ToList();

        var result = new List<UserKeywordSearchIdentifier>() { };

        for (int i = 0; i < searchesWithoutDuplicates.Count; i++)
        {
            var occurence = getNumberOfOccurrences(searchesWithoutDuplicates[i].KeywordName, searches);
            var element = new UserKeywordSearchIdentifier()
            {
                Id = searchesWithoutDuplicates[i].Id,
                UserId = searchesWithoutDuplicates[i].UserId,
                KeywordName = searchesWithoutDuplicates[i].KeywordName,
                NumberOfOccurrences = occurence
            };
            result.Add(element);
        }

        return result
            .GroupBy(p => p.KeywordName)
            .Select(g => g.First())
            .ToList();
    }

    public int getNumberOfOccurrences(string keywordName, List<UserKeywordSearch> list)
    {
        int occurrences = 0;
        for (int i = 0; i < list.Count; i++)
        {
            if (list[i].KeywordName == keywordName)
                occurrences++;
        }

        return occurrences;
    }
}