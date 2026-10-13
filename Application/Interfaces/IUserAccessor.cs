using Domain;

namespace Application.Interfaces;

public interface IUserAccessor
{
    string GetUSerId();
    bool IsInRole(string role);
    Task<User> GetUserAsync();
    Task<User> GetUserWithPhotosAsync();
}
