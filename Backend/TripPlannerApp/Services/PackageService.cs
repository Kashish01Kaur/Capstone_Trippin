using TripPlannerApp.Models;
using MongoDB.Driver;
using MongoDB.Bson;
namespace TripPlannerApp.Services
{
    public class PackageService : IPackageService
    {
        private readonly IMongoCollection<Package> _packages;

        public PackageService(IPackageStoreDatabaseSettings settings,IMongoClient mongoClient)
        {
            var database=mongoClient.GetDatabase(settings.DatabaseName);
            _packages=database.GetCollection<Package>(settings.PackageCollectionName);
        }
        public Package Create(Package package)
        {
           package.PackageId = ObjectId.GenerateNewId().ToString();
            _packages.InsertOne(package);
            return package;
        }

        public List<Package> Get()
        {
           return _packages.Find(package=>true).ToList();
        }

        public Package Get(string id)
        {
            return _packages.Find(package =>package.PackageId==id ).FirstOrDefault();
        }

        public void Remove(string id)
        {
            _packages.DeleteOne(package => package.PackageId == id);
        }

        public void Update(string id, Package package)
        {
            _packages.ReplaceOne(package => package.PackageId == id, package);
        }
    }
}
