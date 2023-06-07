namespace WebApi.Models
{
    public class UserTask
    {
        public int UserID { get; set; }
        public int TaskID { get; set; }
        public User User { get; set; }
        public TaskItem Task { get; set; }
    }
}
