namespace Domain;

public class Comment
{
    public string Id { get; set; } = Guid.NewGuid().ToString();
    public string Body { get; set; }
    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    //nav properties 
    public string UserId { get; set; }
    public User User { get; set; } = null!;
    public string ActivityId { get; set; }
    public Activity Activity { get; set; } = null!;
}
