using Microsoft.AspNetCore.Mvc;
using TripPlannerApp.Models;
using TripPlannerApp.Services;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace TripPlannerApp.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class PackagesController : ControllerBase
    {
        private readonly IPackageService packageService;

        public PackagesController(IPackageService packageService)
        {
            this.packageService = packageService;
        }
        // GET: api/<PackagesController>
        [HttpGet]
        public ActionResult<List<Package>> Get()
        {
            return packageService.Get();
        }

        // GET api/<PackagesController>/5
        [HttpGet("{id}")]
        public ActionResult<Package> Get(string id)
        {
            var package = packageService.Get(id);
            if(package == null)
            {
                return NotFound($"Package with PackageId={id}not found");
            }
            return package;
        }

        // POST api/<PackagesController>
        [HttpPost]
        public ActionResult<Package> Post([FromBody] Package package)
        {
            packageService.Create(package);
            return CreatedAtAction(nameof(Get), new {id=package.PackageId}, package);

        }

        // PUT api/<PackagesController>/5
        [HttpPut("{id}")]
        public ActionResult Put(string id, [FromBody] Package package)
        {
           var existingPackage= packageService.Get(id);
            if(existingPackage == null)
            {
                return NotFound($"Package with PackageId ={id}not found");
            }
            packageService.Update(id,package);
            return NoContent();
        }

        // DELETE api/<PackagesController>/5
        [HttpDelete("{id}")]
        public ActionResult Delete(string id)
        {
            var package=packageService.Get(id);
            if(package == null )
            {
                return NotFound($"Package with PackageId={id} not found");
            }
            packageService.Remove(package.PackageId);
            return Ok($"Package with PackageId={id}deleted");
        }
    }
}
