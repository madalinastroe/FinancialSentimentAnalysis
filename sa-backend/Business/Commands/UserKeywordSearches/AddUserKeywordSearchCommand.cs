using MediatR;

namespace sentiment_analysis_be.Business.Commands.UserKeywordSearches;

public class AddUserKeywordSearchCommand: IRequest<bool>
{
    public Guid UserId { get; set; }
    public Guid AccessToken { get; set; }
    public string KeywordName { get; set; }
    public DateTime Timestamp { get; set; }
}