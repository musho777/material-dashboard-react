/**
=========================================================
* Driver Control React - v2.2.0
=========================================================

* Product Page: https://www.creative-tim.com/product/material-dashboard-react
* Copyright 2023 Creative Tim (https://www.creative-tim.com)

Coded by www.creative-tim.com

 =========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.*/
import React, { useState, useEffect } from "react";

// prop-types is a library for typechecking of props.
import PropTypes from "prop-types";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Driver Control React components
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";

// Driver Control React base styles
import breakpoints from "assets/theme/base/breakpoints";

// Images
import burceMars from "assets/images/bruce-mars.jpg";
import backgroundImage from "assets/images/bg-profile.jpeg";
import MDButton from "components/MDButton";
import { Box, Modal } from "@mui/material";
import axios from "axios";
import { useParams } from "react-router-dom";
import { HashLoader, RingLoader, RotateLoader } from "react-spinners";


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  pt: 2,
  px: 4,
  pb: 3,
};



function Header({ children, user }) {
  const [tabsOrientation, setTabsOrientation] = useState("horizontal");
  const [open, setOpen] = useState(false)
  const { id } = useParams()
  const [loading, setLoading] = useState(true)
  const [data, setData] = useState({})

  useEffect(() => {
    // A function that sets the orientation state of the tabs.
    function handleTabsOrientation() {
      return window.innerWidth < breakpoints.values.sm
        ? setTabsOrientation("vertical")
        : setTabsOrientation("horizontal");
    }

    /** 
     The event listener that's calling the handleTabsOrientation function when resizing the window.
    */
    window.addEventListener("resize", handleTabsOrientation);

    // Call the handleTabsOrientation function to set the state with the initial value.
    handleTabsOrientation();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handleTabsOrientation);
  }, [tabsOrientation]);


  useEffect(() => {
    if (open) {
      setLoading(true)
      let ID = id
      if (id == ":id") {
        ID = user?.user?.id
      }
      axios.get(`${process.env.REACT_APP_API_URL}/api/driverCondition/analyzeDriver/${ID}`).then((r) => {
        console.log(r.data)
        setData(r.data)
        setLoading(false)
      })
    }
  }, [open])
  return (
    <MDBox position="relative" mb={5}>
      <MDBox
        display="flex"
        alignItems="center"
        position="relative"
        minHeight="18.75rem"
        borderRadius="xl"
        sx={{
          backgroundImage: ({ functions: { rgba, linearGradient }, palette: { gradients } }) =>
            `${linearGradient(
              rgba(gradients.info.main, 0.6),
              rgba(gradients.info.state, 0.6)
            )}, url(${backgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "50%",
          overflow: "hidden",
        }}
      />
      <Card
        sx={{
          position: "relative",
          mt: -8,
          mx: 3,
          py: 2,
          px: 2,
        }}
      >
        <Grid container spacing={3} alignItems="center" justifyContent="space-between" sx={{ paddingLeft: 2, paddingRight: 2 }}>
          <Grid item sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', gap: "20px" }}>
            <Grid>
              <MDAvatar src={burceMars} alt="profile-image" size="xl" shadow="sm" />
            </Grid>
            <MDBox height="100%" mt={0.5} lineHeight={1}>
              <MDTypography variant="h5" fontWeight="medium">
                Mekhak Poghosyan
              </MDTypography>
              <MDTypography variant="button" color="text" fontWeight="regular">
                Driver
              </MDTypography>
            </MDBox>
          </Grid>
          <Grid>
            <MDButton onClick={() => setOpen(true)} color="success">View Condition</MDButton>
          </Grid>
        </Grid>
        {children}
      </Card>
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="parent-modal-title"
        aria-describedby="parent-modal-description"
      >
        <Box sx={{ ...style, width: 400 }}>

          <MDTypography variant="h5" fontWeight="medium">
            Driving Analysis: Warnings and Recommendations for the Last 5 Minutes
          </MDTypography>
          <Grid sx={{ display: 'flex', marginTop: 1 }} width={"100%"} justifyContent="center" alignItems={"center"}>
            {loading ?
              <HashLoader size={20} color="#81c784" /> :
              <Grid>
                <MDTypography variant="h6" fontWeight="medium">
                  {data.message}
                </MDTypography>
                <MDTypography variant="h6" fontWeight="medium">
                  blink count: {data.stats?.blinkCount}
                </MDTypography>
                <MDTypography variant="h6" fontWeight="medium">
                  crossLine count: {data.stats?.crossLineCount}
                </MDTypography>
                <MDTypography variant="h6" fontWeight="medium">
                  fatigue level:{data.stats?.fatigueLevel}
                </MDTypography>
                <MDTypography variant="h6" fontWeight="medium">
                  hardBraking count:{data.stats?.hardBrakingCount}
                </MDTypography>
              </Grid>
            }
          </Grid>
        </Box>
      </Modal>
    </MDBox>
  );
}

// Setting default props for the Header
Header.defaultProps = {
  children: "",
};

// Typechecking props for the Header
Header.propTypes = {
  children: PropTypes.node,
};

export default Header;
