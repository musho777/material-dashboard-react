import { useEffect, useState } from "react";

// @mui material components
import Card from "@mui/material/Card";
import Switch from "@mui/material/Switch";
import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDInput from "components/MDInput";
import MDButton from "components/MDButton";

// Authentication layout components
import BasicLayout from "layouts/authentication/components/BasicLayout";

// Images
import bgImage from "assets/images/bg-sign-in-basic.jpeg";
import { NavLink } from "react-router-dom";
import { validateEmail } from "../../../functions";
import MDAlert from "components/MDAlert";
import { useAuth } from "context/AuthContext";

function Basic() {
  const [rememberMe, setRememberMe] = useState(false);
  const [email, setEmail] = useState({ value: "", error: "" });
  const [password, setPassword] = useState({ value: "", error: "" });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleSetRememberMe = () => setRememberMe(!rememberMe);
  const { login } = useAuth();

  useEffect(() => {
    const timeout = setTimeout(() => {
      setError("");
    }, 5000);
    return () => clearTimeout(timeout);
  }, [error]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSuccess("");
    }, 5000);
    return () => clearTimeout(timeout);
  }, [success]);

  const loginValidation = async () => {
    let validemail = false;
    let validwpassword = false;
    if (validateEmail(email.value)) {
      setEmail({ value: email.value, error: "" });
      validemail = true;
    } else {
      setEmail({ value: email.value, error: "Email is wrong" });
      setError("Email is wrong");
      validemail = false;
    }
    if (password.value.length >= 6) {
      setPassword({ value: password.value, error: "" });
      validwpassword = true;
    } else {
      setPassword({ value: password.value, error: "Password is wrong" });
      setError("Password is wrong");
      validwpassword = false;
    }
    if (validemail && validwpassword) {
      const response = await login(email.value, password.value);
      if (response.status) setSuccess(response.message);
      else setError(response.message);
    }
  };

  return (
    <BasicLayout image={bgImage}>
      <MDBox sx={{ position: "absolute", right: 40, top: 40 }}>
        {error.length > 0 && (
          <MDAlert color="error" dismissible>
            <MDTypography variant="body2" color="white">
              {error}
            </MDTypography>
          </MDAlert>
        )}
        {success.length > 0 && (
          <MDAlert color="success" dismissible>
            <MDTypography variant="body2" color="white">
              {success}
            </MDTypography>
          </MDAlert>
        )}
      </MDBox>
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
              Sign in
            </MDTypography>
          </MDBox>
        </MDBox>
        <MDBox pt={4} pb={3} px={3}>
          <MDBox component="form" role="form">
            <MDBox mb={2}>
              <MDInput
                autoComplete="false"
                type="email"
                placeholder="Email"
                fullWidth
                error={!!email.error}
                onChange={(e) => setEmail({ value: e.target.value, error: "" })}
              />
            </MDBox>
            <MDBox mb={2}>
              <MDInput
                autoComplete="false"
                type="password"
                placeholder="Password"
                fullWidth
                error={!!password.error}
                onChange={(e) => setPassword({ value: e.target.value, error: "" })}
              />
            </MDBox>
            <MDBox display="flex" alignItems="center" ml={-1}>
              <Switch checked={rememberMe} onChange={handleSetRememberMe} />
              <MDTypography
                variant="button"
                fontWeight="regular"
                color="text"
                onClick={handleSetRememberMe}
                sx={{ cursor: "pointer", userSelect: "none", ml: -1 }}
              >
                &nbsp;&nbsp;Remember me
              </MDTypography>
            </MDBox>
            <MDBox mt={2} mb={1}>
              <MDButton onClick={loginValidation} variant="gradient" color="info" fullWidth>
                sign in
              </MDButton>
            </MDBox>
            <MDBox display="flex" alignItems="center" justifyContent="center">
              <NavLink to={"/authentication/sign-up"} key={"sign-up"}>
                <MDTypography
                  variant="button"
                  fontWeight="regular"
                  color="text"
                  onClick={handleSetRememberMe}
                  sx={{ cursor: "pointer", userSelect: "none", justifyContent: "center", mt: 1 }}
                >
                  Not a Member ? Signup
                </MDTypography>
              </NavLink>
            </MDBox>
          </MDBox>
        </MDBox>
      </Card>
    </BasicLayout>
  );
}

export default Basic;
