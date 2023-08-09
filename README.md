# React Native Warehouse Tasks Manager

![Project Logo](logo.png)

Welcome to the React Native Warehouse Tasks Manager project! This mobile application aims to assist warehouse managers in efficiently managing daily tasks for each worker. The project integrates a backend created using C# ASP.NET hosted on FreeASPHosting, along with a SQL database for data storage. The app's UI is styled using NativeBase and custom CSS.

## Table of Contents

- [Features](#features)
- [UI Design (Figma)](#ui-design-figma)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation](#installation)
- [Usage](#usage)
- [Backend Server](#backend-server)
- [SQL Database](#sql-database)
- [Styling](#styling)
- [Contributing](#contributing)
- [License](#license)

## Features

- User authentication and authorization.
- Create, assign, and manage tasks for warehouse workers.
- Update task statuses (e.g., pending, in progress, completed).
- Track task history and progress.
- Real-time updates and notifications.
- Dashboard for an overall task overview.

## UI Design (Figma)

Check out the [Figma UI Design](https://www.figma.com/file/FRhdo3dGOSyFyHE8YWexN4/Untitled?type=design&node-id=1%3A9&t=K9aIkLmGJHSuaYPs-1) for a visual representation of the app's user interface.

## Getting Started

Follow these instructions to set up and run the project on your local machine.

### Prerequisites

- [Node.js](https://nodejs.org/) (at least version 12.x)
- [Expo CLI](https://docs.expo.dev/get-started/installation/)
- [SQL Server](https://www.microsoft.com/en-us/sql-server/sql-server-downloads) (for the local development database)

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/OmarSobh/ReactUI-WebAPI-CSharp-Project.git
   cd react-native-warehouse-tasks
   ```

2. Install the frontend dependencies:

   ```bash
   cd frontend
   npm install
   ```

3. Set up the local development SQL database using the provided scripts in the `database` folder.

## Usage

1. Start the React Native development server:

   ```bash
   cd frontend
   npm start
   ```

2. Scan the QR code using the Expo Go app on your mobile device, or use an emulator to test the application.

## Backend Server

The backend server is hosted on [FreeASPHosting](https://www.freeasphosting.net/). No local setup is required for the backend.

## SQL Database

The SQL database is hosted on [FreeASPHosting](https://www.freeasphosting.net/). No local setup is required for the database.

## Styling

The app's UI is styled using [NativeBase](https://nativebase.io/) components and custom CSS for specific styling needs.

## Contributing

Contributions are welcome! If you find any issues or want to enhance the project, feel free to open a pull request.

## License

This project is licensed under the [MIT License](LICENSE).
