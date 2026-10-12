using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configs;

public class CommentConfig : IEntityTypeConfiguration<Comment>
{
    public void Configure(EntityTypeBuilder<Comment> builder)
    {
        builder.Property(a => a.Body).IsRequired();
        builder.Property(a => a.ActivityId).IsRequired();
        builder.Property(a => a.UserId).IsRequired();
    }
}
