using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Date
{
    public class DataContext : DbContext
    {
        public DataContext(DbContextOptions<DataContext> options) : base(options){ }

        public DbSet<ModelsTest> models {  get; set; }
        public DbSet<AuthTest> auths { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<ModelsTest>().ToTable("models");
            modelBuilder.Entity<AuthTest>().ToTable("auths");
        }

    }
}
