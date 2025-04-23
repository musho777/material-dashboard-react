import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom"; // Import Link for navigation
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";

const TeamsPage = () => {
  const [teams, setTeams] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [teamName, setTeamName] = useState("");
  const [memberEmails, setMemberEmails] = useState("");
  const [error, setError] = useState("");

  // Fetch teams from the API
  const fetchTeams = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/auth/getTeams");
      if (res.data.success) {
        setTeams(res.data.data);
      }
    } catch (err) {
      console.error("Failed to fetch teams:", err.message);
      setError("Failed to load teams, please try again.");
    }
  };

  const handleCreateTeam = async () => {
    if (!teamName || !memberEmails) {
      setError("Team name and member emails are required!");
      return;
    }

    try {
      const emailsArray = memberEmails.split(",").map((e) => e.trim());
      const res = await axios.post("http://localhost:8080/api/auth/createTeam", {
        teamName,
        email: emailsArray,
      });

      if (res.data.success) {
        alert("Team created successfully!");
        setTeamName("");
        setMemberEmails("");
        setShowModal(false);
        setError(""); // Reset error message
        fetchTeams();
      } else {
        alert(res.data.message || "Failed to create team");
      }
    } catch (err) {
      console.error("Error creating team:", err.message);
      setError("Error creating team: " + err.message);
    }
  };

  useEffect(() => {
    fetchTeams();
  }, []);

  return (
    <DashboardLayout>
      <div style={styles.page}>
        <h2>Teams</h2>

        <button onClick={() => setShowModal(true)} style={styles.createBtn}>
          + Create Team
        </button>

        {error && <p style={styles.errorMessage}>{error}</p>}

        {teams.map((team) => (
          <div key={team._id} style={styles.teamCard}>
            {/* Navigate to the Single Team Page */}
            <Link to={`/team/${team._id}`} style={styles.teamLink}>
              <h3>{team.name}</h3>
            </Link>
            <p><strong>Moderator:</strong> {team.moderator?.email}</p>
            <p><strong>Members:</strong></p>
            <ul>
              {team.members.map((m) => (
                <li key={m._id}>{m.email}</li>
              ))}
            </ul>
          </div>
        ))}

        {showModal && (
          <div style={styles.modalOverlay}>
            <div style={styles.modal}>
              <h3>Create Team</h3>
              <input
                type="text"
                placeholder="Team name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
                style={styles.input}
              />
              <textarea
                placeholder="Member emails (comma separated)"
                value={memberEmails}
                onChange={(e) => setMemberEmails(e.target.value)}
                style={styles.textarea}
              />
              <div style={styles.modalButtons}>
                <button
                  onClick={handleCreateTeam}
                  style={styles.submitBtn}
                  disabled={!teamName || !memberEmails}
                >
                  Create
                </button>
                <button onClick={() => setShowModal(false)} style={styles.cancelBtn}>
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </DashboardLayout>
  );
};

const styles = {
  page: {
    padding: "30px",
    fontFamily: "Arial",
  },
  createBtn: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    padding: "10px 16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    marginBottom: "20px",
  },
  teamCard: {
    border: "1px solid #ccc",
    padding: "16px",
    marginBottom: "20px",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  },
  teamLink: {
    textDecoration: "none",
    color: "#007bff",
    fontSize: "20px",
  },
  errorMessage: {
    color: "red",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0,0,0,0.4)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  modal: {
    backgroundColor: "#fff",
    padding: "24px",
    borderRadius: "10px",
    width: "400px",
    boxShadow: "0 0 10px rgba(0,0,0,0.3)",
  },
  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  textarea: {
    width: "100%",
    padding: "10px",
    height: "80px",
    marginBottom: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  modalButtons: {
    display: "flex",
    justifyContent: "space-between",
  },
  submitBtn: {
    backgroundColor: "#10b981",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "6px",
    cursor: "pointer",
  },
  cancelBtn: {
    backgroundColor: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "6px",
    cursor: "pointer",
  },
};

export default TeamsPage;
