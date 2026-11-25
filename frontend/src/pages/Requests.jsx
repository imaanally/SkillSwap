import { useState } from "react";
import "../styles/requests.css";

function Requests() {
  const [activeTab, setActiveTab] = useState("Incoming");

  const incomingRequests = [
    {
      id: 1,
      name: "Amina Mohamed",
      offeredSkill: "Graphic Design",
      requestedSkill: "Python",
      message: "I'd love to exchange skills with you!",
      status: "Pending",
    },
    {
      id: 2,
      name: "Hassan K.",
      offeredSkill: "Excel",
      requestedSkill: "Photography",
      message: "Let's learn together!",
      status: "Pending",
    },
  ];

  const sentRequests = [
    {
      id: 3,
      name: "Sara N.",
      offeredSkill: "Canva",
      requestedSkill: "Illustration",
      message: "I would love to learn illustration.",
      status: "Pending",
    },
  ];

  const acceptedRequests = [
    {
      id: 4,
      name: "Fatima A.",
      offeredSkill: "Baking",
      requestedSkill: "Marketing",
      message: "Looking forward to our exchange!",
      status: "Accepted",
    },
  ];

  const [requests, setRequests] = useState(incomingRequests);

  function handleRequest(id, newStatus) {
    setRequests((previousRequests) =>
      previousRequests.map((request) =>
        request.id === id ? { ...request, status: newStatus } : request,
      ),
    );
  }

  let displayedRequests = requests;

  if (activeTab === "Sent") {
    displayedRequests = sentRequests;
  } else if (activeTab === "Accepted") {
    displayedRequests = acceptedRequests;
  }

  return (
    <div className="requests-page">
      <p className="welcome-text">Grow together, one exchange at a time ✨</p>

      <h1>My Requests</h1>
      <p>Manage your skill exchange requests.</p>

      <div className="request-tabs">
        {["Incoming", "Sent", "Accepted"].map((tab) => (
          <button
            key={tab}
            className={activeTab === tab ? "active-tab" : ""}
            onClick={() => setActiveTab(tab)}
          >
            {tab}
          </button>
        ))}
      </div>

      <div className="requests-list">
        {displayedRequests.length > 0 ? (
          displayedRequests.map((request) => (
            <div className="request-card" key={request.id}>
              <div className="request-card-header">
                <div className="user-avatar">{request.name.charAt(0)}</div>

                <div>
                  <h3>{request.name}</h3>
                  <span>{request.status}</span>
                </div>
              </div>

              <div className="request-skills">
                <p>
                  Offering: <strong>{request.offeredSkill}</strong>
                </p>
                <p>
                  Looking for: <strong>{request.requestedSkill}</strong>
                </p>
              </div>

              <p className="request-message">{request.message}</p>

              {activeTab === "Incoming" && request.status === "Pending" && (
                <div className="request-actions">
                  <button onClick={() => handleRequest(request.id, "Accepted")}>
                    Accept
                  </button>

                  <button onClick={() => handleRequest(request.id, "Rejected")}>
                    Decline
                  </button>
                </div>
              )}
            </div>
          ))
        ) : (
          <p>No requests to display.</p>
        )}
      </div>
    </div>
  );
}

export default Requests;
