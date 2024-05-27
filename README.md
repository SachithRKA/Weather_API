# Weather API

This project provides a comprehensive Weather API application with a React frontend and a Node.js backend. It integrates Redis for caching and uses Express for handling server-side operations. The application allows users to fetch and display weather information based on their input.

## Key Features

- **React Frontend**: A user-friendly interface built with React that runs on port 3000.
- **Node.js Backend**: A robust backend powered by Node.js, using Express for routing and Redis for caching, running on port 8000.
- **Weather Data**: Fetches real-time weather data and displays it to the user.
- **Caching**: Utilizes Redis to cache weather data, improving performance and reducing redundant API calls.

## Getting Started

To start using this Weather API application, follow these steps:

### Prerequisites

Before you begin, make sure you have Node.js and Redis installed on your machine.

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/SachithRKA/Weather_API.git
   ```
   
2. **Navigate to the project directory**:
   ```bash
   cd Weather_API
   ```

3. **Install dependencies for both frontend and backend**:
   ```bash
   # Navigate to the backend directory and install dependencies
   cd backend
   npm install

   # Navigate to the frontend directory and install dependencies
   cd ../frontend
   npm install
   ```

### Running the Application

#### Backend

1. **Start the Redis server**:
   Ensure Redis is running on your machine. You can start Redis with the following command:
   ```bash
   redis-server
   ```

2. **Start the backend server**:
   Navigate to the backend directory and start the server using nodemon:
   ```bash
   cd backend
   nodemon index.js
   ```
   If you do not have nodemon installed, you can start the server with:
   ```bash
   node index.js
   ```

#### Frontend

1. **Start the frontend server**:
   Open a new terminal, navigate to the frontend directory, and start the React application:
   ```bash
   cd frontend
   npm start
   ```

2. **Access the application**:
   Open your web browser and visit:
   ```
   http://localhost:3000
   ```
