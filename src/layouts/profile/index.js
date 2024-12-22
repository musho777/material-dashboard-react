import Grid from "@mui/material/Grid";
import Divider from "@mui/material/Divider";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import error from "assets/images/small-logos/error.svg";

// Material Dashboard 2 React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import ProfilesList from "examples/Lists/ProfilesList";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";

// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";

// Data
import profilesListData from "layouts/profile/data/profilesListData";

// Images
import homeDecor1 from "assets/images/home-decor-1.jpg";
import homeDecor2 from "assets/images/home-decor-2.jpg";
import homeDecor3 from "assets/images/home-decor-3.jpg";
import homeDecor4 from "assets/images/home-decor-4.jpeg";
import team1 from "assets/images/team-1.jpg";
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import ReportsBarChart from "examples/Charts/BarCharts/ReportsBarChart";
import reportsBarChartData from "layouts/dashboard/data/reportsBarChartData";
import reportsLineChartData from "layouts/dashboard/data/reportsLineChartData";
import ReportsLineChart from "examples/Charts/LineCharts/ReportsLineChart";
import MDAvatar from "components/MDAvatar";
import { Error } from "@mui/icons-material";
import { Warning } from "assets/images/svg";
import { ErrorSvg } from "assets/images/svg";
import { SuccessSvg } from "assets/images/svg";
import { Box } from "@mui/material";
import { useState } from "react";

function Overview() {
  const { sales, tasks } = reportsLineChartData;
  const [screen, setScreen] = useState(0);
  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header setScreen={(e) => setScreen(e)}>
        {screen == 0 && (
          <MDBox mt={5} mb={3}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
                <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
                <ProfileInfoCard
                  title="profile information"
                  description="Hi, I’m Alec Thompson, Decisions: If you can’t decide, the answer is no. If two equally difficult paths, choose the one more painful in the short term (pain avoidance is creating an illusion of equality)."
                  info={{
                    fullName: "Alec M. Thompson",
                    mobile: "(44) 123 1234 123",
                    email: "alecthompson@mail.com",
                    location: "USA",
                    age: "23",
                  }}
                  social={[
                    {
                      link: "https://www.facebook.com/CreativeTim/",
                      icon: <FacebookIcon />,
                      color: "facebook",
                    },
                    {
                      link: "https://twitter.com/creativetim",
                      icon: <TwitterIcon />,
                      color: "twitter",
                    },
                    {
                      link: "https://www.instagram.com/creativetimofficial/",
                      icon: <InstagramIcon />,
                      color: "instagram",
                    },
                  ]}
                  action={{ route: "", tooltip: "Edit Profile" }}
                  shadow={false}
                />
                <Divider orientation="vertical" sx={{ mx: 0 }} />
              </Grid>
              <Grid item xs={12} md={6} xl={4} sx={{ display: "flex", justifyContent: "center" }}>
                <ProfileInfoCard
                  title="Car information"
                  description=""
                  info={{
                    Manufacture: "Mercedes",
                    model: "GL 450",
                    year: "2013",
                    fule: "Petrol",
                    color: "Black",
                    wheels: "4x4",
                    number: "OO-000-OO",
                  }}
                  social={[]}
                  action={{ route: "", tooltip: "Edit Profile" }}
                  shadow={false}
                />
              </Grid>

              <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
                <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
                <ProfileInfoCard
                  title="Driver statistic"
                  description=""
                  info={{
                    distance: "4000km",
                    hourse: "400H",
                    rest: "20H",
                  }}
                  social={[]}
                  action={{ route: "", tooltip: "Edit Profile" }}
                  shadow={false}
                />
              </Grid>
            </Grid>
          </MDBox>
        )}
        {screen == 1 && (
          <MDBox mt={10.5}>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6} lg={4}>
                <MDBox mb={3}>
                  <ReportsBarChart
                    color="info"
                    title="website views"
                    description="Last Campaign Performance"
                    date="campaign sent 2 days ago"
                    chart={reportsBarChartData}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <MDBox mb={3}>
                  <ReportsLineChart
                    color="success"
                    title="daily sales"
                    description={
                      <>
                        (<strong>+15%</strong>) increase in today sales.
                      </>
                    }
                    date="updated 4 min ago"
                    chart={sales}
                  />
                </MDBox>
              </Grid>
              <Grid item xs={12} md={6} lg={4}>
                <MDBox mb={3}>
                  <ReportsLineChart
                    color="dark"
                    title="completed tasks"
                    description="Last Campaign Performance"
                    date="just updated"
                    chart={tasks}
                  />
                </MDBox>
              </Grid>
            </Grid>
          </MDBox>
        )}
        {screen == 2 && (
          <MDBox mt={5} mb={3}>
            <Grid container spacing={1}>
              <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
                <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
                <ProfileInfoCard
                  title="Norms"
                  info={{
                    Heart_Rate: "60–100 BPM",
                    Blood_Pressure: "120/80 mmHg",
                    Body_Temperature: "36.5°C to 37.5°C",
                    Eye_Blinks: "USA",
                    Head_Sloap: "45",
                    line_Cross: "0",
                  }}
                  social={[]}
                  action={{ route: "", tooltip: "Edit Profile" }}
                  shadow={false}
                />
                <Divider orientation="vertical" sx={{ mx: 0 }} />
              </Grid>
              <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
                <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
                <ProfileInfoCard
                  title="Norms"
                  info={{
                    Heart_Rate: "60–100 BPM",
                    Blood_Pressure: "120/80 mmHg",
                    Body_Temperature: "36.5°C to 37.5°C",
                    Eye_Blinks: "USA",
                    Head_Sloap: "45",
                    line_Cross: "4",
                  }}
                  social={[]}
                  action={{ route: "", tooltip: "Edit Profile" }}
                  shadow={false}
                />
                <Divider orientation="vertical" sx={{ mx: 0 }} />
              </Grid>
              <Grid item xs={12} md={6} xl={4} sx={{ display: "flex" }}>
                <Divider orientation="vertical" sx={{ ml: -2, mr: 1 }} />
                <ProfileInfoCard
                  title="Driver statistic"
                  description=""
                  info={{
                    Heart_Rate: <Warning />,
                    Blood_Pressure: <Warning />,
                    Body_Temperature: <ErrorSvg />,
                    Eye_Blinks: <SuccessSvg />,
                    Head_Sloap: <SuccessSvg />,
                    line_Cross: <SuccessSvg />,
                  }}
                  social={[]}
                  action={{ route: "", tooltip: "Edit Profile" }}
                  shadow={false}
                />
              </Grid>
            </Grid>
          </MDBox>
        )}
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

export default Overview;
