using Domain;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion;

namespace Persistence;

public class AppDbContext(DbContextOptions options) : IdentityDbContext<User>(options)
{
    public required DbSet<Activity> Activities { get; set; }
    public required DbSet<ActivityAttendee> ActivityAttendees { get; set; }

    public required DbSet<Photo> Photos { get; set; }
    public required DbSet<Comment> Comments { get; set; }

    public required DbSet<UserFollowing> UserFollowings { get; set; }

    protected override void OnModelCreating(ModelBuilder builder)
    {
        base.OnModelCreating(builder); //configureaza tabelele pentru Identity

        builder.ApplyConfigurationsFromAssembly(typeof(AppDbContext).Assembly);

        var dateTimeConverter = new ValueConverter<DateTime, DateTime>(
            v => v.ToUniversalTime(),
            v => DateTime.SpecifyKind(v, DateTimeKind.Utc)
        );

        foreach (var entityType in builder.Model.GetEntityTypes())
        {
            foreach (var property in entityType.GetProperties())
            {
                if (property.ClrType == typeof(DateTime))
                {
                    property.SetValueConverter(dateTimeConverter);
                }
            }
        }

    }
}