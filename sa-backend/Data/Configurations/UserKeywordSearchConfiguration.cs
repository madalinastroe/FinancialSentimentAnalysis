using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using sentiment_analysis_be.Data.Models;

namespace sentiment_analysis_be.Data.Configurations;

public class UserKeywordSearchConfiguration: IEntityTypeConfiguration<UserKeywordSearch>
{
    public void Configure(EntityTypeBuilder<UserKeywordSearch> builder)
    {
        builder.HasKey(b => b.Id);
        builder.Property(b => b.UserId).IsRequired();
        builder.Property(b => b.Timestamp).IsRequired();
    }
}