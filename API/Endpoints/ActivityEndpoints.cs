using Application.Activities.Commands;
using Application.Activities.Queries;
using Domain;
using MediatR;

namespace API.Endpoints;

public static class ActivityEndpoints
{
    public static void MapActivityEndpoints(this WebApplication app)
    {
        var group = app.MapGroup("/api/activities");

        group.MapGet("", async (IMediator mediator) =>
            await mediator.Send(new GetActivityList.Query()));

        group.MapGet("/{id}", async (string id, IMediator mediator) =>
            await mediator.Send(new GetActivityDetails.Query { Id = id }));

        group.MapPost("", async (Activity activity, IMediator mediator) =>
            await mediator.Send(new CreateActivity.Command { Activity = activity }));

        group.MapPut("", async (Activity activity, IMediator mediator) =>
        {
            await mediator.Send(new EditActivity.Command { Activity = activity });
            return Results.NoContent();
        });
    }
}