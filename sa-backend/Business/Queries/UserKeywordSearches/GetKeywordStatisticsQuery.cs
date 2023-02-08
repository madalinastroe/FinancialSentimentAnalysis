using MediatR;
using sentiment_analysis_be.Business.Models.UserKeywordSearches;

namespace sentiment_analysis_be.Business.Queries.UserKeywordSearches;

public class GetKeywordStatisticsQuery : IRequest<ICollection<DailyStatistic>>
{
    public string Keyword { get; set; }
    public DateTime Start { get; set; }
    public DateTime End { get; set; }
}