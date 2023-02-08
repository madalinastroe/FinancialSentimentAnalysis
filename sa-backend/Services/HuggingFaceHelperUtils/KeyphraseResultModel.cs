namespace sentiment_analysis_be.Services;

public class KeyphraseResultModel
{
    public string entity_group { get; set; }
    public double score { get; set; }
    public string word { get; set; }
    public int start { get; set; }
    public int end { get; set; }
}