using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Persistence.Configs;

public class PhotoConfig : IEntityTypeConfiguration<Photo>
{
    public void Configure(EntityTypeBuilder<Photo> builder)
    {
        builder.Property(a => a.Url).IsRequired();
        builder.Property(a => a.PublicId).IsRequired();
        builder.Property(a => a.UserId).IsRequired();
    }
}
