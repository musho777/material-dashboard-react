import axios from "axios";
import MDBox from "components/MDBox";
import MDButton from "components/MDButton";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import DataTable from "examples/Tables/DataTable";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

function AllUsers() {
  const navigate = useNavigate();
  const [data, setData] = useState([]);

  const columns = [
    { Header: "id", accessor: "_id", width: "30%", align: "left" },
    { Header: "email", accessor: "email", align: "left" },
    { Header: "button", accessor: "button", align: "center" },
  ];

  const GetUsers = async () => {
    try {
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/api/auth/getAllUsers`);
      const users = response.data.map((elm) => ({
        ...elm,
        button: (
          <MDButton onClick={() => navigate(`/profile/${elm._id}`)} color="info">
            View
          </MDButton>
        ),
      }));
      setData(users);
    } catch (error) {
      console.error("Ошибка при загрузке пользователей:", error);
    }
  };

  useEffect(() => {
    GetUsers();
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <DataTable
        table={{ columns, rows: data }}
        showTotalEntries={false}
        isSorted={false}
        noEndBorder
        entriesPerPage={false}
      />
      <MDBox mb={2} />
    </DashboardLayout>
  );
}

export default AllUsers;
