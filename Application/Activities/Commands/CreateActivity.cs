using Application.Activities.DTOs;
using Application.Core;
using Application.Interfaces;
using AutoMapper;
using Domain;
using MediatR;
using Persistence;


namespace Application.Activities.Commands;

public class CreateActivity
{
    public class Command : IRequest<Result<string>>
    {
        public required CreateActivityDTO ActivityDto { get; set; }

    }

    public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor) : IRequestHandler<Command, Result<string>>
    {
        public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
        {
            var user = await userAccessor.GetUserAsync();

            var activity = mapper.Map<Domain.Activity>(request.ActivityDto);
            context.Activities.Add(activity);

            var atendee = new ActivityAttendee
            {
                User = user,
                Activity = activity,
                IsHost = true,
                DateJoined = DateTime.UtcNow
            };

            activity.Attendees.Add(atendee);

            var result = await context.SaveChangesAsync(cancellationToken) > 0;
            if (!result) return Result<string>.Failure("Failed to create activity", 500);
            return Result<string>.Success(activity.Id);
        }
    }
}

