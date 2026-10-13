using Application.Core;
using Application.Interfaces;
using MediatR;
using Microsoft.EntityFrameworkCore;
using Persistence;
using System;
using System.Collections.Generic;
using System.Text;

namespace Application.Activities.Commands;

public class DeleteComment
{
    public class Command : IRequest<Result<string>>
    {
        public required string CommentId { get; set; }
    }

    public class Handler(AppDbContext context, IUserAccessor userAccessor) : IRequestHandler<Command, Result<string>>
    {
        public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
        {
            var comment = await context.Comments.FirstOrDefaultAsync(c => c.Id == request.CommentId, cancellationToken);

            if (comment == null) return Result<string>.Failure("Comment not found", 404);

            var userId = userAccessor.GetUSerId();
            var isOwner = comment.UserId == userId;
            var isModerator = userAccessor.IsInRole("Moderator") || userAccessor.IsInRole("Admin");

            if (!isOwner && !isModerator)
                return Result<string>.Failure("You cannot delete this comment", 403);

            var activityId = comment.ActivityId;
            context.Comments.Remove(comment);

            var result = await context.SaveChangesAsync(cancellationToken) > 0;
            return result
                ? Result<string>.Success(activityId)
                : Result<string>.Failure("Failed to delete comment", 400);
        }
    }
}
