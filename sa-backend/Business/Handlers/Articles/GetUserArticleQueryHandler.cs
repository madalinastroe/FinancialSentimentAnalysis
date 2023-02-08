using MediatR;
using Microsoft.EntityFrameworkCore;
using sentiment_analysis_be.Business.Models.Articles;
using sentiment_analysis_be.Business.Queries.Articles;
using sentiment_analysis_be.Data;
using sentiment_analysis_be.Infrastructure;
using sentiment_analysis_be.Services.AccessTokenUtils;

namespace sentiment_analysis_be.Business.Handlers.Articles;

public class GetUserArticleQueryHandler : IRequestHandler<GetUserArticleQuery, ArticleViewModel>
{
    private readonly Context _context;
    private readonly AccessTokenManagerUtils _tokenManagerUtils;

    public GetUserArticleQueryHandler(Context context, AccessTokenManagerUtils tokenManagerUtils)
    {
        _context = context;
        _tokenManagerUtils = tokenManagerUtils;
    }

    public async Task<ArticleViewModel> Handle(GetUserArticleQuery request,
        CancellationToken cancellationToken)
    {
        await ValidateUserExists(request);
        ValidateToken(request);
        
        var article = await _context.Articles
            .Include(a => a.Keywords)
            .Where(a => a.UserId.Equals(request.UserId) && a.Id.Equals(request.ArticleId))
            .FirstOrDefaultAsync(cancellationToken);

        if (article is null)
        {
            throw new CustomException(ErrorCode.GetUserArticle_InvalidArticle, "This article does not exist.");
        }

        return new ArticleViewModel
        {
            Date = article.Date,
            ArticleContent = article.ArticleContent,
            ArticleBrief = article.ArticleBrief,
            Negative = article.Negative,
            Neutral = article.Neutral,
            Positive = article.Positive,
            Keywords = article.Keywords.Select(k => k.Name).ToList()
        };
    }

    private async Task ValidateUserExists(GetUserArticleQuery request)
    {
        var user = await _context.Users.Where(u => u.Id.Equals(request.UserId)).FirstOrDefaultAsync();

        if (user == null)
        {
            throw new CustomException(ErrorCode.GetUserArticle_User, "User does not exist.");
        }
    }

    private void ValidateToken(GetUserArticleQuery request)
    {
        if (!_tokenManagerUtils.ValidateToken(request.UserId, request.AccessToken))
        {
            throw new CustomException(ErrorCode.GetUserArticle_Token, "Invalid token. Please log in.");
        }
    }
}