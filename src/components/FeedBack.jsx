import React, { useState, useEffect } from "react";
import "../components/FeedBack.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const Feedback = () => {
  let navigate=useNavigate()
  const [feedback, setFeedback] = useState("");
  const [feedbackList, setFeedbackList] = useState([]);

  // Load feedback from local storage when the component mounts
  useEffect(() => {
    const storedFeedback = JSON.parse(localStorage.getItem("feedbackList")) || [];
    setFeedbackList(storedFeedback);
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    setFeedback(e.target.value);
  };

  // Handle feedback submission
  const handleSubmit = (e) => {
    e.preventDefault();
    if (feedback.trim() === "") return;

    const newFeedbackList = [...feedbackList, feedback];

    // Save to local storage
    localStorage.setItem("feedbackList", JSON.stringify(newFeedbackList));
    setFeedbackList(newFeedbackList);
    setFeedback(""); // Clear input after submission
  };

  return (
    <div className="feedback-page">
      <div className="feedback-container">
        <h1 className="feedback-title">📝 We Value Your Feedback</h1>
        <p className="feedback-subtitle">Tell us about your experience!</p>

        <form onSubmit={handleSubmit} className="feedback-form">
          <textarea
            className="feedback-input"
            value={feedback}
            onChange={handleInputChange}
            placeholder="Write your feedback here..."
            required
          />
          <button type="submit" className="feedback-button">Submit Feedback</button>
        </form>

        <h2 className="feedback-list-title">Recent Feedback</h2>
        <ul className="feedback-list">
          {feedbackList.length > 0 ? (
            feedbackList.map((item, index) => (
              <li key={index} className="feedback-item">⭐ {item}</li>
            ))
          ) : (
            <p className="no-feedback">No feedback yet. Be the first to share your thoughts!</p>
          )}
          Click the button to go back to Home
          <Button variant="primary" style={{marginLeft:"15px"}} onClick={()=>{navigate("/")}}>Home</Button>
        </ul>
      </div>
    </div>
  );
};

export default Feedback;
