using sentiment_analysis_be.Business.Commands.Users;
using sentiment_analysis_be.Business.Models.Users;
using sentiment_analysis_be.Data.Models;
using sentiment_analysis_be.Services;

namespace sentiment_analysis_be.Business.Extensions.Users;

public static class UserExtension
{
    public static User ToUser(this AddUserCommand command, HashingUtils hashingUtils)
    {
        hashingUtils.CreatePasswordHash(command.Password, out var passwordHash, out var passwordSalt);
        return new User
        {
            FirstName = command.FirstName,
            LastName = command.LastName,
            Username = command.Username,
            Email = command.Email,
            PasswordHash = passwordHash,
            PasswordSalt = passwordSalt
        };
    }
    
    public static User ToUpdatedUser(this EditUserCommand command)
    {
        return new User
        {
            Id = command.Id,
            FirstName = command.FirstName,
            LastName = command.LastName,
            Username = command.Username,
            Email = command.Email
        };
    }

    public static IQueryable<UserIdentifier> ToUserIdentifier(this IQueryable<User> query)
    {
        return query.Select(user => new UserIdentifier
        {
            Id = user.Id,
            FirstName = user.FirstName,
            LastName = user.LastName,
            Username = user.Username,
            Email = user.Email
        });
    }
}