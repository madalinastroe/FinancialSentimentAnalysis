namespace sentiment_analysis_be.Business.Models.Users;

public class LoggedInUserModel
{
    public Guid Id { get; set; }
    
    public Guid AccessToken { get; set; }
}