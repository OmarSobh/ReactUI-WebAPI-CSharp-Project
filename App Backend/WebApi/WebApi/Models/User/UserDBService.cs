using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Windows;

namespace WebApi.Models
{
    public class UserDBService
    {
        static string conStr = ConfigurationManager.ConnectionStrings["localDB"].ConnectionString;

        public static User[] GetAllUsers()
        {
            using (SqlConnection con = new SqlConnection(conStr))
            {
                con.Open();
                return GetAllUsersByQuery("SELECT * FROM TBUsers", con);
            }
        }

        public static User[] GetAllUsersByQuery(string query, SqlConnection con)
        {
            List<User> users = new List<User>();

            using (SqlCommand cmd = new SqlCommand(query, con))
            {
                SqlDataReader reader = cmd.ExecuteReader();

                while (reader.Read())
                {
                    users.Add(new User()
                    {
                        Id = (int)reader["ID"],
                        Name = (string)reader["Name"],
                        Family = (string)reader["Family"],
                        Email = (string)reader["Email"],
                        Password = (string)reader["Password"]
                    });
                }

                reader.Close();
            }

            return users.ToArray();
        }

        public static User GetUserById(int id)
        {
            using (SqlConnection con = new SqlConnection(conStr))
            {
                con.Open();
                return GetUserByIdQuery(id, con);
            }
        }

        public static User GetUserByIdQuery(int id, SqlConnection con)
        {
            using (SqlCommand cmd = new SqlCommand($"SELECT * FROM TBUsers WHERE ID = {id}", con))
            {
                SqlDataReader reader = cmd.ExecuteReader();

                if (reader.Read())
                {
                    User user = new User()
                    {
                        Id = (int)reader["ID"],
                        Name = (string)reader["Name"],
                        Family = (string)reader["Family"],
                        Email = (string)reader["Email"],
                        Password = (string)reader["Password"]
                    };

                    reader.Close();
                    return user;
                }
            }

            return null;
        }

        public static void CreateUser(User user)
        {
            using (SqlConnection con = new SqlConnection(conStr))
            {
                using (SqlCommand cmd = new SqlCommand(
                    "INSERT INTO TBUsers (Name, Family, [Email], [Password]) " +
                    "VALUES (@Name, @Family, @Email, @Password)", con))
                {
                    cmd.Parameters.AddWithValue("@Name", user.Name);
                    cmd.Parameters.AddWithValue("@Family", user.Family);
                    cmd.Parameters.AddWithValue("@Email", user.Email);
                    cmd.Parameters.AddWithValue("@Password", user.Password);

                    con.Open();
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public static void UpdateUser(int id, User user)
        {
            using (SqlConnection con = new SqlConnection(conStr))
            {
                using (SqlCommand cmd = new SqlCommand(
                    "UPDATE TBUsers " +
                    "SET Name = @Name, Family = @Family, [Email] = @Email, [Password] = @Password " +
                    "WHERE ID = @ID", con))
                {
                    cmd.Parameters.AddWithValue("@Name", user.Name);
                    cmd.Parameters.AddWithValue("@Family", user.Family);
                    cmd.Parameters.AddWithValue("@Email", user.Email);
                    cmd.Parameters.AddWithValue("@Password", user.Password);
                    cmd.Parameters.AddWithValue("@ID", id);

                    con.Open();
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public static void DeleteUser(int id)
        {
            using (SqlConnection con = new SqlConnection(conStr))
            {
                using (SqlCommand cmd = new SqlCommand(
                    "DELETE FROM TBUsers " +
                    "WHERE ID = @ID", con))
                {
                    cmd.Parameters.AddWithValue("@ID", id);

                    con.Open();
                    cmd.ExecuteNonQuery();
                }
            }
        }
        public static User LoginUser(string email, string password)
        {
            using (SqlConnection con = new SqlConnection(conStr))
            {
                con.Open();
                return GetUserByEmailAndPasswordQuery(email, password, con);
            }
        }

        private static User GetUserByEmailAndPasswordQuery(string email, string password, SqlConnection con)
        {
            using (SqlCommand cmd = new SqlCommand("SELECT * FROM TBUsers WHERE Email = @Email AND [Password] = @Password", con))
            {
                cmd.Parameters.AddWithValue("@Email", email);
                cmd.Parameters.AddWithValue("@Password", password);
                SqlDataReader reader = cmd.ExecuteReader();

                if (reader.Read())
                {
                    User user = new User()
                    {
                        Id = (int)reader["ID"],
                        Name = (string)reader["Name"],
                        Family = (string)reader["Family"],
                        Email = (string)reader["Email"],
                        Password = (string)reader["Password"]
                    };

                    reader.Close();
                    return user;
                }
            }

            return null;
        }

    }
}
