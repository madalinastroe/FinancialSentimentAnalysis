using sentiment_analysis_be.Business.Commands.Articles;
using sentiment_analysis_be.Data.Models;

namespace sentiment_analysis_be.Business.Extensions.Articles;

public static class ArticleExtension
{
    public static Article ToArticle(this AddArticleCommand command, List<Keyword> keywords)
    {
        return new Article
        {
            Date = command.Date,
            ArticleContent = command.ArticleContent,
            ArticleBrief = command.ArticleBrief,
            Negative = command.Negative,
            Neutral = command.Neutral,
            Positive = command.Positive,
            UserId = command.UserId,
            Keywords = keywords
        };
    }
}