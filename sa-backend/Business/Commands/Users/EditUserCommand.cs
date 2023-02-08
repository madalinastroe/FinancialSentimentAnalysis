using MediatR;

namespace sentiment_analysis_be.Business.Commands.Users;

/// <summary>
/// Edit user with new password and confirm password.
/// New password can match the old password.
/// Email cannot be updated.
/// </summary>
public class EditUserCommand : IRequest<bool>
{
    public Guid Id { get; set; }
    public Guid AccessToken { get; set; }
    public string FirstName { get; set; }
    public string LastName { get; set; }
    public string Username { get; set; }
    public string Email { get; set; }
    public string? NewPassword { get; set; }
    public string? ConfirmPassword { get; set; }
    
}