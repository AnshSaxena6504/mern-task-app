Full-Stack Task Manager (React, Node.js, MySQL)
Live Demo: [Link to Live Demo (After Deployment)]

This project is a modern, responsive Task Management application built to demonstrate proficiency across the full stack.

✨ Key Features
CRUD Functionality: Complete ability to Create, Read, Update, and Delete tasks.

Persistent Data: Data stored in a MySQL relational database.

Responsive UI: Built with React and styled using Tailwind CSS.

Professional Backend: RESTful API using Node.js and Express.js.

Data Access: Uses Sequelize ORM for robust database interaction.

🛠️ Technology Stack
Frontend: React, Vite

Styling: Tailwind CSS

Backend: Node.js, Express.js

Database: MySQL

🚀 Local Installation Guide
1. Database Setup (MySQL)
Log into your MySQL server and run the following commands to create the database and user:

CREATE DATABASE task_manager_db;
CREATE USER 'task_user'@'localhost' IDENTIFIED BY 'your_secure_password';
GRANT ALL PRIVILEGES ON task_manager_db.* TO 'task_user'@'localhost';
FLUSH PRIVILEGES;

Create a file named .env in the backend/ directory with your credentials.

2. Run Backend (Node.js)
cd backend
npm install
node server.js

3. Run Frontend (React)
cd frontend
npm install
npm run dev

The application will be accessible at http://localhost:5173/.

Developed by: Ansh Saxena
