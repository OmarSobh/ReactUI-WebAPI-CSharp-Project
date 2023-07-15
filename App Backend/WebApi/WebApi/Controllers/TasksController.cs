using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApi.Models;
using WebApi.Models.Tasks;

namespace WebApi.Controllers
{
    public class TasksController : ApiController
    {
        [HttpGet]
        public IHttpActionResult GetAllTasks()
        {
            try
            {
                TodoTask[] tasks = TaskDBService.GetAllTasks();
                return Ok(tasks);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        public IHttpActionResult GetTask(int id)
        {
            try
            {
                TodoTask task = TaskDBService.GetTaskById(id);
                if (task != null)
                    return Ok(task);
                else
                    return NotFound();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPost]
        public IHttpActionResult CreateTask( TodoTask task)
        {
            try
            {
                TaskDBService.CreateTask(task);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpPut]
        public IHttpActionResult UpdateTask(int id, [FromBody] TodoTask task)
        {
            try
            {
                TaskDBService.UpdateTask(id, task);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpDelete]
        public IHttpActionResult DeleteTask(int id)
        {
            try
            {
                TaskDBService.DeleteTask(id);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [Route("api/tasks/user/{userId}")]
        public IHttpActionResult GetTasksByUserId(int userId)
        {
            try
            {
                TodoTask[] tasks = TasksBLL.GetTasksByUserId(userId);
                return Ok(tasks);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
