CREATE DATABASE TaskManagementDB;

USE TaskManagementDB;

CREATE TABLE Tasks (
    Id INT PRIMARY KEY IDENTITY,
    Title NVARCHAR(100) NOT NULL,
    Description NVARCHAR(255) NOT NULL,
    IsCompleted BIT NOT NULL
);
INSERT INTO Tasks (Title, Description, IsCompleted)
VALUES
    ('Task 1', 'Description for Task 1', 0),
    ('Task 2', 'Description for Task 2', 1),
    ('Task 3', 'Description for Task 3', 0),
    ('Task 4', 'Description for Task 4', 1);

	SELECT * FROM Tasks;
