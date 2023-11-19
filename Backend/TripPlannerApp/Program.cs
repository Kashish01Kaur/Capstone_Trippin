using Microsoft.Extensions.Options;
using MongoDB.Driver;
using TripPlannerApp.Models;
using TripPlannerApp.Services;

var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
builder.Services.Configure<PackageStoreDatabaseSettings>(
                builder.Configuration.GetSection(nameof(PackageStoreDatabaseSettings)));

builder.Services.AddSingleton<IPackageStoreDatabaseSettings>(sp =>
    sp.GetRequiredService<IOptions<PackageStoreDatabaseSettings>>().Value);

builder.Services.AddSingleton<IMongoClient>(s =>
        new MongoClient(builder.Configuration.GetValue<string>("PackageStoreDatabaseSettings:ConnectionString")));

builder.Services.AddScoped<IPackageService, PackageService>();

builder.Services.AddScoped<IUserService, UserService>();

builder.Services.AddControllers();

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();


app.UseAuthorization();

app.UseCors(options =>
            options.AllowAnyOrigin()
            .AllowAnyMethod()
            .AllowAnyHeader());

app.MapControllers();

app.Run();
