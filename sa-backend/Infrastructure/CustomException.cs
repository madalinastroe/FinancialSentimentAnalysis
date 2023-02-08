using System.Text.Json;

namespace sentiment_analysis_be.Infrastructure;

public class CustomException : Exception
{
    public CustomException(ErrorCode statusCode, string message) :
        base(JsonSerializer.Serialize(new
        {
            StatusCode = (uint)statusCode,
            Message = message,
        }))
    {
    }
}