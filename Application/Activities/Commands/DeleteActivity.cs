using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Commands;

public class DeleteActivity
{
    public class Command : IRequest<Result<Unit>>
    {
        public required string Id { get; set; }
    }

    public class Handler(AppDbContext context, IUserAccessor userAccessor)
        : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities
                .Include(a => a.Attendees)
                .FirstOrDefaultAsync(a => a.Id == request.Id, cancellationToken);

            if (activity == null) return Result<Unit>.Failure("Activity not found", 404);


            var userId = userAccessor.GetUSerId();
            var isAdmin = userAccessor.IsInRole("Admin");
            var isHost = activity.Attendees.Any(a => a.IsHost && a.UserId == userId);

            if (!isHost && !isAdmin)
                return Result<Unit>.Failure("You are not the host of this activity", 403);

            context.Remove(activity);
            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            if (!result) return Result<Unit>.Failure("Failed to delete activity", 500);
            return Result<Unit>.Success(Unit.Value);
        }
    }
}