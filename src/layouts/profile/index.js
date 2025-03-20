import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Header from "layouts/profile/components/Header";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import { useContext, useEffect, useState } from "react";
import { useFetch } from "hooks/useFetch";
import { AuthContext } from "context/AuthContext";
import { useNavigate } from "react-router-dom";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import { useChart } from "hooks/useChart";

function Overview() {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const [urlForFatigue, setUrlForFatigue] = useState("");
  const [urlForCrossLine, setUrlForCrossLine] = useState("");
  const [sppedUrl, setSpeedUrl] = useState("");
  const { user } = useContext(AuthContext);

  const { data } = useFetch({ url: url, interval: 10000 });
  const forFatigue = useFetch({ url: urlForFatigue, interval: 10000 });
  const forCrossLine = useFetch({ url: urlForCrossLine, interval: 10000 });
  const speed = useFetch({ url: sppedUrl, interval: 10000 });

  const eyeBlinkData = useChart({ data: data?.data ?? [], label: "eye blink" });
  const fatigueData = useChart({ data: forFatigue?.data?.data ?? [], label: "emotions" });
  const crossLineData = useChart({ data: forCrossLine?.data?.data ?? [], label: "cross line" });
  const speedData = useChart({ data: speed?.data?.data ?? [], label: "speed" });

  useEffect(() => {
    if (user?.user?.id) {
      const id = user.user.id;
      setUrl(`${process.env.REACT_APP_API_URL}/api/driverCondition/getEyeBlink/${id}?page=1`);
      setUrlForFatigue(
        `${process.env.REACT_APP_API_URL}/api/driverCondition/getFatigue/${id}?page=1`
      );
      setSpeedUrl(`${process.env.REACT_APP_API_URL}/api/driverCondition/getSpeed/${id}?page=1`);
      setUrlForCrossLine(`
        ${process.env.REACT_APP_API_URL}/api/driverCondition/getCrossLine/${id}?page=1
        `);
    }
  }, [user]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header>
        <MDBox mt={10.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox onClick={() => navigate("/profile/statistic/eyeblink")} mb={3}>
                <ReportsLineChart
                  color="info"
                  title="Eye Blink"
                  description="Last 5 Eye Blink"
                  date={`last update in ${eyeBlinkData?.chartData?.lastUpdate || "N/A"}`}
                  chart={eyeBlinkData?.chartData?.data || []}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox onClick={() => navigate("/profile/statistic/fatigue")} mb={3}>
                <ReportsLineChart
                  color="success"
                  title="Fatigue"
                  description={<>Level of fatigue from 0 to 100</>}
                  date={`last update in ${fatigueData?.chartData?.lastUpdate || "N/A"}`}
                  chart={fatigueData?.chartData?.data || []}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox onClick={() => navigate("/profile/statistic/fatigue")} mb={3}>
                <ReportsLineChart
                  color="dark"
                  title="Line cross"
                  description={<>line cross in 1 minute</>}
                  date={`last update in ${crossLineData?.chartData?.lastUpdate || "N/A"}`}
                  chart={crossLineData?.chartData?.data || []}
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
                  date={`last update in ${fatigueData?.chartData?.lastUpdate || "N/A"}`}
                  chart={fatigueData?.chartData?.data || []}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox onClick={() => navigate("/profile/statistic/fatigue")} mb={3}>
                <ReportsLineChart
                  color="info"
                  title="Speed"
                  description={<>speed in 1 minute</>}
                  date={`last update in ${speedData?.chartData?.lastUpdate || "N/A"}`}
                  chart={speedData?.chartData?.data || []}
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
