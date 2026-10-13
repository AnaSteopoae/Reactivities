using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Domain;

namespace Persistence.Configs;

internal class ActivityAttendeeConfig : IEntityTypeConfiguration<ActivityAttendee>
{
    public void Configure(EntityTypeBuilder<ActivityAttendee> builder)
    {
        builder.HasKey(a => new { a.ActivityId, a.UserId });

        builder.HasOne(a => a.User)
           .WithMany(u => u.Activities)
           .HasForeignKey(a => a.UserId)
           .IsRequired();

        builder.HasOne(a => a.Activity)
            .WithMany(ac => ac.Attendees)
            .HasForeignKey(a => a.ActivityId)
            .IsRequired();
    }
}
