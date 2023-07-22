using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace WebApi.Models
{
    public enum UserRole { ADMIN, USER, SUPERUSER }

    public class UsersBLL
    {
        public static User[] GetALLUsersFromDB(UserRole ur)
        {
            User[] users = null;

            if (ur == UserRole.ADMIN)
            {
                users = UserDBService.GetAllUsers();
            }
            else
            {
                users = UserDBService.GetAllUsers().Where(user => user.Id != 1).ToArray();
            }
            return users;
        }

        public static User GetUserById(int id)
        {
            return UserDBService.GetUserById(id);
        }

        public static void CreateUser(User user)
        {
            UserDBService.CreateUser(user);
        }

        public static void UpdateUser(int id, User user)
        {
            UserDBService.UpdateUser(id, user);
        }

        public static void DeleteUser(int id)
        {
            UserDBService.DeleteUser(id);
        }

         public static User Login(string email, string password)
        {
            return UserDBService.LoginUser(email, password);
        }
    }
}
