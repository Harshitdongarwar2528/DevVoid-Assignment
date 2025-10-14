const express = require("express");
const app = express();
const cors = require("cors");
const mongoose = require("mongoose");

mongoose.connect("mongodb+srv://harshuzz:7038798690@cluster0.qi9t7uj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => console.log("MongoDB connected! 🌿💾"))
.catch(err => console.log(err));


app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is working!");
});

app.listen(5000, () => console.log("Server running successfully on port 5000 ✅🚀"));
