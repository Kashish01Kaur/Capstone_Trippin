using TripPlannerApp.Models;

namespace TripPlannerApp.Services
{
    public interface IPackageService
    {
        List<Package> Get();
        Package Get(string id);
        Package Create(Package package);
        void Update(string id, Package package);
        void Remove(string id); 
    }
}
