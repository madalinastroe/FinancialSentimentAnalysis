using MediatR;
using Microsoft.EntityFrameworkCore;
using sentiment_analysis_be.Business.Commands.Users;
using sentiment_analysis_be.Business.Extensions.Users;
using sentiment_analysis_be.Data;
using sentiment_analysis_be.Data.Models;
using sentiment_analysis_be.Infrastructure;
using sentiment_analysis_be.Services;
using sentiment_analysis_be.Services.AccessTokenUtils;

namespace sentiment_analysis_be.Business.Handlers.Users;

public class EditUserCommandHandler : IRequestHandler<EditUserCommand, bool>
{
    private readonly Context _context;
    private readonly HashingUtils _hashingUtils;
    private readonly AccessTokenManagerUtils _tokenManagerUtils;
    private User _dbUser;
    private byte[] _oldPasswordHash;
    private byte[] _oldPasswordSalt;

    public EditUserCommandHandler(Context context, HashingUtils hashingUtils, AccessTokenManagerUtils tokenManagerUtils)
    {
        _context = context;
        _hashingUtils = hashingUtils;
        _tokenManagerUtils = tokenManagerUtils;
    }

    public async Task<bool> Handle(EditUserCommand request, CancellationToken cancellationToken)
    {
        await ValidateIfUserExists(request.Id);
        ValidateToken(request);
        await ValidateIfEmailExists(request.Email, request.Id);
        await ValidateIfUsernameExists(request.Username, request.Id);

        if (request.NewPassword != "" && request.ConfirmPassword != "")
        {
            await ValidateIfPasswordsMatch(request.NewPassword, request.ConfirmPassword);

            _hashingUtils.CreatePasswordHash(request.ConfirmPassword, out var passwordHash, out var passwordSalt);

            UpdateUserDetails(request, passwordHash, passwordSalt);
        }
        else
        {
            UpdateUserDetails(request, _oldPasswordHash, _oldPasswordSalt);
        }

        _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;

        _context.Users.Update(_dbUser);
        await _context.SaveChangesAsync(cancellationToken);

        return true;
    }

    private async Task ValidateIfPasswordsMatch(string newPassword, string confirmPassword)
    {
        if (!newPassword.SequenceEqual(confirmPassword))
        {
            throw new CustomException(ErrorCode.EditUser_Password, "New Password and Confirm Password don't match.");
        }
    }

    private async Task ValidateIfUserExists(Guid id)
    {
        _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;

        _dbUser = await _context.Users
            .FirstOrDefaultAsync(u => u.Id == id);

        _oldPasswordHash = _dbUser.PasswordHash;
        _oldPasswordSalt = _dbUser.PasswordSalt;

        if (_dbUser is null)
        {
            throw new CustomException(ErrorCode.EditUser_User, "User does not exist!");
        }
    }

    private void ValidateToken(EditUserCommand request)
    {
        if (!_tokenManagerUtils.ValidateToken(request.Id, request.AccessToken))
        {
            throw new CustomException(ErrorCode.EditUser_InvalidToken, "Invalid token. Please log in.");
        }
    }

    private async Task ValidateIfUsernameExists(string username, Guid id)
    {
        _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;

        _dbUser = await _context.Users
            .FirstOrDefaultAsync(u => u.Id != id && u.Username.Equals(username));

        if (_dbUser is not null)
        {
            throw new CustomException(ErrorCode.EditUser_Username, "Username already exists!");
        }
    }

    private async Task ValidateIfEmailExists(string email, Guid id)
    {
        _context.ChangeTracker.QueryTrackingBehavior = QueryTrackingBehavior.NoTracking;

        _dbUser = await _context.Users
            .FirstOrDefaultAsync(u => email.ToLower() == u.Email.ToLower() && u.Id != id);

        if (_dbUser is not null)
        {
            throw new CustomException(ErrorCode.EditUser_Email, "Email already exists!");
        }
    }

    private void UpdateUserDetails(EditUserCommand command, byte[] passwordHash, byte[] passwordSalt)
    {
        _dbUser = command.ToUpdatedUser();
        _dbUser.PasswordHash = passwordHash;
        _dbUser.PasswordSalt = passwordSalt;
    }
}