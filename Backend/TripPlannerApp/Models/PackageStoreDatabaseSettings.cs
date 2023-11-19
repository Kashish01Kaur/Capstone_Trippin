﻿namespace TripPlannerApp.Models
{
    public class PackageStoreDatabaseSettings : IPackageStoreDatabaseSettings
    {
        public string PackageCollectionName { get; set; }=string.Empty;
        public string UserCollectionName { get; set; }= string.Empty;
        public string ConnectionString{ get; set; }=string.Empty;
        public string DatabaseName { get; set; } = string.Empty;
    
    }
}
