using Domain;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;


namespace Persistence.Configs;

public class ActivityConfig : IEntityTypeConfiguration<Activity>
{
    public void Configure(EntityTypeBuilder<Activity> builder)
    {
        builder.Property(a => a.Title).IsRequired();
        builder.Property(a => a.Description).IsRequired();
        builder.Property(a => a.Category).IsRequired();
        builder.Property(a => a.City).IsRequired();
        builder.Property(a => a.Venue).IsRequired();
    }
}
