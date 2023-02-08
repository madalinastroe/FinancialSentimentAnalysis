using MediatR;

namespace sentiment_analysis_be.Business.Commands.Articles;

public class AddArticleCommand: IRequest<bool>
{
    public DateTime Date { get; set; }
    
    public string ArticleContent { get; set; }
    
    public string ArticleBrief { get; set; } //summarized content
    
    public double Negative { get; set; }
    
    public double Neutral { get; set; }
    
    public double Positive { get; set; }
    
    public Guid UserId { get; set; }
    public Guid AccessToken { get; set; }

    public ICollection<string> Keywords { get; set; }
}