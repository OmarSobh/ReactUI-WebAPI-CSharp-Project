using System;

namespace WebApi.Models.Tasks
{
    public class TodoTask
    {
        public int ID { get; set; }
        public string Title { get; set; }
        public string Description { get; set; }
        public DateTime CreatedDate { get; set; }
        public int UserID { get; set; }
    }
}
