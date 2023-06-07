using Microsoft.EntityFrameworkCore;
using Task_Manegment_Api.Models;

namespace Task_Manegment_Api.Data
{
    public class TaskManagementDbContext : DbContext
    {
        public DbSet<Task> Tasks { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserTask> UserTasks { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                string connectionString = "Data Source=OMAR-ZENBOOK;Initial Catalog=TaskManagementDB;Integrated Security=True";
                optionsBuilder.UseSqlServer(connectionString);
            }
        }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<UserTask>()
                .HasKey(ut => new { ut.UserID, ut.TaskID });

            modelBuilder.Entity<UserTask>()
                .HasOne(ut => ut.User)
                .WithMany(u => u.UserTasks)
                .HasForeignKey(ut => ut.UserID);

            modelBuilder.Entity<UserTask>()
                .HasOne(ut => ut.Task)
                .WithMany(t => t.UserTasks)
                .HasForeignKey(ut => ut.TaskID);
        }
    }
}