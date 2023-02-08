using MediatR;
using Microsoft.EntityFrameworkCore;
using sentiment_analysis_be.Business.Queries.Keywords;
using sentiment_analysis_be.Data;
using sentiment_analysis_be.Data.Models;

namespace sentiment_analysis_be.Business.Handlers.Keywords;

public class GetKeywordsQueryHandler: IRequestHandler<GetKeywordsQuery, ICollection<Keyword>>
{
    private readonly Context _context;

    public GetKeywordsQueryHandler(Context context)
    {
        _context = context;
    }


    public async Task<ICollection<Keyword>> Handle(GetKeywordsQuery request, CancellationToken cancellationToken)
    {
        return await _context.Keywords.ToListAsync(cancellationToken: cancellationToken);
    }
}