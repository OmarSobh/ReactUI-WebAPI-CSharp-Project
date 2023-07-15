using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApi.Models;

namespace WebApi.Controllers
{
    public class UsersController : ApiController
    {
        public IHttpActionResult Get()
        {
            try
            {
                UserRole ur = UserRole.ADMIN;
                User[] users = UsersBLL.GetALLUsersFromDB(ur);
                return Ok(users);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        public IHttpActionResult Get(int id)
        {
            try
            {
                User user = UsersBLL.GetUserById(id);
                if (user != null)
                    return Ok(user);
                else
                    return NotFound();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        public IHttpActionResult Post([FromBody] User user)
        {
            try
            {
                UsersBLL.CreateUser(user);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        public IHttpActionResult Put(int id, [FromBody] User user)
        {
            try
            {
                UsersBLL.UpdateUser(id, user);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        public IHttpActionResult Delete(int id)
        {
            try
            {
                UsersBLL.DeleteUser(id);
                return Ok();
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }
    }
}
