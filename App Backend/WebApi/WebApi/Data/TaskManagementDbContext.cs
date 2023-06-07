using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Reflection.Emit;
using WebApi.Models;

namespace WebApi.Data
{
    public class TaskManagementDbContext : DbContext
    {
        public DbSet<TaskItem> TaskItems { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<UserTask> UserTasks { get; set; }

        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            if (!optionsBuilder.IsConfigured)
            {
                optionsBuilder.UseSqlServer("DefaultConnection");
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
