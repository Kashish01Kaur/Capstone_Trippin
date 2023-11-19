using Microsoft.AspNetCore.Mvc;
using MongoDB.Bson;
using TripPlannerApp.Models;
using TripPlannerApp.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TripPlannerApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UsersController : ControllerBase
    {
        private readonly IUserService userService;

        public UsersController(IUserService userService)
        {
            this.userService = userService;
        }
        // GET: api/<UsersController>
        [HttpGet]
        public ActionResult<List<User>> Get()
        {
            return userService.Get();
        }

        // GET api/<UsersController>/5
        [HttpGet("{id}")]
        public ActionResult<User> Get(string id)
        {
           var user=userService.Get(id);
            if(user == null)
            {
                return NotFound($"User with UserId={id}not found");
            }
            return user;
        }

        // POST api/<UsersController>
        [HttpPost]
        public ActionResult<User> Post([FromBody] User user)
        {
            userService.Create(user);
            return CreatedAtAction(nameof(Get), new { id = user.UserId }, user);
        }

        // PUT api/<UsersController>/5
        [HttpPut("{id}")]
        public ActionResult Put(string id, [FromBody] User user)
        {
            var existingUser = userService.Get(id);
            if(existingUser == null)
            {
                return NotFound($"User with UserId={id} not found");
            }
            userService.Update(id, user);
            return NoContent();
        }

        // DELETE api/<UsersController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            var user = userService.Get(id);
            if (user == null)
            {
                return NotFound($"User with UserId={id} not found");
            }
            userService.Remove(user.UserId);
            return Ok($"User with UserId={id}deleted");
        }
        [HttpPost]
        [Route("register")]
        public async Task<IActionResult> Register(User users)
        {
            users.UserId = ObjectId.GenerateNewId().ToString();
            var registeredUser = await userService.Register(users);
            return Ok(registeredUser);
        }

        [HttpPost]
        [Route("login")]
        public async Task<IActionResult> Login(User users)
        {
            var loginUser = await userService.Login(users.Email, users.Password);
            if (loginUser == null)
            {
                return Unauthorized();
            }
            else
            {
                return Ok(loginUser);
            }
        }

        //Task<List<Activity>> GetActivities(string userId);
        //public Task AddActivityToItinerary(string userId, Activity activity);
        //void RemoveActivityFromItinerary(string userId, string activityId);

        //GET api/<PackagesController>/5
        [HttpGet("{id}/itineraryAccommodation")]
        public async Task<IActionResult> GetAccommodations(string id)
        {
            var itinerary=await userService.GetAccommodations(id);
            return Ok(itinerary);
        }

        [HttpPost("{userId}/itineraryAccommodation")]
        public async Task<IActionResult> AddAccommodationToItinerary(string userId, [FromBody] Accommodation accommodation)
        {
            await userService.AddAccommodationToItinerary(userId, accommodation);
            return Ok();
        }

        [HttpDelete("{userId}/accommodations/{hotelId}")]
        public IActionResult RemoveAccommodationFromItinerary(string userId, string hotelId)
        {
            try
            {
                userService.RemoveAccommodationFromItinerary(userId, hotelId);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error removing accommodation from itinerary: {ex.Message}");
            }
        }

        [HttpGet("{id}/itineraryActivity")]
        public async Task<IActionResult> GetActivities(string id)
        {
            var itinerary= await userService.GetActivities(id);
            return Ok(itinerary);
        }

        [HttpPost("{userId}/itineraryActivity")]
        public async Task<IActionResult> AddActivityToItinerary(string userId, [FromBody] Activity activity)
        {
            await userService.AddActivityToItinerary(userId, activity);
            return Ok();
        }

        [HttpDelete("{userId}/activities/{activityId}")]
        public IActionResult RemoveActivityFromItinerary(string userId, string activityId)
        {
            try
            {
                userService.RemoveActivityFromItinerary(userId, activityId);
                return Ok();
            }
            catch (Exception ex)
            {
                return StatusCode(500, $"Error removing accommodation from itinerary: {ex.Message}");
            }
        }

    }
}
