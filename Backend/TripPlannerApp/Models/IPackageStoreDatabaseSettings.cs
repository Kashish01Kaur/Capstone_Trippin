namespace TripPlannerApp.Models
{
    public interface IPackageStoreDatabaseSettings
    {
    string PackageCollectionName { get; set; } 
    string UserCollectionName { get;set; }
    string ConnectionString { get; set; }
    string DatabaseName { get; set; }
    }
}
