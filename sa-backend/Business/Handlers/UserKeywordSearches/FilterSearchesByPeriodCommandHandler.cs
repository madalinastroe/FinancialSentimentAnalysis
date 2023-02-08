using MediatR;
using Microsoft.EntityFrameworkCore;
using sentiment_analysis_be.Business.Commands.UserKeywordSearches;
using sentiment_analysis_be.Business.Extensions.UserKeywordSearches;
using sentiment_analysis_be.Business.Models.UserKeywordSearches;
using sentiment_analysis_be.Data;
using sentiment_analysis_be.Data.Models;

namespace sentiment_analysis_be.Business.Handlers.UserKeywordSearches;

public class
    FilterSearchesByPeriodCommandHandler : IRequestHandler<FilterSearchesByPeriodCommand, IEnumerable<FilterIdentifier>>
{
    private readonly Context _context;

    public FilterSearchesByPeriodCommandHandler(Context context)
    {
        _context = context;
    }

    public async Task<IEnumerable<FilterIdentifier>> Handle(FilterSearchesByPeriodCommand request,
        CancellationToken cancellationToken)
    {
        var searches = await _context.UserKeywordSearches
            .ToListAsync(cancellationToken: cancellationToken);

        var auxResult = new List<FilterSearchSearchIdentifier>();
        var result = new List<FilterIdentifier>();

        foreach (var t in searches)
        {
            var occurence = GetNumberOfOccurrences(t.KeywordName, searches);
            var element = new FilterSearchSearchIdentifier
            {
                Id = t.Id,
                UserId = t.UserId,
                KeywordName = t.KeywordName,
                Timestamp = t.Timestamp,
                NumberOfOccurrences = occurence
            };
            auxResult.Add(element);
        }


        var searchesIdentifier = auxResult
            .Where(x =>
                (x.Timestamp.Date >= Convert.ToDateTime(request.StartDate).Date)
                && (x.Timestamp.Date <= Convert.ToDateTime(request.EndDate).Date))
            .Take(10)
            .OrderByDescending(x => x.NumberOfOccurrences)
            .ToList();

        searchesIdentifier.ForEach(element => { result.Add(element.ToFilterIdentifier()); });

        return result.DistinctBy(x => x.KeywordName);
    }

    private int GetNumberOfOccurrences(string keywordName, List<UserKeywordSearch> list)
    {
        var occurrences = 0;
        foreach (var t in list)
        {
            if (t.KeywordName == keywordName)
                occurrences++;
        }

        return occurrences;
    }
}