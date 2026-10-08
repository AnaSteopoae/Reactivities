using Application.Core;
using Application.Interfaces;
using Application.Profiles.DTOs;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;

namespace Application.Profiles.Queries;

public class GetFollowing
{
    public class Query : IRequest<Result<List<UserProfile>>>
    {
        public required string UserId { get; set; }
        public string Predicate { get; set; } = "followers";
    }

    public class Handler(AppDbContext context, IMapper mapper, IUserAccessor userAccessor) : IRequestHandler<Query, Result<List<UserProfile>>>
    {
        public async Task<Result<List<UserProfile>>> Handle(Query request, CancellationToken cancellationToken)
        {
            var profile = new List<UserProfile>();
            switch (request.Predicate)
            {
                case "followers":
                    profile = await context.UserFollowings
                        .Where(x => x.TargetId == request.UserId)
                        .Select(u => u.Observer)
                        .ProjectTo<UserProfile>(mapper.ConfigurationProvider, new { currentUserId = userAccessor.GetUSerId() })
                        .ToListAsync(cancellationToken);
                    break;
                case "following":
                    profile = await context.UserFollowings
                        .Where(x => x.ObserverId == request.UserId)
                        .Select(u => u.Target)
                        .ProjectTo<UserProfile>(mapper.ConfigurationProvider, new { currentUserId = userAccessor.GetUSerId() })
                        .ToListAsync(cancellationToken);
                    break;
            }
            return Result<List<UserProfile>>.Success(profile);
        }
    }
}
