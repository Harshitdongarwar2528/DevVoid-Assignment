const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");



//Middleware
app.use(cors());
app.use(express.json());

//Connect to MongoDB
mongoose.connect("mongodb+srv://harshuzz:7038798690@cluster0.qi9t7uj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => console.log("MongoDB connected! 🌿💾"))
.catch(err => console.log(err));

// Import routes
const projectRoutes = require("./routes/projectRoutes");
const taskRoutes = require("./routes/taskRoutes");

// Use routes
app.use("/api/projects", projectRoutes);
app.use("/api/tasks", taskRoutes);

app.listen(5000, () => console.log("Server running successfully on port 5000 ✅🚀"));
