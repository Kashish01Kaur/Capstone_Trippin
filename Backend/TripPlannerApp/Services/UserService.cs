using MongoDB.Bson;
using MongoDB.Driver;
using TripPlannerApp.Models;

namespace TripPlannerApp.Services
{
    public class UserService : IUserService
    {
        private readonly IMongoCollection<User> _users;

        public UserService(IPackageStoreDatabaseSettings settings,IMongoClient mongoClient)
        {
            var database = mongoClient.GetDatabase(settings.DatabaseName);
            _users = database.GetCollection<User>(settings.UserCollectionName);
        }
        public User Create(User user)
        {
            user.UserId = ObjectId.GenerateNewId().ToString();
            _users.InsertOne(user);
            return user;
        }

        public List<User> Get()
        {
            return _users.Find(user => true).ToList();
        }

        public User Get(string id)
        {
            return _users.Find(user => user.UserId == id).FirstOrDefault();
        }

        public void Remove(string id)
        {
            _users.DeleteOne(user => user.UserId == id);
        }

        public void Update(string id, User user)
        {
            _users.ReplaceOne(user => user.UserId == id, user);
        }
        public async Task<User> Register(User users)
        {
            users.Password = BCrypt.Net.BCrypt.HashPassword(users.Password);
            await _users.InsertOneAsync(users);
            return users;
        }
        public async Task<User> Login(string email, string password)
        {
            var user = await _users.Find(user => user.Email == email).FirstOrDefaultAsync();
            if (user != null && BCrypt.Net.BCrypt.Verify(password, user.Password))
            {
                return user;
            }
            return null;
        }

        public async Task<List<Accommodation>> GetAccommodations(string userId)
        {
            var user=await _users.Find(u=>u.UserId == userId).FirstOrDefaultAsync();
            return user.SelectedAccommodations;
        }
        public async Task AddAccommodationToItinerary(string userId, Accommodation accommodation)
        {
            var filter = Builders<User>.Filter.Eq(u => u.UserId, userId);
            var update = Builders<User>.Update.Push(u => u.SelectedAccommodations, accommodation);

            await _users.UpdateOneAsync(filter, update);
        }
        public void RemoveAccommodationFromItinerary(string userId, string hotelId)
        {
            var user = _users.AsQueryable()
                .FirstOrDefault(u => u.UserId == userId);

            if (user != null)
            {
                var accommodationToRemove = user.SelectedAccommodations.FirstOrDefault(a => a.HotelId == hotelId);

                if (accommodationToRemove != null)
                {
                    user.SelectedAccommodations.Remove(accommodationToRemove);
                    _users.ReplaceOne(u => u.UserId == userId, user);
                }
            }
        }

        public async Task<List<Activity>> GetActivities(string userId)
        {
            var user= await _users.Find(u=> u.UserId == userId).FirstOrDefaultAsync();
            return user.SelectedActivities;
        }
        public async Task AddActivityToItinerary(string userId, Activity activity)
        {
            var filter =Builders<User>.Filter.Eq(u=>u.UserId,userId);
            var update = Builders<User>.Update.Push(u => u.SelectedActivities, activity);

            await _users.UpdateOneAsync(filter,update);
        }
        public void RemoveActivityFromItinerary(string userId, string activityId)
        {
            var user= _users.AsQueryable()
                .FirstOrDefault(u=>u.UserId == userId);

            if(user != null)
            {
                var activityToRemove=user.SelectedActivities.FirstOrDefault(a=>a.ActivityId==activityId);
                if(activityToRemove != null)
                {
                    user.SelectedActivities.Remove(activityToRemove);
                    _users.ReplaceOne(u=>u.UserId == userId, user);
                }
            }
        }
    }

   
}


