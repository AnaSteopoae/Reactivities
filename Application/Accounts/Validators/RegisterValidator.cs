using Application.Accounts.Commands;
using FluentValidation;

namespace Application.Accounts.Validators;

public class RegisterValidator : AbstractValidator<Register.Command>
{
    public RegisterValidator()
    {
        RuleFor(x => x.DisplayName).NotEmpty();
        RuleFor(x => x.Email).NotEmpty().EmailAddress();
        RuleFor(x => x.Password).NotEmpty().MinimumLength(6);
    }
}
