import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import DataTable from "examples/Tables/DataTable";
import datas from "./data";
import { useFetch } from "hooks/useFetch";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "context/AuthContext";

function Projects() {
  const [rows, setRows] = useState([]);
  const [driverConditionUrl, setDriverConditionUrl] = useState("");
  const { data } = useFetch({ url: driverConditionUrl });
  const { user } = useContext(AuthContext);
  const columns = [
    { Header: "date", accessor: "companies", width: "50%", align: "left" },
    { Header: "count", accessor: "completion", align: "right" },
  ];

  useEffect(() => {
    const id = user?.user?.id;
    setDriverConditionUrl(
      `${process.env.REACT_APP_API_URL}/api/driverCondition/getEyeBlink/${id}?page=1&&limit=100`
    );
  }, [user]);

  useEffect(() => {
    if (data?.data?.length) {
      let r = datas(data)?.rows;
      setRows(r);
    }
  }, [data]);

  return (
    <Card>
      <MDBox p={3}>
        <MDTypography variant="h6" gutterBottom>
          Projects
        </MDTypography>
      </MDBox>
      <MDBox>
        {data && (
          <DataTable
            table={{ columns, rows }}
            showTotalEntries={false}
            isSorted={false}
            noEndBorder
            entriesPerPage={false}
          />
        )}
      </MDBox>
    </Card>
  );
}

export default Projects;
