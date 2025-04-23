import { useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import SingUpLayout from "layouts/authentication/components/SingUpLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import MDAlert from "components/MDAlert";

function Cover() {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [error, setError] = useState({ type: "", message: "need valid email" });
  const changeStep = () => {
    // setStep(step + 1);
  };

  const handleInputChange = (e) => {
    const input = e.target.value.replace(/\D/g, ""); // Remove non-numeric characters
    const formattedNumber = formatPhoneNumber(input);
    setPhoneNumber(formattedNumber);
  };

  const formatPhoneNumber = (input) => {
    if (!input) return "";
    const countryCode = "+374 ";
    const mainPart = input.substring(3, 5) ? input.substring(3, 5) : "";
    const secondPart = input.substring(5, 8) ? input.substring(5, 8) : "";
    const thirdPart = input.substring(8, 11) ? input.substring(8, 11) : "";
    const phone = `${countryCode} ${mainPart}-${secondPart}-${thirdPart}`;
    return phone.trim().replace(/[-]+$/, "");
  };

  return (
    <SingUpLayout image={bgImage}>
      <MDBox sx={{ position: "absolute", right: 40, top: 40 }}>
        <MDAlert color="error" dismissible>
          <MDTypography variant="body2" color="white">
            {error.message}
          </MDTypography>
        </MDAlert>
      </MDBox>
      {/* <MDStepper step={step} /> steps*/}
      <Card
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.4)",
          backdropFilter: "blur(25px)",
        }}
      >
        <MDBox
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <MDBox
            variant="gradient"
            bgColor="info"
            borderRadius="lg"
            coloredShadow="info"
            mx={"10%"}
            mt={-2.5}
            p={1}
            mb={1}
            textAlign="center"
            sx={{ width: 150 }}
          >
            <MDTypography variant="h6" fontWeight="medium" color="white">
              Sign Up
            </MDTypography>
          </MDBox>
        </MDBox>
        {/* <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput autoComplete="false" type="string" placeholder="Name" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput autoComplete="false" type="string" placeholder="Surname" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput autoComplete="false" type="string" placeholder="Mobile" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput autoComplete="false" type="email" placeholder="Email" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput autoComplete="false" type="date" placeholder="Date" fullWidth />
            </MDBox>
          </MDBox>
        </MDBox> */}
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              {/* <MDSelect /> */}
              <MDInput error autoComplete="false" type="string" placeholder="Name" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput autoComplete="false" type="string" placeholder="Surname" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                onChange={handleInputChange}
                value={phoneNumber}
                autoComplete="false"
                type="string"
                placeholder="Mobile"
                fullWidth
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput autoComplete="false" type="email" placeholder="Email" fullWidth />
            </MDBox>
            <MDBox mb={2}>
              <MDInput autoComplete="false" type="date" placeholder="Date" fullWidth />
            </MDBox>
          </MDBox>
        </MDBox>
        <MDBox pb={3} px={3} mb={1}>
          <MDButton onClick={changeStep} variant="gradient" color="info" fullWidth>
            NEXT
          </MDButton>
        </MDBox>
      </Card>
    </SingUpLayout>
  );
}

export default Cover;
