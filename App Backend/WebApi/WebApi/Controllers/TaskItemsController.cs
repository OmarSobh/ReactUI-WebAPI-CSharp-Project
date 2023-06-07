using System.Collections.Generic;
using System.Linq;
using Microsoft.AspNetCore.Mvc;
using WebApi.Data;
using WebApi.Models;

namespace WebApi.Controllers
{
    [ApiController]
    [Route("api/tasks")]
    public class TaskController : ControllerBase
    {
        private readonly TaskManagementDbContext _context;

        public TaskController(TaskManagementDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetTasks()
        {
            List<TaskItem> tasks = _context.TaskItems.ToList();
            return Ok(tasks);
        }

        [HttpGet("{id}")]
        public IActionResult GetTask(int id)
        {
            TaskItem task = _context.TaskItems.Find(id);
            if (task == null)
            {
                return NotFound();
            }
            return Ok(task);
        }

        [HttpPost]
        public IActionResult CreateTask(TaskItem task)
        {
            _context.TaskItems.Add(task);
            _context.SaveChanges();
            return CreatedAtAction(nameof(GetTask), new { id = task.TaskID }, task);
        }

        [HttpPut("{id}")]
        public IActionResult UpdateTask(int id, TaskItem updatedTask)
        {
            TaskItem task = _context.TaskItems.Find(id);
            if (task == null)
            {
                return NotFound();
            }

            task.Title = updatedTask.Title;
            task.Description = updatedTask.Description;
            task.DueDate = updatedTask.DueDate;
            task.Status = updatedTask.Status;

            _context.SaveChanges();

            return NoContent();
        }

        [HttpDelete("{id}")]
        public IActionResult DeleteTask(int id)
        {
            TaskItem task = _context.TaskItems.Find(id);
            if (task == null)
            {
                return NotFound();
            }

            _context.TaskItems.Remove(task);
            _context.SaveChanges();

            return NoContent();
        }
    }
}