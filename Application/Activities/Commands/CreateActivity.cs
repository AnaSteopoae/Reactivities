using MediatR;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;
using Persistence;
using Domain;

namespace Application.Activities.Commands;

public class CreateActivity
{
    public class Command: IRequest<string>
    {
        public required Domain.Activity Activity { get; set; }

    }

    public class Handler(AppDbContext context) : IRequestHandler<Command, string>
    {
        public async Task<string> Handle(Command request, CancellationToken cancellationToken)
        {
            context.Activities.Add(request.Activity);
            var result = await context.SaveChangesAsync(cancellationToken) > 0;
            if (!result) throw new Exception("Problem saving changes");
            return request.Activity.Id;
        }
    }
}

