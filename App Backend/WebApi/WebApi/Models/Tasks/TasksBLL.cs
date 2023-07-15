using System;
using WebApi.Models.Tasks;

namespace WebApi.Models
{
    public class TasksBLL
    {
        public static TodoTask[] GetAllTasks()
        {
            return TaskDBService.GetAllTasks();
        }

        public static TodoTask GetTaskById(int id)
        {
            return TaskDBService.GetTaskById(id);
        }

        public static void CreateTask(TodoTask task)
        {
            TaskDBService.CreateTask(task);
        }

        public static void UpdateTask(int id, TodoTask task)
        {
            TaskDBService.UpdateTask(id, task);
        }

        public static void DeleteTask(int id)
        {
            TaskDBService.DeleteTask(id);
        }

        public static TodoTask[] GetTasksByUserId(int userId)
        {
            return TaskDBService.GetTasksByUserId(userId);
        }
    }
}
