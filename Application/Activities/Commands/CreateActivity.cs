using Application.Activities.DTOs;
using Application.Core;
using AutoMapper;
using Domain;
using FluentValidation;
using MediatR;
using Persistence;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Text;


namespace Application.Activities.Commands;

public class CreateActivity
{
    public class Command: IRequest<Result<string>>
    {
        public required CreateActivityDTO ActivityDto { get; set; }

    }

    public class Handler(AppDbContext context, IMapper mapper) : IRequestHandler<Command, Result<string>>
    {
        public async Task<Result<string>> Handle(Command request, CancellationToken cancellationToken)
        {
            
            var activity = mapper.Map<Domain.Activity>(request.ActivityDto);
            context.Activities.Add(activity);
            var result = await context.SaveChangesAsync(cancellationToken) > 0;
            if (!result) return Result<string>.Failure("Failed to create activity", 500);
            return Result<string>.Success(activity.Id);
        }
    }
}

