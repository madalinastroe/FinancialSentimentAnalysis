namespace sentiment_analysis_be.Data.Models;

public class Article
{
    public Guid Id { get; set; }
    
    public DateTime Date { get; set; }
    
    public string ArticleContent { get; set; }
    
    public string ArticleBrief { get; set; } //summarized content
    
    public double Negative { get; set; }
    
    public double Neutral { get; set; }
    
    public double Positive { get; set; }
    
    public Guid UserId { get; set; }

    public ICollection<Keyword> Keywords { get; set; }
}