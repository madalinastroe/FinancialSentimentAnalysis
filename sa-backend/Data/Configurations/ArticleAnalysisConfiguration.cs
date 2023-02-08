using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using sentiment_analysis_be.Data.Models;

namespace sentiment_analysis_be.Data.Configurations;

public class ArticleAnalysisConfiguration: IEntityTypeConfiguration<Article>
{
    public void Configure(EntityTypeBuilder<Article> builder)
    {
        builder.HasKey(b => b.Id);
        builder.Property(b => b.Date).IsRequired();
        builder.Property(b => b.ArticleContent).IsRequired();
        builder.Property(b => b.Negative).IsRequired();
        builder.Property(b => b.Neutral).IsRequired();
        builder.Property(b => b.Positive).IsRequired();
        builder.Property(b => b.UserId).IsRequired();

        builder.HasOne<User>()
            .WithMany()
            .HasForeignKey(x => x.UserId)
            .OnDelete(DeleteBehavior.Restrict);
    }
}