using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configs;

public class UserFollowingConfig : IEntityTypeConfiguration<UserFollowing>
{
    public void Configure(EntityTypeBuilder<UserFollowing> builder)
    {
        builder.Property(a => a.ObserverId).IsRequired();
        builder.Property(a => a.TargetId).IsRequired();
   
        builder.HasKey(k => new { k.ObserverId, k.TargetId });

        builder.HasOne(o => o.Target)
                .WithMany(f => f.Followers)
            .HasForeignKey(o => o.TargetId)
            .OnDelete(DeleteBehavior.NoAction);

        builder.HasOne(o => o.Observer)
                .WithMany(f => f.Followings)
            .HasForeignKey(o => o.ObserverId)
            .OnDelete(DeleteBehavior.Cascade);
    }
}
