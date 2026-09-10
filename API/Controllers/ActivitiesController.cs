using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

public class ActivitiesController(Persistence.AppDbContext context) : BaseApiController
{
    // private readonly AppDbContext context;
    // public ActivitiesController(AppDbContext context)
    // {
    //     this.context = context;
    // }

    [HttpGet]
    public async Task<ActionResult<List<Domain.Activity>>> GetActivities()
    {
        return await context.Activities.ToListAsync();
    }

    [HttpGet("{id}")]
    public async Task<ActionResult<Domain.Activity>> GetActivityDetail(string id)
    {
        var activity = await context.Activities.FindAsync(id);
        if(activity == null) return NotFound();
        return activity;
    }
}
