using System.Text.Json.Serialization;

namespace Domain;

public class Photo
{
    public string Id { get; set; } = Guid.NewGuid().ToString();

    public string Url { get; set; }

    public string PublicId { get; set; }

    //nav properties

    [JsonIgnore]
    public User User { get; set; } = null!;
    public string UserId { get; set; }
}

