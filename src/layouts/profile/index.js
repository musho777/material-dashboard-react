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

function Overview(props) {
  const navigate = useNavigate();
  const [url, setUrl] = useState("");
  const { data } = useFetch({ url, interval: 3000 });
  const { user } = useContext(AuthContext);
  const [eyeBlinkData, setEyeBlinkData] = useState({
    data: {},
    error: "",
    loading: false,
    lastUpdate: null,
  });
  const reportsBarChartData = {
    labels: ["16:13", "16:14", "16:15", "16:16", "16:17"],
    datasets: { label: "eye blink", data: [10, 20, 10, 22, 50] },
  };

  useEffect(() => {
    const id = user?.user?.id;
    setUrl(`${process.env.REACT_APP_API_URL}/api/driverCondition/getEyeBlink/${id}?page=1`);
  }, [user]);

  useEffect(() => {
    const now = new Date();
    const options = { hour: "2-digit", minute: "2-digit" };
    let curretnDate = now.toLocaleTimeString([], options);
    let eyeData = {};
    if (data.eyeBlinks) {
      eyeData = {
        labels: data?.eyeBlinks
          ?.map((blink) => {
            const date = new Date(blink.timestamp);
            return `${date.getHours()}:${String(date.getUTCMinutes()).padStart(2, "0")}`;
          })
          .reverse(),
        datasets: {
          label: "eye blink",
          data: data?.eyeBlinks.map((blink) => blink.count).reverse(),
        },
      };
    }
    setEyeBlinkData({
      data: eyeData,
      error: "",
      loading: false,
      lastUpdate: curretnDate,
    });
  }, [data]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header>
        <MDBox mt={10.5}>
          <Grid onClick={() => navigate("/profile/statistic")} container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="Eye Blink"
                  description="Last 5 Eye Blink"
                  date={`last update in ${eyeBlinkData.lastUpdate}`}
                  chart={eyeBlinkData?.data}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="secondary"
                  title="Heart Rate"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="secondary"
                  title="Blood Pressure"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
          </Grid>
        </MDBox>
        <MDBox mt={5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="secondary"
                  title="Head Sloap"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="secondary"
                  title="line Cross"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
                />
              </MDBox>
            </Grid>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="secondary"
                  title="Emotions"
                  description="Last Campaign Performance"
                  date="campaign sent 2 days ago"
                  chart={reportsBarChartData}
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
