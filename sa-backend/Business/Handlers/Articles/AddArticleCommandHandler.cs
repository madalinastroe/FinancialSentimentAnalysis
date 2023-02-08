using MediatR;
using Microsoft.EntityFrameworkCore;
using sentiment_analysis_be.Business.Commands.Articles;
using sentiment_analysis_be.Business.Extensions.Articles;
using sentiment_analysis_be.Data;
using sentiment_analysis_be.Data.Models;
using sentiment_analysis_be.Infrastructure;
using sentiment_analysis_be.Services.AccessTokenUtils;

namespace sentiment_analysis_be.Business.Handlers.Articles;

public class AddArticleCommandHandler : IRequestHandler<AddArticleCommand, bool>
{
    private readonly Context _context;
    private readonly AccessTokenManagerUtils _tokenManagerUtils;

    public AddArticleCommandHandler(Context context, AccessTokenManagerUtils tokenManagerUtils)
    {
        _context = context;
        _tokenManagerUtils = tokenManagerUtils;
    }

    public async Task<bool> Handle(AddArticleCommand command, CancellationToken cancellationToken)
    {
        await ValidateUserExists(command);
        ValidateToken(command);
        
        await AddKeywords(command.Keywords);
        
        var keywords = await _context.Keywords
            .Where(k => command.Keywords.Contains(k.Name))
            .ToListAsync(cancellationToken: cancellationToken);
        
        _context.Articles.Update(command.ToArticle(keywords));

        await _context.SaveChangesAsync(cancellationToken);

        return true;
    }

    private async Task ValidateUserExists(AddArticleCommand command)
    {
        var user = await _context.Users.Where(u => u.Id.Equals(command.UserId)).FirstOrDefaultAsync();
        
        if (user == null)
        {
            throw new CustomException(ErrorCode.AddArticle_User, "User does not exist.");
        }
    }

    private void ValidateToken(AddArticleCommand command)
    {
        if (!_tokenManagerUtils.ValidateToken(command.UserId, command.AccessToken))
        {
            throw new CustomException(ErrorCode.AddArticle_Token, "Invalid token. Please log in");
        }
    }

    private async Task AddKeywords(ICollection<string> keywords)
    {
        foreach (var keyword in keywords)
        {
            var kwFromDb = await _context.Keywords.Where(k => k.Name.Equals(keyword)).FirstOrDefaultAsync();
            if (kwFromDb is null)
            {
                _context.Keywords.Add(new Keyword
                {
                    Name = keyword
                });
            }
        }
    }
}