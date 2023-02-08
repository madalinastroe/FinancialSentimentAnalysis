using MediatR;
using Microsoft.EntityFrameworkCore;
using sentiment_analysis_be.Business.Commands.Users;
using sentiment_analysis_be.Business.Extensions.Users;
using sentiment_analysis_be.Data;
using sentiment_analysis_be.Infrastructure;
using sentiment_analysis_be.Services;

namespace sentiment_analysis_be.Business.Handlers.Users;

public class AddUserCommandHandler : IRequestHandler<AddUserCommand, bool>
{
    private readonly Context _context;
    private readonly HashingUtils _hashingUtils;
    private readonly SendMailUtils _sendMail;
    
    public AddUserCommandHandler(Context context, HashingUtils hashingUtils, SendMailUtils sendMail)
    {
        _context = context;
        _hashingUtils = hashingUtils;
        _sendMail = sendMail;
    }
    
    public async Task<bool> Handle(AddUserCommand request, CancellationToken cancellationToken)
    {
        await ValidateIfUserExists(request.Email, request.Username);

        _context.Users.Add(request.ToUser(_hashingUtils));
        
        _sendMail.SendEmail(request.Email, "Registration process report", "Successful registration.");

        await _context.SaveChangesAsync(cancellationToken);
        
        return true;
    }
    
    private async Task ValidateIfUserExists(string email, string username)
    {
        var users = await _context.Users
            .Where(u => u.Email == email
                        || u.Username == username)
            .ToListAsync();
        
        if (users.Any(u => u.Email.Equals(email)))
        {
            throw new CustomException(ErrorCode.AddUser_Email, "Email should be unique");
        }

        if (users.Any(u => u.Username.Equals(username)))
        {
            throw new CustomException(ErrorCode.AddUser_Username, "Username should be unique");
        }
    }
}