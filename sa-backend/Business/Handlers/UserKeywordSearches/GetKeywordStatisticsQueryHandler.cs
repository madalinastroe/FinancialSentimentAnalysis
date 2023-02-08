using System.Collections.ObjectModel;
using MediatR;
using Microsoft.EntityFrameworkCore;
using sentiment_analysis_be.Business.Models.UserKeywordSearches;
using sentiment_analysis_be.Business.Queries.UserKeywordSearches;
using sentiment_analysis_be.Data;

namespace sentiment_analysis_be.Business.Handlers.UserKeywordSearches;

public class GetKeywordStatisticsQueryHandler: IRequestHandler<GetKeywordStatisticsQuery, ICollection<DailyStatistic>>
{
    private readonly Context _context;
    
    public GetKeywordStatisticsQueryHandler(Context context)
    {
        _context = context;
    }

    public async Task<ICollection<DailyStatistic>> Handle(GetKeywordStatisticsQuery request, CancellationToken cancellationToken)
    {
        var searches = await _context.UserKeywordSearches
            .Where(s => s.KeywordName.Contains(request.Keyword))
            .Where(s => (s.Timestamp.Date >= Convert.ToDateTime(request.Start).Date ) 
                        && (s.Timestamp.Date <= Convert.ToDateTime(request.End).Date))
            .OrderBy(s => s.Timestamp)
            .ToListAsync(cancellationToken: cancellationToken);

        var result = new Collection<DailyStatistic>();

        if (searches.Count == 0)
        {
            return result;
        }
        
        var currentDate = searches[0].Timestamp.Date;
        var currentOccurrences = 0;

        for (var i = 0; i < searches.Count; i++)
        {
            var search = searches[i];
            if (search.Timestamp.Date.Equals(currentDate))
            {
                currentOccurrences++;
            }
            else
            {
                result.Add(new DailyStatistic()
                {
                    Date = currentDate,
                    NumberOfOccurrences = currentOccurrences
                });
                currentOccurrences = 1;
                if (i + 1 < searches.Count)
                {
                    currentDate = searches[i + 1].Timestamp.Date;
                }
            }
        }

        result.Add(new DailyStatistic()
        {
            Date = currentDate,
            NumberOfOccurrences = currentOccurrences
        });
        
        return result;
    }
}