import React, { useState } from 'react';
import axios from 'axios';
import '../styles/AIAssistant.css';

function AIAssistant({ projectId, tasks }) {
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [qaActive, setQaActive] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState('');
  const [selectedTaskId, setSelectedTaskId] = useState('');

  const generateSummary = async () => {
    if (tasks.length === 0) {
      setSummary('No tasks available to summarize.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`http://localhost:5000/api/ai/summarize/${projectId}`);
      setSummary(response.data.summary);
      setQaActive(false);
    } catch (error) {
      console.error('Error generating summary:', error);
      setSummary('Failed to generate summary. Please make sure the Gemini API is configured properly.');
    }
    setLoading(false);
  };

  const askQuestion = async () => {
    if (!question.trim()) return;
    
    // Use selected task or first task if none selected
    const taskId = selectedTaskId || (tasks[0]?._id);
    if (!taskId) {
      setAnswer('No tasks available to ask about.');
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`http://localhost:5000/api/ai/ask/${taskId}`, {
        question
      });
      setAnswer(response.data.answer);
      setQaActive(true);
    } catch (error) {
      console.error('Error asking question:', error);
      setAnswer('Failed to get answer. Please make sure the Gemini API is configured properly.');
    }
    setLoading(false);
  };

  const clearResponses = () => {
    setSummary('');
    setAnswer('');
    setQuestion('');
    setQaActive(false);
  };

  return (
    <div className="ai-assistant">
      <div className="ai-header">
        <h3>🤖 AI Assistant</h3>
        <button onClick={clearResponses} className="clear-btn">Clear</button>
      </div>
      
      <div className="ai-actions">
        <button 
          onClick={generateSummary} 
          disabled={loading || tasks.length === 0}
          className="ai-btn summary-btn"
        >
          {loading ? '🔄 Generating...' : '📊 Summarize Project'}
        </button>
        
        <div className="qa-section">
          <div className="task-selector">
            <select 
              value={selectedTaskId} 
              onChange={(e) => setSelectedTaskId(e.target.value)}
              className="task-select"
            >
              <option value="">Select a task to ask about</option>
              {tasks.map(task => (
                <option key={task._id} value={task._id}>
                  {task.title}
                </option>
              ))}
            </select>
          </div>
          
          <div className="question-input-group">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Ask a question about the selected task..."
              className="question-input"
              onKeyPress={(e) => e.key === 'Enter' && askQuestion()}
            />
            <button 
              onClick={askQuestion} 
              disabled={loading || !question.trim() || !selectedTaskId}
              className="ai-btn ask-btn"
            >
              Ask AI
            </button>
          </div>
        </div>
      </div>

      {(summary || answer) && (
        <div className="ai-response">
          <h4>💡 AI Response:</h4>
          <div className="response-content">
            {!qaActive && <p>{summary}</p>}
            {qaActive && (
              <div className="qa-response">
                <p className="question"><strong>Q:</strong> {question}</p>
                <p className="answer"><strong>A:</strong> {answer}</p>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default AIAssistant;