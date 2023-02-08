namespace sentiment_analysis_be.Business.Models.UserKeywordSearches;

public class UserKeywordSearchIdentifier
{
    public Guid Id { get; set; }
    
    public Guid UserId { get; set; }
    
    public string KeywordName { get; set; }
    
    public int NumberOfOccurrences { get; set; }
}