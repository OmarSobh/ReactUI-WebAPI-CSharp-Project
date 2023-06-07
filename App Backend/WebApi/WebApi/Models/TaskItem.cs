namespace WebApi.Models
{
    public class TaskItem
    {
        public int TaskID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime? DueDate { get; set; }
        public string Status { get; set; }

        public ICollection<UserTask> UserTasks { get; set; } // Navigation property
    }
}
