using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TripPlannerApp.Models
{
    public class User
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string UserId { get; set; } = string.Empty;
        [BsonElement("firstName")]
        public string FirstName { get; set; } = string.Empty;
        [BsonElement("lastName")]
        public string LastName { get; set; }= string.Empty;
        [BsonElement("email")]
        public string Email { get; set; } = string.Empty;
        [BsonElement("password")]
        public string Password { get; set; } = string.Empty;
        [BsonElement("contactNo")]
        public string ContactNo { get; set; } = string.Empty;
        [BsonElement("travelExperienceLevel")]
        public string TravelExperienceLevel { get; set; } = string.Empty;
        [BsonElement("travelBudget")]
        public double TravelBudget { get; set; }
        [BsonElement("role")]
        public string Role { get; set; }=string.Empty;

        [BsonElement("selectedAccommodations")]
        public List<Accommodation> SelectedAccommodations { get; set; } = new List<Accommodation>();
        [BsonElement("selectedActivities")]
        public List<Activity> SelectedActivities { get; set; } = new List<Activity>();

    }
   
}
