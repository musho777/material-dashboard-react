import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Header from "layouts/profile/components/Header";
import { use, useContext, useEffect, useState } from "react";
import { AuthContext } from "context/AuthContext";
import { useNavigate, useParams } from "react-router-dom";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import axios from "axios";

function Overview() {
  const navigate = useNavigate();
  const { id } = useParams()
  const { user } = useContext(AuthContext);
  const [eyeBlinkData, setEyeBlinkData] = useState({
    data: {},
    error: "",
    loading: false,
    lastUpdate: "",
  })
  const [fatigueData, setFatigueData] = useState({
    data: {},
    error: "",
    loading: false,
    lastUpdate: "",
  })
  const [crossLineData, setCrossLineData] = useState({
    data: {},
    error: "",
    loading: false,
    lastUpdate: "",
  })
  const [speedData, setSpeedData] = useState({
    data: {},
    error: "",
    loading: false,
    lastUpdate: "",
  })



  const getData = (url, setData) => {
    let ID = id
    if (id == ":id") {
      ID = user?.user?.id
    }
    axios.get(`${process.env.REACT_APP_API_URL}/api/driverCondition/${url}/${ID}?page=1`).then((r) => {
      const now = new Date();
      const options = { hour: "2-digit", minute: "2-digit" };
      let curretnDate = now.toLocaleTimeString([], options);
      let newData = {};
      if (r.data) {
        newData = {
          labels: r.data.data
            ?.map((blink) => {
              const date = new Date(blink.timestamp);
              return `${date.getHours()}:${String(date.getUTCMinutes()).padStart(2, "0")}`;
            })
            .reverse(),
          datasets: {
            label: "eye blink",
            data: r.data.data?.map((blink) => blink.count).reverse(),
          },
        };
      }
      setData({
        data: newData,
        error: "",
        loading: false,
        lastUpdate: curretnDate,
      });
    })
      .catch((error) => {
      })
  }


  useEffect(() => {
    getData("getEyeBlink", setEyeBlinkData)
    getData("getFatigue", setFatigueData)
    getData("getCrossLine", setCrossLineData)
    getData("getSpeed", setSpeedData)
  }, [])

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header user={user}>
        <MDBox mt={10.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox onClick={() => navigate("/profile/statistic/eyeblink")} mb={3}>
                <ReportsLineChart
                  color="info"
                  title="Eye Blink"
                  description="Last 5 Eye Blink"
                  date={`last update in ${eyeBlinkData?.lastUpdate || "N/A"}`}
                  chart={eyeBlinkData?.data || []}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox onClick={() => navigate("/profile/statistic/fatigue")} mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Fatigue"
                  description={<>Level of fatigue from 0 to 100</>}
                  date={`last update in ${fatigueData?.lastUpdate || "N/A"}`}
                  chart={fatigueData?.data || []}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox onClick={() => navigate("/profile/statistic/fatigue")} mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="Line cross"
                  description={<>line cross in 1 minute</>}
                  date={`last update in ${crossLineData?.lastUpdate || "N/A"}`}
                  chart={crossLineData?.data || []}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              {/* dose not work */}
              <MDBox onClick={() => navigate("/profile/statistic/fatigue")} mb={3}>
                <ReportsLineChart
                  color="info"
                  title="hard braking"
                  description={<>hard braking in 1 minute</>}
                  date={`last update in ${fatigueData?.lastUpdate || "N/A"}`}
                  chart={fatigueData?.data || []}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox onClick={() => navigate("/profile/statistic/fatigue")} mb={3}>
                <ReportsLineChart
                  color="info"
                  title="Speed"
                  description={<>speed in 1 minute</>}
                  date={`last update in ${speedData?.lastUpdate || "N/A"}`}
                  chart={speedData?.data || []}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
