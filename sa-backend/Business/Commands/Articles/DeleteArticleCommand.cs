using MediatR;

namespace sentiment_analysis_be.Business.Commands.Articles;

public class DeleteArticleCommand: IRequest<bool>
{
    public Guid UserId { get; set; }
    public Guid AccessToken { get; set; }
    public Guid ArticleId { get; set; }
}