using MediatR;
using Microsoft.EntityFrameworkCore;
using sentiment_analysis_be.Business.Commands.UserKeywordSearches;
using sentiment_analysis_be.Data;
using sentiment_analysis_be.Data.Models;
using sentiment_analysis_be.Infrastructure;

namespace sentiment_analysis_be.Business.Handlers.UserKeywordSearches;

public class DeleteUserKeywordSearchCommandHandler: IRequestHandler<DeleteUserKeywordSearchCommand, bool>
{
    private readonly Context _context;
    private UserKeywordSearch _userKeywordSearch;

    public DeleteUserKeywordSearchCommandHandler(Context context)
    {
        _context = context;
    }

    public async Task<bool> Handle(DeleteUserKeywordSearchCommand request, CancellationToken cancellationToken)
    {
        await ValidateIfKeywordExists(request.Id);
        
        _context.UserKeywordSearches.Remove(_userKeywordSearch);
        await _context.SaveChangesAsync(cancellationToken);
        
        return true;
    }
    
    private async Task ValidateIfKeywordExists(Guid id)
    {
        _userKeywordSearch = await _context.UserKeywordSearches
            .FirstOrDefaultAsync(u => u.Id == id);
        
        if (_userKeywordSearch is null)
        {
            throw new CustomException(ErrorCode.DeleteSearch_InvalidKeyword, "This keyword does not exist.");
        }
    }
}