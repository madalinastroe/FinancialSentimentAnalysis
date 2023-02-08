using Newtonsoft.Json;
using sentiment_analysis_be.Infrastructure;

namespace sentiment_analysis_be.Services;

public class HuggingFaceUtils
{
    private const string ApiKey = "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";

    private const string SummarizerUri
        = "https://api-inference.huggingface.co/models/sshleifer/distilbart-cnn-12-6";

    private const string SentimentScoreUri
        = "https://api-inference.huggingface.co/models/ProsusAI/finbert";

    private const string KeyphraseExtractorUri
        = "https://api-inference.huggingface.co/models/ml6team/keyphrase-extraction-kbir-inspec";

    private const double SleepBuffer = 5;
    
    private readonly HttpClient _client;

    public HuggingFaceUtils()
    {
        _client = new HttpClient();
        _client.DefaultRequestHeaders.Add("Authorization", "Bearer " + ApiKey);
    }

    private async Task<string> CallModel(string uri, string args)
    {
        var bodyParams = new Dictionary<string, string>
        {
            { "inputs", args }
        };

        var response = await _client.PostAsJsonAsync(new Uri(uri), bodyParams);

        var result = await response.Content.ReadAsStringAsync();

        if (!result.Contains("\"error\"")
            || !result.Contains("\"estimated_time\"")
            || !result.Contains("is currently loading")) return result;

        try
        {
            var error = JsonConvert.DeserializeObject<LoadingErrorModel>(result);
            if (error is not null)
            {
                await Console.Out.WriteLineAsync(error.error + ". Estimated wait: " + error.estimated_time + " s.");
                Thread.Sleep(TimeSpan.FromSeconds(error.estimated_time + SleepBuffer));
                return await CallModel(uri, args);
            }
        }
        catch (JsonException e)
        {
        }

        return result;
    }

    public async Task<string> GetSummary(string args)
    {
        var result = await CallModel(SummarizerUri, args);
        var parsedResult = JsonConvert.DeserializeObject<List<SummaryModel>>(result);

        if (parsedResult is null)
        {
            throw new CustomException(
                ErrorCode.GetSummary_ParsingFailure,
                "Could not parse result from API: " + result
            );
        }

        return parsedResult[0].summary_text.Trim();
    }

    public async Task<string> GetSentimentScore(string args)
    {
        var result = await CallModel(SentimentScoreUri, args);
        var parsedResult = JsonConvert.DeserializeObject<List<ICollection<SentimentScoreModel>>>(result);

        if (parsedResult is null)
        {
            throw new CustomException(
                ErrorCode.GetSentimentScore_ParsingFailure,
                "Could not parse result from API: " + result);
        }

        return JsonConvert.SerializeObject(parsedResult[0]);
    }

    public async Task<IEnumerable<string>> GetKeyphrases(string args)
    {
        var result = await CallModel(KeyphraseExtractorUri, args);
        var parsedResult = JsonConvert.DeserializeObject<ICollection<KeyphraseResultModel>>(result);

        if (parsedResult is null)
        {
            throw new CustomException(
                ErrorCode.GetKeyphrases_ParsingFailure,
                "Could not parse result from API: " + result);
        }

        return parsedResult.Select(r => r.word.Trim()).Distinct();
    }
}