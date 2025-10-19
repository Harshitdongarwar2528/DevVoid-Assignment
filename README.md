# 💖 DevVoid Assignment: The Todo Manager\!

Welcome to the **DevVoid Assignment**\! This is a super sweet, full-stack **MERN** application designed to make managing projects and tasks an absolute delight. We've even added a sprinkle of **AI magic** with **Gemini** to help you stay on top of your to-do list\! 🚀

-----

## ✨ Features: Where the Magic Happens\!

Our task manager is packed with features to make your workflow smooth and enjoyable\!

### 🌟 Core Goodies

  * **Project Management** 🗓️: Easily **create, view, and manage** all your big ideas\!
  * **Task Management** 📝: Full **CRUD operations** for tasks—add, see, update, and delete them like a pro\!
  * **Kanban Board** 🎨: A beautiful, **Trello-like drag & drop** interface so you can visualize your progress.
  * **Real-time Updates** ⚡: Everything stays in sync, instantly\! Your database is always up-to-date.

### 🧠 AI-Powered Hugs (Thanks, Gemini\!)

  * **Project Summarization** 📚: Get **AI-generated project overviews**—a quick summary hug for your project\!
  * **Task Q\&A** ❓: Ask the AI questions about specific tasks and get **smart, helpful answers**.
  * **Smart Responses** 💡: The AI is **context-aware** and gives tailored responses based on your current tasks. So clever\!

### 💻 Technical Treats

  * **MERN Stack** 🥞: Built with the reliable combo of **MongoDB, Express.js, React.js, and Node.js**.
  * **Drag & Drop** 🖱️: Super **smooth card movement** between columns. *Wheee\!*
  * **Responsive Design** 📱: Works perfectly on **desktops and mobiles**. Manage tasks anywhere\!
  * **RESTful API** 🛤️: A clean, well-organized backend architecture.

-----

## 🛠️ Tech Stack: What We Used\!

Here are the awesome tools that made this project shine\!

### **Frontend** 🎨

  * **React.js** (The main stage\!)
  * `@hello-pangea/dnd` (For that buttery-smooth Drag & Drop\!)
  * **Axios** (To chat with the API\!)
  * **CSS3** (Making it look pretty\!)

### **Backend** ⚙️

  * **Node.js** (The engine\!)
  * **Express.js** (Making the routing easy\!)
  * **MongoDB** with **Mongoose** (Our super-reliable database\!)
  * **Google Gemini AI API** (The brain of our smart features\!)

-----

## 📋 Prerequisites: Before You Begin\!

Make sure you have these installed before you start the fun:

  * **Node.js** (`v14` or higher)
  * **MongoDB** (Local installation or **Atlas** connection)
  * A **Google Gemini API key**

-----

## ⚡ Quick Start: Let's Get Running\!

Follow these simple steps to get the application up and running on your machine.

### 1\. Clone the Repository

```bash
git clone <your-repo-url>
cd DevVoidAssignment
```

### 2\. Backend Setup 📦

```bash
# Navigate to backend directory
cd Backend

# Install dependencies
npm install

# Set up environment variables
# 💖 Create a .env file with the following variables (see below for details):
# MONGO_URI=mongodb://localhost:27017/devvoid
# GEMINI_API_KEY=your_gemini_api_key_here
# PORT=5000

# Start the backend server
npm run dev
```

### 3\. Frontend Setup 🖼️

```bash
# Open a **new** terminal and navigate to frontend directory
cd Frontend

# Install dependencies
npm install

# Start the React development server
npm start
```

### 4\. Access the Application 🎉

| Part | URL |
| :--- | :--- |
| **Frontend** | `http://localhost:5173` |
| **Backend API** | `http://localhost:5000` |

-----

## 🔧 Environment Variables: The Secret Sauce

You'll need a `.env` file in your **Backend** folder with these:

  * `MONGO_URI=mongodb://localhost:27017/devvoid` (Your MongoDB connection string)
  * `GEMINI_API_KEY=AIzaSyYourApiKeyHere` (Your special key for the AI magic\!)
  * `PORT=5000` (The port for the Express server)

### 🔑 Getting Your Gemini API Key

1.  Visit **Google AI Studio**.
2.  **Create a new API key**.
3.  Add it to your `.env` file\! Easy-peasy\!

-----

## 🎯 API Endpoints: Talking to the Server

Here's a little map of how the frontend and backend chat with each other\!

### **Projects** 🏗️

  * `GET /api/projects` - Get all projects
  * `POST /api/projects` - Create new project
  * `GET /api/projects/:id` - Get project by ID
  * `PUT /api/projects/:id` - Update project
  * `DELETE /api/projects/:id` - Delete project

### **Tasks** ✅

  * `GET /api/tasks/project/:projectId` - Get tasks by project
  * `POST /api/tasks` - Create new task
  * `PUT /api/tasks/:id` - Update task status (for dragging\!)
  * `DELETE /api/tasks/:id` - Delete task

### **AI Features** 🤖

  * `POST /api/ai/summarize/:projectId` - Generate project summary
  * `POST /api/ai/ask/:taskId` - Ask questions about a task

-----

## 🎥 Demo Instructions: A Little Walkthrough\!

Want to see all the features in action? Follow these steps on the live application\!

1.  **Create a Project**

      * Navigate to the projects page.
      * Click **"Create a new project"** and give it a fun name and description\!

2.  **Add Tasks**

      * Go to the **task board** for your new project.
      * Add a few tasks with titles and descriptions.
      * *Example Tasks:* "Design database schema" (Done), "Implement backend API" (In Progress), "Create React frontend" (In Progress), "Integrate AI features" (To Do).

3.  **Drag & Drop**

      * **Move tasks** between the **"To Do," "In Progress," and "Done"** columns.
      * Watch as the changes are **automatically saved** to the database\!

4.  **Try the AI Features**

      * Click the **"Summarize Project"** button to get an AI-generated overview of everything\!
      * Select a task from the dropdown and ask a question in the **AI Assistant** box, like:
          * *"What's the status of this task?"*
          * *"Tell me more about this task."*

Enjoy your adorably efficient **Project & Task Management System**\! Happy Coding\! 💖