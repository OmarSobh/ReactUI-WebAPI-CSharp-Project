using System;
using System.Collections.Generic;
using System.Configuration;
using System.Data.SqlClient;
using System.Linq;
using System.Web;
using WebApi.Models.Tasks;

namespace WebApi.Models
{
    public class TaskDBService
    {
        static string conStr = ConfigurationManager.ConnectionStrings["localDB"].ConnectionString;

        public static TodoTask[] GetAllTasks()
        {
            List<TodoTask> tasks = new List<TodoTask>();

            using (SqlConnection con = new SqlConnection(conStr))
            {
                using (SqlCommand cmd = new SqlCommand("SELECT * FROM TBTasks", con))
                {
                    con.Open();

                    SqlDataReader reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        tasks.Add(new TodoTask()
                        {
                            ID = (int)reader["ID"],
                            Title = (string)reader["Title"],
                            Description = (string)reader["Description"],
                            CreatedDate = (DateTime)reader["CreatedDate"],
                            UserID = (int)reader["UserID"]
                        });
                    }

                    reader.Close();
                }
            }

            return tasks.ToArray();
        }

        public static TodoTask GetTaskById(int id)
        {
            using (SqlConnection con = new SqlConnection(conStr))
            {
                using (SqlCommand cmd = new SqlCommand("SELECT * FROM TBTasks WHERE ID = @ID", con))
                {
                    cmd.Parameters.AddWithValue("@ID", id);

                    con.Open();

                    SqlDataReader reader = cmd.ExecuteReader();

                    if (reader.Read())
                    {
                        TodoTask task = new TodoTask()
                        {
                            ID = (int)reader["ID"],
                            Title = (string)reader["Title"],
                            Description = (string)reader["Description"],
                            CreatedDate = (DateTime)reader["CreatedDate"],
                            UserID = (int)reader["UserID"]
                        };

                        reader.Close();
                        return task;
                    }

                    reader.Close();
                }
            }

            return null;
        }

        public static void CreateTask(TodoTask task)
        {
            using (SqlConnection con = new SqlConnection(conStr))
            {
                using (SqlCommand cmd = new SqlCommand(
                    "INSERT INTO TBTasks (Title, Description, CreatedDate, UserID) " +
                    "VALUES (@Title, @Description, @CreatedDate, @UserID)", con))
                {
                    cmd.Parameters.AddWithValue("@Title", task.Title);
                    cmd.Parameters.AddWithValue("@Description", task.Description);
                    cmd.Parameters.AddWithValue("@CreatedDate", task.CreatedDate);
                    cmd.Parameters.AddWithValue("@UserID", task.UserID);

                    con.Open();
                    cmd.ExecuteNonQuery();
                }
            }
        }


        public static void UpdateTask(int id, TodoTask task)
        {
            using (SqlConnection con = new SqlConnection(conStr))
            {
                using (SqlCommand cmd = new SqlCommand(
                    "UPDATE TBTasks " +
                    "SET Title = @Title, Description = @Description, CreatedDate = @CreatedDate, UserID = @UserID " +
                    "WHERE ID = @ID", con))
                {
                    cmd.Parameters.AddWithValue("@Title", task.Title);
                    cmd.Parameters.AddWithValue("@Description", task.Description);
                    cmd.Parameters.AddWithValue("@CreatedDate", task.CreatedDate);
                    cmd.Parameters.AddWithValue("@UserID", task.UserID);
                    cmd.Parameters.AddWithValue("@ID", id);

                    con.Open();
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public static void DeleteTask(int id)
        {
            using (SqlConnection con = new SqlConnection(conStr))
            {
                using (SqlCommand cmd = new SqlCommand(
                    "DELETE FROM TBTasks " +
                    "WHERE ID = @ID", con))
                {
                    cmd.Parameters.AddWithValue("@ID", id);

                    con.Open();
                    cmd.ExecuteNonQuery();
                }
            }
        }

        public static TodoTask[] GetTasksByUserId(int userId)
        {
            List<TodoTask> tasks = new List<TodoTask>();

            using (SqlConnection con = new SqlConnection(conStr))
            {
                using (SqlCommand cmd = new SqlCommand("SELECT * FROM TBTasks WHERE UserID = @UserID", con))
                {
                    cmd.Parameters.AddWithValue("@UserID", userId);

                    con.Open();

                    SqlDataReader reader = cmd.ExecuteReader();

                    while (reader.Read())
                    {
                        tasks.Add(new TodoTask()
                        {
                            ID = (int)reader["ID"],
                            Title = (string)reader["Title"],
                            Description = (string)reader["Description"],
                            CreatedDate = (DateTime)reader["CreatedDate"],
                            UserID = (int)reader["UserID"]
                        });
                    }

                    reader.Close();
                }
            }

            return tasks.ToArray();
        }
    }
}
