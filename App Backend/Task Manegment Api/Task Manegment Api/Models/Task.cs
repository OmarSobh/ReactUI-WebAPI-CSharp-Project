using System.Collections.Generic;

namespace Task_Manegment_Api.Models
{
    public class Task
    {
        public int TaskID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public bool IsCompleted { get; set; }

        public ICollection<UserTask> UserTasks { get; set; }
    }
}
