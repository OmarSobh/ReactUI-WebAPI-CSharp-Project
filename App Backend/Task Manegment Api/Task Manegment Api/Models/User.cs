using System.Collections.Generic;

namespace Task_Manegment_Api.Models
{
    public class User
    {
        public int UserID { get; set; }
        public string Name { get; set; }
        public string Email { get; set; }

        public ICollection<UserTask> UserTasks { get; set; }
    }
}
