using BarcodeAPI.Data.Models;
using Microsoft.EntityFrameworkCore;
using UserBackend.Data.Models;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;

namespace UserBackend.Data
{
    public class MyDbContext : IdentityDbContext<AppUser>
    {
        public MyDbContext(DbContextOptions<MyDbContext> options) : base(options) 
        { 
        }

        public DbSet<Barcode> Barcode { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            var configuration = new ConfigurationBuilder()
                .SetBasePath(AppDomain.CurrentDomain.BaseDirectory)
                .AddJsonFile("secret.json")
                .Build();
        
            //optionsBuilder.UseSqlServer(configuration.GetConnectionString("MyDatabase"));
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);


             modelBuilder.Entity<AppUser>()
               .HasMany(e => e.Barcodes)
               .WithOne(e => e.AppUser)
               .HasForeignKey(e => e.AppUserId)
               .IsRequired(false);
 
        }
    }
}