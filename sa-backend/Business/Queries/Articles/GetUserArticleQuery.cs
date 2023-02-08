using MediatR;
using sentiment_analysis_be.Business.Models.Articles;

namespace sentiment_analysis_be.Business.Queries.Articles;

public class GetUserArticleQuery: IRequest<ArticleViewModel>
{
    public Guid UserId { get; set; }
    public Guid AccessToken { get; set; }
    public Guid ArticleId { get; set; }
}