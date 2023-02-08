namespace sentiment_analysis_be.Data.Models;

public class Keyword
{
    public string Name { get; set; }
    
    public ICollection<Article> Articles { get; set; }
}