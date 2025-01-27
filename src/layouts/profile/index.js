import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";

import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";

import Header from "layouts/profile/components/Header";

import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import { useEffect, useState } from "react";

function Overview() {
  const [eyeBlinkData, setEyeBlinkData] = useState({
    data: [],
    error: "",
    loading: false,
    lastUpdate: null,
  });
  const reportsBarChartData = {
    labels: ["16:13", "16:14", "16:15", "16:16", "16:17"],
    datasets: { label: "eye blink", data: [10, 20, 10, 22, 50] },
  };

  const getEyeBlink = async () => {
    const token = "678905b5de805c654489b0f4";
    const now = new Date();
    const options = { hour: "2-digit", minute: "2-digit" };
    let curretnDate = now.toLocaleTimeString([], options);
    try {
      const response = await fetch(
        `http://localhost:8080/api/driverCondition/getEyeBlink/${token}?page=1`
      );
      if (!response.ok) {
        throw new Error(`Network response was not ok: ${response.statusText}`);
      }

      const data = await response.json();

      if (!data.eyeBlinks) {
        throw new Error("Insufficient eye blink data received.");
      }
      const eyeData = {
        labels: data.eyeBlinks
          ?.map((blink) => {
            const date = new Date(blink.timestamp);
            return `${date.getHours()}:${String(date.getUTCMinutes()).padStart(2, "0")}`;
          })
          .reverse(),
        datasets: {
          label: "eye blink",
          data: data.eyeBlinks.map((blink) => blink.count).reverse(),
        },
      };
      setEyeBlinkData({
        data: eyeData,
        error: "",
        loading: false,
        lastUpdate: curretnDate,
      });
    } catch (error) {
      setEyeBlinkData({
        data: null,
        error: error.message,
        loading: false,
        lastUpdate: curretnDate,
      });
    }
  };

  useEffect(() => {
    getEyeBlink();
    const interval = setInterval(() => {
      getEyeBlink();
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header>
        <MDBox mt={10.5}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={4}>
              <MDBox mb={3}>
                <ReportsBarChart
                  color="info"
                  title="Eye Blink"
                  description="Last 5 Eye Blink"
                  date={`last update in ${eyeBlinkData.lastUpdate}`}
                  chart={eyeBlinkData.data}
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
