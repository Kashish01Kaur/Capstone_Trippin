using TripPlannerApp.Models;

namespace TripPlannerApp.Services
{
    public interface IUserService
    {
        List<User> Get();
        User Get(string id);
        User Create(User user);
        void Update(string id,User user);
        void Remove(string id);
        Task<User> Register(User users);
        Task<User> Login(string email, string password);
        Task<List<Accommodation>> GetAccommodations(string userId);
        public Task AddAccommodationToItinerary(string userId,Accommodation accommodation);
        void RemoveAccommodationFromItinerary(string userId, string hotelId);
        Task<List<Activity>> GetActivities(string userId);
        public Task AddActivityToItinerary(string userId, Activity activity);
        void RemoveActivityFromItinerary(string userId, string activityId);


    }
}
