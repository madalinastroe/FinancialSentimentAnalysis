using MediatR;
using sentiment_analysis_be.Business.Models.UserKeywordSearches;

namespace sentiment_analysis_be.Business.Commands.UserKeywordSearches;

public class FilterSearchesByPeriodCommand: IRequest<IEnumerable<FilterIdentifier>>
{
    public DateTime StartDate { get; set; }
    public DateTime EndDate { get; set; }
}