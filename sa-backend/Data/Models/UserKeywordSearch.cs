namespace sentiment_analysis_be.Data.Models;

public class UserKeywordSearch
{
    public Guid Id { get; set; }
    public Guid UserId { get; set; }
    public DateTime Timestamp { get; set; }
    
    public string KeywordName { get; set; }
}