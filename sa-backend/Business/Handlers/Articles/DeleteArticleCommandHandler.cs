using MediatR;
using Microsoft.EntityFrameworkCore;
using sentiment_analysis_be.Business.Commands.Articles;
using sentiment_analysis_be.Data;
using sentiment_analysis_be.Data.Models;
using sentiment_analysis_be.Infrastructure;
using sentiment_analysis_be.Services.AccessTokenUtils;

namespace sentiment_analysis_be.Business.Handlers.Articles;

public class DeleteArticleCommandHandler : IRequestHandler<DeleteArticleCommand, bool>
{
    private readonly Context _context;
    private readonly AccessTokenManagerUtils _tokenManagerUtils;
    private Article _article;

    public DeleteArticleCommandHandler(Context context, AccessTokenManagerUtils tokenManagerUtils)
    {
        _context = context;
        _tokenManagerUtils = tokenManagerUtils;
    }

    public async Task<bool> Handle(DeleteArticleCommand request, CancellationToken cancellationToken)
    {
        await ValidateUserExists(request);
        ValidateToken(request);
        await ValidateIfArticleExists(request.ArticleId);

        _context.Articles.Remove(_article);
        await _context.SaveChangesAsync(cancellationToken);

        return true;
    }

    private async Task ValidateIfArticleExists(Guid id)
    {
        _article = await _context.Articles
            .FirstOrDefaultAsync(u => u.Id == id);

        if (_article is null)
        {
            throw new CustomException(ErrorCode.DeleteArticle_InvalidArticle, "Article does not exist.");
        }
    }

    private async Task ValidateUserExists(DeleteArticleCommand request)
    {
        var user = await _context.Users.Where(u => u.Id.Equals(request.UserId)).FirstOrDefaultAsync();

        if (user == null)
        {
            throw new CustomException(ErrorCode.GetArticles_User, "User does not exist.");
        }
    }

    private void ValidateToken(DeleteArticleCommand request)
    {
        if (!_tokenManagerUtils.ValidateToken(request.UserId, request.AccessToken))
        {
            throw new CustomException(ErrorCode.GetArticles_Token, "Invalid token. Please log in.");
        }
    }
}