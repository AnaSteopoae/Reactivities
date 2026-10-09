using Application.Core;

namespace Application.Activities.Queries;

public class ActivityParams : PaginationParams<DateTime?>
{
    public string? Filter { get; set; }
    public DateTime StartTime { get; set; } = DateTime.UtcNow;
}
