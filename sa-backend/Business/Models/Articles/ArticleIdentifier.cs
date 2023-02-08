namespace sentiment_analysis_be.Business.Models.Articles;

public class ArticleIdentifier
{
    public Guid ArticleId { get; set; }
    
    public DateTime Date { get; set; }
    public string ArticleBrief { get; set; }
}