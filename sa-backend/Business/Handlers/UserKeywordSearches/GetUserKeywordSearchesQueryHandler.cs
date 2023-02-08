using MediatR;
using Microsoft.EntityFrameworkCore;
using sentiment_analysis_be.Business.Queries.UserKeywordSearches;
using sentiment_analysis_be.Data;
using sentiment_analysis_be.Data.Models;

namespace sentiment_analysis_be.Business.Handlers.UserKeywordSearches;

public class GetUserKeywordSearchesQueryHandler: IRequestHandler<GetUserKeywordSearchesQuery, ICollection<UserKeywordSearch>>
{
    private readonly Context _context;

    public GetUserKeywordSearchesQueryHandler(Context context)
    {
        _context = context;
    }

    public async Task<ICollection<UserKeywordSearch>> Handle(GetUserKeywordSearchesQuery request, CancellationToken cancellationToken)
    {
        return await _context.UserKeywordSearches
            .ToListAsync(cancellationToken: cancellationToken);
    }
}