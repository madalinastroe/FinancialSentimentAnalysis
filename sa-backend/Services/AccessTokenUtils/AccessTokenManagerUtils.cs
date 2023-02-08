namespace sentiment_analysis_be.Services.AccessTokenUtils;

public class AccessTokenManagerUtils
{
    private const long MaxAgeSeconds = 3 * 3600;

    private readonly Dictionary<Guid, Token> _tokens = new();

    private static Token Create()
    {
        var token = new Token
        {
            Value = Guid.NewGuid(),
            CreationTime = DateTime.Now
        };

        return token;
    }
    
    public bool ValidateToken(Guid userId, Guid token)
    {
        var stored = _tokens.GetValueOrDefault(userId);

        if (stored is null) return false;
        if (IsExpired(stored.CreationTime)) return false;

        return stored.Value.Equals(token);
    }

    public Guid GetToken(Guid userId)
    {
        var stored = _tokens.GetValueOrDefault(userId);

        if (stored != null && !IsExpired(stored.CreationTime))
        {
            return stored.Value;
        }

        var t = Create();

        _tokens[userId] = t;
        return t.Value;
    }

    private static bool IsExpired(DateTime creationTime)
    {
        return DateTime.Now.Subtract(creationTime).TotalSeconds > MaxAgeSeconds;
    }
}