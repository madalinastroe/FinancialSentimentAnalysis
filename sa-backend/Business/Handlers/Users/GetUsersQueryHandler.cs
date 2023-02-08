using MediatR;
using Microsoft.EntityFrameworkCore;
using sentiment_analysis_be.Business.Queries.Users;
using sentiment_analysis_be.Data;
using sentiment_analysis_be.Data.Models;

namespace sentiment_analysis_be.Business.Handlers.Users;

public class GetUsersQueryHandler : IRequestHandler<GetUsersQuery, IEnumerable<User>>
{
    private readonly Context _context;
    
    public GetUsersQueryHandler(Context context)
    {
        _context = context;
    }
    
    public async Task<IEnumerable<User>> Handle(GetUsersQuery query, CancellationToken cancellationToken)
    {
        return await _context.Users
            .ToListAsync(cancellationToken: cancellationToken);
    }
}