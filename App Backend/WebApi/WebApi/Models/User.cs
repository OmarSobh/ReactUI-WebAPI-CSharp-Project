namespace WebApi.Models
{
    public class User
    {
        public int UserID { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }

        public ICollection<UserTask> UserTasks { get; set; } // Navigation property
    }

}
