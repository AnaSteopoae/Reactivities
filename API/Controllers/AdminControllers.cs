using Domain;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers;

[Authorize(Roles = "Admin")]
public class AdminControllers(UserManager<User> userManager) : BaseApiController
{
    [HttpGet("users")]
    public async Task<ActionResult> GetAllUsers()
    {
        var users = userManager.Users.Select(u => new { u.Id, u.DisplayName, u.Email }).ToList();
        return Ok(users);
    }
}
