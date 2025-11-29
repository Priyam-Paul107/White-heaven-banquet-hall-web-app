## Prerequisites

Before running this project, ensure the following are installed:

1. Install Node.js

Download and install Node.js from the official website:

https://nodejs.org


After installation, verify using:

node -v
npm -v

2. Install Nodemon (optional but recommended for backend auto-restart)

Install nodemon globally:

npm install -g nodemon


Check installation:

nodemon -v

📌 1. Backend Setup
Step 1: Navigate to Backend Folder

Go to:

White Heaven Banquet Hall Online Web Application Backend

Step 2: Configure Environment Variables

Open the .env file and replace the existing database key with your MongoDB Cluster connection string:

DB = mongodb+srv://<username>:<password>@<your-cluster-url>/white-heaven


❗ Ensure your MongoDB cluster has network access enabled.

Step 3: Install Dependencies

Open the terminal in the backend folder and run:

npm install

Step 4: Start Backend Server
npm start


Your backend should now run on:

http://localhost:4000

📌 2. Frontend Setup
Step 1: Navigate to Frontend Folder

Go to:

White Heaven Banquet Hall Online Web Application Frontend

Step 2: Install Dependencies

Open the terminal in the frontend folder:

npm install

Step 3: Start Frontend Application
npm start


The frontend will run at:

http://localhost:5137

🌐 3. Run the Full Application

After both Backend and Frontend are running:

Open Google Chrome.

Enter:

http://localhost:5137


Your White Heaven Banquet Hall Application will load successfully.

📄 4. Technologies Used

Backend
Node.js
Express.js
MongoDB
Mongoose
JWT Authentication

Frontend
React.js
Vite
Axios
Tailwind CSS

🛠 5. Troubleshooting
Issue	Solution
Backend not connecting to DB	Check .env connection string
Port already in use	Change port in server config
Frontend not opening	Restart Vite using npm start
CORS issue	Ensure backend has CORS enabled