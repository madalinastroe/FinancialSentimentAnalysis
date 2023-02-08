using FluentValidation;
using sentiment_analysis_be.Business.Commands.Users;

namespace sentiment_analysis_be.Services.ValidatorUtils.UserValidator;

public class EditUserValidator : AbstractValidator<EditUserCommand>
{
    public EditUserValidator()
    {
        RuleFor(x => x.FirstName)
            .NotEmpty().WithMessage("First name can not be empty!")
            .Matches(@"^[A-Za-z-]{1,99}[a-z]$")
            .WithMessage("First name should have between 2 and 100 alpha characters!");

        RuleFor(x => x.LastName)
            .NotEmpty().WithMessage("Last name can not be empty!")
            .Matches(@"^[A-Za-z-]{1,99}[a-z]$")
            .WithMessage("Last name should have between 2 and 100 alpha characters!");
        
        RuleFor(x => x.Username)
            .NotEmpty().WithMessage("Username can not be empty!")
            .Matches(@"^[a-zA-Z0-9]{2,100}$")
            .WithMessage("Username should have between 2 and 100 alphanumeric characters!");

        RuleFor(x => x.Email)
            .NotEmpty().WithMessage("Email can not be empty!")
            .Matches(@"^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$")
            .WithMessage("Email should have a valid format!")
            .Length(7, 74).WithMessage("Email should have between 7 and 74 characters!");
    }
}