using MediatR;
using Microsoft.EntityFrameworkCore;
using sentiment_analysis_be.Business.Models.Users;
using sentiment_analysis_be.Business.Queries.Users;
using sentiment_analysis_be.Data;
using sentiment_analysis_be.Infrastructure;
using sentiment_analysis_be.Services;
using sentiment_analysis_be.Services.AccessTokenUtils;

namespace sentiment_analysis_be.Business.Handlers.Users;

public class LoginUserQueryHandler : IRequestHandler<LoginUserQuery, LoggedInUserModel>
{
    private readonly Context _context;
    private readonly HashingUtils _hashingUtils;
    private readonly AccessTokenManagerUtils _tokenManagerUtils;

    public LoginUserQueryHandler(Context context, HashingUtils hashingUtils, AccessTokenManagerUtils tokenManagerUtils)
    {
        _context = context;
        _tokenManagerUtils = tokenManagerUtils;
        _hashingUtils = hashingUtils;
    }

    public async Task<LoggedInUserModel> Handle(LoginUserQuery request, CancellationToken cancellationToken)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(x => x.Username == request.LoginResource || x.Email == request.LoginResource,
                cancellationToken: cancellationToken);

        if (user == null || !_hashingUtils.VerifyPasswordHash(request.Password, user))
        {
            throw new CustomException(ErrorCode.Login_Credentials, "Wrong credentials.");
        }

        var result = new LoggedInUserModel
        {
            Id = user.Id,
            AccessToken = _tokenManagerUtils.GetToken(user.Id)
        };

        return result;
    }
}