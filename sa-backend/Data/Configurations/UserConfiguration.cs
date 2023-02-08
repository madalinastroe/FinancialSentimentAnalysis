using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using sentiment_analysis_be.Data.Models;

namespace sentiment_analysis_be.Data.Configurations;
public class UserConfiguration : IEntityTypeConfiguration<User>
{
    public void Configure(EntityTypeBuilder<User> builder)
    {
        builder.HasKey(b => b.Id);
        builder.Property(b => b.FirstName).IsRequired();
        builder.Property(b => b.LastName).IsRequired();
        builder.Property(b => b.Username).IsRequired();
        builder.Property(b => b.Email).IsRequired();
        builder.Property(b => b.PasswordHash).IsRequired();
        builder.Property(b => b.PasswordSalt).IsRequired();
    }
}