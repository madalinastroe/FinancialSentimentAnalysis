using MediatR;

namespace sentiment_analysis_be.Business.Commands.Keywords;

public class AddKeywordCommand: IRequest<bool>
{
    public string Name { get; set; }
}