namespace Task_Manegment_Api.Models
{
    public class UserTask
    {
        public int UserID { get; set; }
        public User User { get; set; }

        public int TaskID { get; set; }
        public Task Task { get; set; }
    }
}
