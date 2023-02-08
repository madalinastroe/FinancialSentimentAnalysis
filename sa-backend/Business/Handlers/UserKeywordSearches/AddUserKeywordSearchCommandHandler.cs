using MediatR;
using Microsoft.EntityFrameworkCore;
using sentiment_analysis_be.Business.Commands.UserKeywordSearches;
using sentiment_analysis_be.Business.Extensions.UserKeywordSearches;
using sentiment_analysis_be.Data;
using sentiment_analysis_be.Data.Models;
using sentiment_analysis_be.Infrastructure;
using sentiment_analysis_be.Services.AccessTokenUtils;

namespace sentiment_analysis_be.Business.Handlers.UserKeywordSearches;

public class AddUserKeywordSearchCommandHandler : IRequestHandler<AddUserKeywordSearchCommand, bool>
{
    private readonly Context _context;
    private readonly AccessTokenManagerUtils _tokenManagerUtils;
    private User? _dbUser;
    private Keyword? _keyword;

    public AddUserKeywordSearchCommandHandler(Context context, AccessTokenManagerUtils tokenManagerUtils)
    {
        _context = context;
        _tokenManagerUtils = tokenManagerUtils;
    }

    public async Task<bool> Handle(AddUserKeywordSearchCommand command, CancellationToken cancellationToken)
    {
        await ValidateIfUserExists(command.UserId);
        ValidateToken(command);
        await ValidateIfKeywordExists(command.KeywordName);

        _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        _context.UserKeywordSearches.Update(command.ToUserKeywordSearch());
        await _context.SaveChangesAsync(cancellationToken);
        return true;
    }

    private async Task ValidateIfUserExists(Guid userId)
    {
        _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        _dbUser = await _context.Users
            .FirstOrDefaultAsync(u => u.Id.Equals(userId));

        if (_dbUser == null)
        {
            throw new CustomException(ErrorCode.AddUserKeywordSearch_InvalidUser, "This user does not exist.");
        }
    }

    private void ValidateToken(AddUserKeywordSearchCommand request)
    {
        if (!_tokenManagerUtils.ValidateToken(request.UserId, request.AccessToken))
        {
            throw new CustomException(ErrorCode.AddUserKeywordSearch_InvalidToken, "Invalid token. Please log in.");
        }
    }

    private async Task ValidateIfKeywordExists(string keywordName)
    {
        _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;
        _keyword = await _context.Keywords
            .FirstOrDefaultAsync(u => u.Name.Equals(keywordName));

        if (_keyword == null)
        {
            var keyword = new Keyword
            {
                Name = keywordName
            };

            _context.Keywords.Add(keyword);
        }
    }
}