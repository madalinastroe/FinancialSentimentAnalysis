using MediatR;

namespace sentiment_analysis_be.Business.Commands.UserKeywordSearches;

public class DeleteUserKeywordSearchCommand: IRequest<bool>
{
    public Guid Id { get; set; }
}