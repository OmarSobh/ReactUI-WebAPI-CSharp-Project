using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using WebApi.Models;
using WebApi.Models.LoginData;

namespace WebApi.Controllers
{
    public class UsersController : ApiController
    {
        
        public IHttpActionResult GetAllUsers()
        {
            try
            {
                User[] users = UsersBLL.GetALLUsersFromDB(UserRole.ADMIN);
                return Ok(users);
            }
            catch (Exception e)
            {
                return BadRequest(e.Message);
            }
        }

        [HttpGet]
        public IHttpActionResult GetUser(int id)
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

        [HttpPost]
        public IHttpActionResult CreateUser(User user)
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

        [HttpPut]
        public IHttpActionResult UpdateUser(int id, User user)
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

        [HttpDelete]
        public IHttpActionResult DeleteUser(int id)
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

        [Route("api/users/login")] // Add a route to specify the login endpoint
        public IHttpActionResult LoginUser(LoginData loginModel)
        {
            try
            {
                User user = UsersBLL.Login(loginModel.Email, loginModel.Password);
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
    }
}
