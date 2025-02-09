import Grid from "@mui/material/Grid";
import MDBox from "components/MDBox";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Footer from "examples/Footer";
import Header from "layouts/profile/components/Header";
import ComplexStatisticsCard from "examples/Cards/StatisticsCards/ComplexStatisticsCard";
import Projects from "./components/Projects";
import { useContext, useEffect, useState } from "react";
import { useFetch } from "hooks/useFetch";
import { AuthContext } from "context/AuthContext";
import { useParams } from "react-router-dom";

function Statistics() {
  const [AvargeEyeUrl, setAvargeEyeUrl] = useState("");
  const AvargeEye = useFetch({ url: AvargeEyeUrl });
  const { user } = useContext(AuthContext);
  const { type } = useParams();
  const [info, setInfo] = useState({ color: "dark", name: "" });
  useEffect(() => {
    const id = user?.user?.id;
    setAvargeEyeUrl(
      `${process.env.REACT_APP_API_URL}/api/driverCondition/getAverageEyeBlink/${id}?page=1&&limit=100`
    );
  }, [user]);

  useEffect(() => {
    if (type == "eyeblink") setInfo({ color: "info", name: "eye blink" });
    else if (type == "fatigue") setInfo({ color: "success", name: "fatigue" });
  }, [type]);

  return (
    <DashboardLayout>
      <DashboardNavbar />
      <MDBox mb={2} />
      <Header>
        <MDBox mb={6} />
        <Grid container spacing={3}>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color={info.color}
                icon="visibility"
                title={`Average ${info.name}`}
                count={AvargeEye.data.averageEyeBlinks}
                percentage={{
                  color: "success",
                  amount: "+55%",
                  label: "than lask week",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color={info.color}
                icon="visibility"
                title={`Max ${info.name}`}
                count={AvargeEye.data.maxEyeBlinks}
                percentage={{
                  color: "success",
                  amount: "+55%",
                  label: "than lask week",
                }}
              />
            </MDBox>
          </Grid>
          <Grid item xs={12} md={6} lg={3}>
            <MDBox mb={1.5}>
              <ComplexStatisticsCard
                color={info.color}
                icon="visibility"
                title={`Min ${info.name}`}
                count={AvargeEye.data.minEyeBlinks}
                percentage={{
                  color: "success",
                  amount: "+55%",
                  label: "than lask week",
                }}
              />
            </MDBox>
          </Grid>
        </Grid>
        <MDBox mb={6} />
        <Grid item xs={12} md={6} lg={8}>
          <Projects />
        </Grid>
      </Header>
      <Footer />
    </DashboardLayout>
  );
}

export default Statistics;
