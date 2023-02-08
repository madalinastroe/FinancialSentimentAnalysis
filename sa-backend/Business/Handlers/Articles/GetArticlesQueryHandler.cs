using MediatR;
using Microsoft.EntityFrameworkCore;
using sentiment_analysis_be.Business.Models.Articles;
using sentiment_analysis_be.Business.Queries.Articles;
using sentiment_analysis_be.Data;
using sentiment_analysis_be.Infrastructure;
using sentiment_analysis_be.Services.AccessTokenUtils;

namespace sentiment_analysis_be.Business.Handlers.Articles;

public class GetArticlesQueryHandler : IRequestHandler<GetArticlesQuery, ICollection<ArticleIdentifier>>
{
    private readonly Context _context;
    private readonly AccessTokenManagerUtils _tokenManagerUtils;

    public GetArticlesQueryHandler(Context context, AccessTokenManagerUtils tokenManagerUtils)
    {
        _context = context;
        _tokenManagerUtils = tokenManagerUtils;
    }
    
    public async Task<ICollection<ArticleIdentifier>> Handle(GetArticlesQuery request, CancellationToken cancellationToken)
    {
        await ValidateUserExists(request);
        ValidateToken(request);

        return await _context.Articles
            .Where(a => a.UserId.Equals(request.UserId))
            .Select(a => new ArticleIdentifier
            {
                ArticleId = a.Id,
                Date = a.Date,
                ArticleBrief = a.ArticleBrief
            })
            .ToListAsync(cancellationToken: cancellationToken);
    }

    private async Task ValidateUserExists(GetArticlesQuery request)
    {
        var user = await _context.Users.Where(u => u.Id.Equals(request.UserId)).FirstOrDefaultAsync();

        if (user == null)
        {
            throw new CustomException(ErrorCode.GetArticles_User, "User does not exist.");
        }
    }

    private void ValidateToken(GetArticlesQuery request)
    {
        if (!_tokenManagerUtils.ValidateToken(request.UserId, request.AccessToken))
        {
            throw new CustomException(ErrorCode.GetArticles_Token, "Invalid token. Please log in.");
        }
    }
}