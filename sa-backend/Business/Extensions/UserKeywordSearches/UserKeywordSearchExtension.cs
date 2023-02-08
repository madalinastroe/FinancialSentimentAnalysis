using sentiment_analysis_be.Business.Commands.UserKeywordSearches;
using sentiment_analysis_be.Business.Models.UserKeywordSearches;
using sentiment_analysis_be.Data.Models;

namespace sentiment_analysis_be.Business.Extensions.UserKeywordSearches;

public static class UserKeywordSearchExtension
{
    public static UserKeywordSearch ToUserKeywordSearch(this AddUserKeywordSearchCommand command)
    {
        return new UserKeywordSearch
        {
            UserId = command.UserId,
            KeywordName = command.KeywordName,
            Timestamp = command.Timestamp
        };
    }
    
    public static FilterIdentifier ToFilterIdentifier(this FilterSearchSearchIdentifier element)
    {
        return new FilterIdentifier()
        {
            KeywordName = element.KeywordName,
            NumberOfOccurrences = element.NumberOfOccurrences
        };
    }
}