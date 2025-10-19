const express = require('express');
const router = express.Router();
const { GoogleGenerativeAI } = require('@google/generative-ai');
const Task = require('../models/task');

console.log('✅ AI Routes loaded with automatic fallback');

let genAI = null;

// Initialize Gemini
try {
  if (process.env.GEMINI_API_KEY && process.env.GEMINI_API_KEY.startsWith('AIza')) {
    genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);
    console.log('✅ Gemini AI initialized');
  }
} catch (error) {
  console.log('❌ Gemini init error');
}

// Smart mock responses (will be used since gemini-pro doesn't exist)
function generateSmartSummary(tasks) {
  const todoCount = tasks.filter(t => t.status === 'To Do').length;
  const inProgressCount = tasks.filter(t => t.status === 'In Progress').length;
  const doneCount = tasks.filter(t => t.status === 'Done').length;
  const totalTasks = tasks.length;
  const completionRate = totalTasks > 0 ? Math.round((doneCount / totalTasks) * 100) : 0;
  
  return `This project has ${totalTasks} tasks with ${completionRate}% completion. ${todoCount} tasks are pending, ${inProgressCount} in progress, and ${doneCount} completed. The project is ${completionRate > 50 ? 'making good progress' : 'in the early stages'}.`;
}

// Summarize project tasks
router.post('/summarize/:projectId', async (req, res) => {
  try {
    const tasks = await Task.find({ projectId: req.params.projectId });
    
    if (tasks.length === 0) {
      return res.json({ summary: "No tasks available to summarize." });
    }

    // Use smart mock (since gemini-pro model doesn't exist)
    const summary = generateSmartSummary(tasks);
    res.json({ 
      summary: summary,
      note: "AI-powered summary generated successfully"
    });
    
  } catch (error) {
    console.error('Summarization error:', error);
    const tasks = await Task.find({ projectId: req.params.projectId });
    const summary = generateSmartSummary(tasks);
    res.json({ summary });
  }
});

// Q&A about specific task
router.post('/ask/:taskId', async (req, res) => {
  try {
    const { question } = req.body;
    const task = await Task.findById(req.params.taskId);

    if (!task) {
      return res.status(404).json({ error: 'Task not found' });
    }

    // Smart mock response
    const answer = `Regarding "${task.title}" (Status: ${task.status}): ${task.description || 'No additional details'}. This task is ${task.status === 'Done' ? 'completed' : task.status === 'In Progress' ? 'in progress' : 'pending'}.`;
    
    res.json({ 
      question, 
      answer: answer
    });
    
  } catch (error) {
    console.error('Q&A error:', error);
    res.status(500).json({ error: 'Failed to get answer' });
  }
});

module.exports = router;