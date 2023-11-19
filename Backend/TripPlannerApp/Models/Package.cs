using MongoDB.Bson;
using MongoDB.Bson.Serialization.Attributes;

namespace TripPlannerApp.Models
{
    [BsonIgnoreExtraElements]
    public class Package
    {
        [BsonId]
        [BsonRepresentation(BsonType.ObjectId)]
        public string PackageId { get; set; } = string.Empty;
        [BsonElement("destination")]
        public string Destination { get; set; } = string.Empty;
        [BsonElement("destinationImage")]
        public string DestinationImage { get; set; }= string.Empty;
        [BsonElement("destinationDescription")]
        public string DestinationDescription { get; set; } = string.Empty;
        [BsonElement("destinationLocation")]
        public Location DestinationLocation { get; set; } = new Location();
        [BsonElement("noOfDays")]
        public int NoOfDays { get; set; }
        [BsonElement("accommodations")]
        public List<Accommodation> Accommodations { get; set; } = new List<Accommodation>();
        [BsonElement("activities")]
        public List<Activity> Activities { get; set; } = new List<Activity>();

        [BsonElement("busFare")]
        public double BusFare { get; set; }
        [BsonElement("trainFare")]
        public double TrainFare { get; set; }
        [BsonElement("airlineFare")]
        public double AirlineFare { get; set; }
        [BsonElement("totalBudget")]
        public double TotalBudget { get; set; }//default value of the budget 
       

    }
    public class Accommodation
    {
        [BsonElement("hotelId")]
        public string HotelId { get; set; } = string.Empty;
        [BsonElement("hotelName")]
        public string HotelName { get; set; } = string.Empty;
        [BsonElement("hotelDescription")]
        public string HotelDescription { get; set; } = string.Empty;
        [BsonElement("hotelImage")]
        public string HotelImage { get; set; } = string.Empty;
        [BsonElement("hotelLocation")]
        public Location HotelLocation { get; set; } = new Location();
        [BsonElement("reviews")]
        public List<Review> Reviews { get; set; } = new List<Review>();
        [BsonElement("stayAmt")]
        public double StayAmt { get; set; }
    }
    public class Activity

    {
        [BsonElement("activityId")]
        public string ActivityId { get; set; } = string.Empty;
        [BsonElement("activityName")]
        public string ActivityName { get; set; } = string.Empty;
        [BsonElement("activityDescription")]
        public string ActivityDescription { get; set; } = string.Empty;
        [BsonElement("activityImage")]
        public string ActivityImage { get; set; } = string.Empty;
        [BsonElement("activityLocation")]
        public Location ActivityLocation { get; set; } = new Location();
        [BsonElement("reviews")]
        public List<Review> Reviews { get; set; } = new List<Review>();
    }
    public class Location
    {
        [BsonElement("type")]
        public string Type { get; set; } = "Point";//sport or traditional or ...
        [BsonElement("coordinates")]
        public double[] Coordinates { get; set; } = new double[2];
    }
   
    public class Review
    {
        [BsonElement("reviewDescription")]
        public string ReviewDescription { get; set; } = string.Empty;
        [BsonElement("rating")]
        public int Rating { get; set; }
    }
    
}
