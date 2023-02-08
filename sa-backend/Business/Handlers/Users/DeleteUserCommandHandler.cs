using MediatR;
using Microsoft.EntityFrameworkCore;
using sentiment_analysis_be.Business.Commands.Users;
using sentiment_analysis_be.Data;
using sentiment_analysis_be.Data.Models;
using sentiment_analysis_be.Infrastructure;
using sentiment_analysis_be.Services;
using sentiment_analysis_be.Services.AccessTokenUtils;

namespace sentiment_analysis_be.Business.Handlers.Users;

public class DeleteUserCommandHandler : IRequestHandler<DeleteUserCommand, bool>
{
    private readonly Context _context;
    private readonly HashingUtils _hashingUtils;
    private readonly AccessTokenManagerUtils _tokenManagerUtils;
    
    private User _dbUser;

    public DeleteUserCommandHandler(Context context, HashingUtils hashingUtils, AccessTokenManagerUtils tokenManagerUtils)
    {
        _context = context;
        _hashingUtils = hashingUtils;
        _tokenManagerUtils = tokenManagerUtils;
    }

    public async Task<bool> Handle(DeleteUserCommand request, CancellationToken cancellationToken)
    {
        await ValidateIfUserExists(request.Id);
        ValidateToken(request);
        await ValidateIfPasswordsMatch(request.Id, request.Password);

        _context.Users.Remove(_dbUser);
        await _context.SaveChangesAsync(cancellationToken);
        
        return true;
    }
    
    private async Task ValidateIfPasswordsMatch(Guid id, string inputPassword)
    {
        _dbUser = await _context.Users
            .FirstOrDefaultAsync(u => u.Id.Equals(id));

        var passwordMatch = _hashingUtils.VerifyPasswordHash(inputPassword, _dbUser);
        
        if (!passwordMatch)
        {
            throw new CustomException(ErrorCode.DeleteUser_Password, "Incorrect password.");
        }
    }
    
    private async Task ValidateIfUserExists(Guid id)
    {
        var user = await _context.Users
            .FirstOrDefaultAsync(u => u.Id == id);
        
        if (user is null)
        {
            throw new CustomException(ErrorCode.DeleteUser_User, "User does not exist.");
        }
    }

    private void ValidateToken(DeleteUserCommand request)
    {
        if (!_tokenManagerUtils.ValidateToken(request.Id, request.AccessToken))
        {
            throw new CustomException(ErrorCode.DeleteUser_Token, "Invalid token. Please log in.");
        }
    }
}