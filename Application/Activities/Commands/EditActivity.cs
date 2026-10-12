using Application.Activities.DTOs;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Activities.Commands;

public class EditActivity
{
    public class Command : IRequest<Result<Unit>>
    {
        public required EditActivityDto ActivityDto { get; set; }
    }

    public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor) : IRequestHandler<Command, Result<Unit>>
    {
        public async Task<Result<Unit>> Handle(Command request, CancellationToken cancellationToken)
        {
            var activity = await context.Activities.Include(a => a.Attendees).FirstOrDefaultAsync(a => a.Id == request.ActivityDto.Id, cancellationToken);
            if (activity == null)
                return Result<Unit>.Failure("Activity not found", 404);

            var userId = userAccessor.GetUSerId();
            var isHost = activity.Attendees.Any(a => a.IsHost && a.UserId == userId);
            if (!isHost)
                return Result<Unit>.Failure("You are not the host of this activity", 403);


            mapper.Map(request.ActivityDto, activity);
            var result = await context.SaveChangesAsync(cancellationToken) > 0;

            if (!result)
                return Result<Unit>.Failure("Failed to update activity", 500);
            return Result<Unit>.Success(Unit.Value);

        }
    }
}

