import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DataTable from "examples/Tables/DataTable";
import MDButton from "components/MDButton";

const SinglTeamPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [team, setTeam] = useState(null);
  const [newMemberEmail, setNewMemberEmail] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  // Function to fetch team details
  const fetchTeam = async () => {
    setLoading(true);
    try {
      const res = await axios.get(`http://localhost:8080/api/auth/GetSinglPage/${id}`);
      if (res.data.success) {
        setTeam(res.data.data);
      } else {
        setError("Team not found");
      }
    } catch (err) {
      setError("Failed to fetch team details: " + err.message);
    }
    setLoading(false);
  };

  // Handle adding a new member
  const handleAddMember = async () => {
    if (!newMemberEmail) {
      setError("Please provide a valid email");
      return;
    }

    try {
      const res = await axios.post(`http://localhost:8080/api/auth/teams/${id}/add-member`, {
        email: newMemberEmail,
      });

      if (res.data.success) {
        setNewMemberEmail("");
        fetchTeam();
      } else {
        setError(res.data.message || "Failed to add member");
      }
    } catch (err) {
      setError("Error adding member: " + err.message);
    }
  };

  useEffect(() => {
    fetchTeam();
  }, [id]);

  // Columns for the DataTable
  const columns = [
    { Header: "ID", accessor: "_id", width: "30%", align: "left" },
    { Header: "Email", accessor: "email", align: "left" },
    {
      Header: "Action",
      accessor: "action",
      align: "center",
      Cell: ({ row }) => (
        <MDButton onClick={() => navigate(`/profile/${row.original._id}`)} color="info">
          View
        </MDButton>
      ),
    },
  ];

  // Rows for the DataTable (members of the team)
  const rows = team ? team.members.map((member) => ({
    _id: member._id,
    email: member.email,
    action: '', // placeholder for the button column
  })) : [];

  return (
    <DashboardLayout>
      <div style={styles.page}>
        {error && <p style={styles.error}>{error}</p>}

        {team ? (
          <div style={styles.teamCard}>
            <h2>{team.name}</h2>
            <p><strong>Moderator:</strong> {team.moderator?.email}</p>

            <h3>Members:</h3>
            <DataTable
              table={{ columns, rows }} // DataTable takes the columns and rows
              showTotalEntries={false}
              isSorted={false}
              noEndBorder
              entriesPerPage={false}
            />

            <div style={styles.addMemberSection}>
              <input
                type="email"
                placeholder="Enter member email"
                value={newMemberEmail}
                onChange={(e) => setNewMemberEmail(e.target.value)}
                style={styles.input}
              />
              <button onClick={handleAddMember} style={styles.addBtn}>
                Add Member
              </button>
            </div>
          </div>
        ) : loading ? (
          <p>Loading...</p>
        ) : (
          <p>Team not found</p>
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
  teamCard: {
    border: "1px solid #ccc",
    padding: "16px",
    marginBottom: "20px",
    borderRadius: "8px",
    backgroundColor: "#f9f9f9",
  },
  error: {
    color: "red",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  input: {
    width: "300px",
    padding: "10px",
    marginBottom: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  addBtn: {
    backgroundColor: "#10b981",
    color: "#fff",
    padding: "10px 16px",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
  },
  addMemberSection: {
    marginTop: "20px",
  },
};

export default SinglTeamPage;
