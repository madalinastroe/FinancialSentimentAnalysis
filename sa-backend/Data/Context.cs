using Microsoft.EntityFrameworkCore;
using sentiment_analysis_be.Data.Configurations;
using sentiment_analysis_be.Data.Models;

namespace sentiment_analysis_be.Data;
public class Context : DbContext
{
    public Context()
    {

    }
    public Context(DbContextOptions<Context> options) : base(options) { }
    
    public DbSet<User> Users { get; set; }
    public DbSet<Article> Articles { get; set; }
    
    public DbSet<Keyword> Keywords { get; set; }
    public DbSet<UserKeywordSearch> UserKeywordSearches { get; set; }
    
    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.ApplyConfiguration(new UserConfiguration());
        modelBuilder.ApplyConfiguration(new ArticleAnalysisConfiguration());
        modelBuilder.ApplyConfiguration(new UserKeywordSearchConfiguration());
        modelBuilder.ApplyConfiguration(new KeywordConfiguration());
    }
}
