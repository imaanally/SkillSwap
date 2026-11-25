import { useState } from "react";
import "../styles/sessions.css";

function Sessions() {
  const [activeTab, setActiveTab] = useState("Upcoming");

  const [sessions, setSessions] = useState([
    {
      id: 1,
      name: "Amina Mohamed",
      skill: "Python",
      date: "November 25, 2026",
      time: "10:00 AM",
      status: "Scheduled",
    },
    {
      id: 2,
      name: "Hassan K.",
      skill: "Graphic Design",
      date: "November 27, 2026",
      time: "2:00 PM",
      status: "Scheduled",
    },
  ]);

  const pastSessions = [
    {
      id: 3,
      name: "Fatima A.",
      skill: "Marketing",
      date: "November 18, 2026",
      time: "11:00 AM",
      status: "Completed",
    },
  ];

  const [showReview, setShowReview] = useState(null);
  const [rating, setRating] = useState(5);
  const [review, setReview] = useState("");

  function markCompleted(id) {
    setSessions((previousSessions) =>
      previousSessions.map((session) =>
        session.id === id ? { ...session, status: "Completed" } : session,
      ),
    );
  }

  function submitReview() {
    if (!review.trim()) {
      alert("Please write a review before submitting.");
      return;
    }

    alert("Thank you for your review!");

    setReview("");
    setRating(5);
    setShowReview(null);
  }

  const upcomingSessions = sessions.filter(
    (session) => session.status === "Scheduled",
  );

  const completedSessions = [
    ...pastSessions,
    ...sessions.filter((session) => session.status === "Completed"),
  ];

  const displayedSessions =
    activeTab === "Upcoming" ? upcomingSessions : completedSessions;

  return (
    <div className="sessions-page">
      <p className="welcome-text">Keep learning and growing together ✨</p>

      <h1>My Sessions</h1>
      <p>Manage your learning sessions and exchange experiences.</p>

      <div className="session-tabs">
        {["Upcoming", "Past"].map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "active-tab" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="sessions-list">
        {displayedSessions.length > 0 ? (
          displayedSessions.map((session) => (
            <div className="session-card" key={session.id}>
              <div className="session-card-header">
                <div className="user-avatar">{session.name.charAt(0)}</div>

                <div>
                  <h3>{session.name}</h3>
                  <span>{session.status}</span>
                </div>
              </div>

              <div className="session-details">
                <p>
                  Skill: <strong>{session.skill}</strong>
                </p>
                <p>Date: {session.date}</p>
                <p>Time: {session.time}</p>
              </div>

              {activeTab === "Upcoming" && (
                <button
                  className="complete-session-button"
                  onClick={() => markCompleted(session.id)}
                >
                  Mark as completed
                </button>
              )}

              {activeTab === "Past" && (
                <button
                  className="review-session-button"
                  onClick={() => setShowReview(session.id)}
                >
                  Leave a review
                </button>
              )}

              {showReview === session.id && (
                <div className="review-form">
                  <h4>Leave your review</h4>

                  <label htmlFor="rating">Rating</label>
                  <select
                    id="rating"
                    value={rating}
                    onChange={(e) => setRating(Number(e.target.value))}
                  >
                    <option value={5}>5 - Excellent</option>
                    <option value={4}>4 - Very good</option>
                    <option value={3}>3 - Good</option>
                    <option value={2}>2 - Fair</option>
                    <option value={1}>1 - Poor</option>
                  </select>

                  <textarea
                    placeholder="Share your experience..."
                    value={review}
                    onChange={(e) => setReview(e.target.value)}
                  />

                  <button onClick={submitReview}>Submit review</button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No sessions to display.</p>
        )}
      </div>
    </div>
  );
}

export default Sessions;
