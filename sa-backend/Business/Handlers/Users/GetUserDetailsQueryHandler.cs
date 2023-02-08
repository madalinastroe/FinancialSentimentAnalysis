using MediatR;
using Microsoft.EntityFrameworkCore;
using sentiment_analysis_be.Business.Extensions.Users;
using sentiment_analysis_be.Business.Models.Users;
using sentiment_analysis_be.Business.Queries.Users;
using sentiment_analysis_be.Data;
using sentiment_analysis_be.Infrastructure;
using sentiment_analysis_be.Services.AccessTokenUtils;

namespace sentiment_analysis_be.Business.Handlers.Users;

public class GetUserDetailsQueryHandler : IRequestHandler<GetUserDetailsQuery, UserIdentifier>
{
    private readonly Context _context;
    private readonly AccessTokenManagerUtils _tokenManagerUtils;

    public GetUserDetailsQueryHandler(Context context, AccessTokenManagerUtils tokenManagerUtils)
    {
        _context = context;
        _tokenManagerUtils = tokenManagerUtils;
    }

    public async Task<UserIdentifier> Handle(GetUserDetailsQuery request, CancellationToken cancellationToken)
    {
        ValidateToken(request);
        
        var result = await _context.Users
            .ToUserIdentifier()
            .FirstOrDefaultAsync(user => user.Id == request.UserId, cancellationToken: cancellationToken);

        if (result is null)
        {
            throw new CustomException(ErrorCode.GetUserDetails_User, "User does not exist!");
        }

        return result;
    }

    private void ValidateToken(GetUserDetailsQuery request)
    {
        if (!_tokenManagerUtils.ValidateToken(request.UserId, request.AccessToken))
        {
            throw new CustomException(
                ErrorCode.EditUser_InvalidToken,
                "Invalid token. Please log in."
            );
        }
    }
}