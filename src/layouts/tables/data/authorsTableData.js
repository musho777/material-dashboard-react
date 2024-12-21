import MDBox from "components/MDBox";
import MDTypography from "components/MDTypography";
import MDAvatar from "components/MDAvatar";
import MDBadge from "components/MDBadge";
// Images
import team2 from "assets/images/team-2.jpg";
import team3 from "assets/images/team-3.jpg";
import team4 from "assets/images/team-4.jpg";
import tired from "assets/images/feeling/tired.svg";
import angry from "assets/images/feeling/angry.svg";
import good from "assets/images/feeling/good.svg";

export default function data() {
  const Author = ({ image, name, email }) => (
    <MDBox display="flex" alignItems="center" lineHeight={1}>
      <MDAvatar src={image} name={name} size="sm" />
      <MDBox ml={2} lineHeight={1}>
        <MDTypography display="block" variant="button" fontWeight="medium">
          {name}
        </MDTypography>
        <MDTypography variant="caption">{email}</MDTypography>
      </MDBox>
    </MDBox>
  );

  const Job = ({ blink }) => (
    <MDBox lineHeight={1} textAlign="center">
      <MDTypography display="block" variant="caption" color="text" fontWeight="medium">
        {blink}
      </MDTypography>
    </MDBox>
  );

  const AbletoDrive = ({ title, description }) => (
    <MDTypography isplay="block" variant="caption" color="text" fontWeight="medium">
      5h 25 min
    </MDTypography>
  );

  // Everything is fine
  // Need some rest
  // A little nap
  // Short rest

  return {
    columns: [
      { Header: "author", accessor: "author", align: "left" },
      { Header: "Eye blink", accessor: "Eyeblink", align: "center" },
      { Header: "Able to drive", accessor: "abletodrive", align: "center" },
      // { Header: "Head Radius", accessor: "HeadRadius", align: "center" },
      { Header: "Active Drive", accessor: "ActiveDrive", align: "center" },
      { Header: "Driver Emotions", accessor: "DriverEmotions", align: "center" },
      { Header: "status", accessor: "status", align: "center" },
      { Header: "Driver status", accessor: "DriverStatus", align: "center" },
    ],

    rows: [
      {
        author: <Author image={team2} name="John Michael" email="john@creative-tim.com" />,
        Eyeblink: <Job blink={30} />,
        abletodrive: <AbletoDrive />,
        ActiveDrive: (
          <MDBox ml={-1}>
            <MDTypography isplay="block" variant="caption" color="text" fontWeight="medium">
              1h 45 min
            </MDTypography>
          </MDBox>
        ),
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
          </MDBox>
        ),
        DriverEmotions: (
          <MDBox ml={-1}>
            <MDTypography isplay="block" variant="caption" color="text" fontWeight="medium">
              <MDAvatar src={tired} name={"felling"} size="sm" variant="rounded" />
            </MDTypography>
          </MDBox>
        ),
        DriverStatus: (
          <MDBox ml={-1}>
            <MDTypography isplay="block" variant="caption" color="text" fontWeight="medium">
              Need some rest
            </MDTypography>
          </MDBox>
        ),
      },
      {
        author: <Author image={team2} name="John Michael" email="john@creative-tim.com" />,
        Eyeblink: <Job blink={20} />,
        abletodrive: <AbletoDrive />,
        ActiveDrive: (
          <MDBox ml={-1}>
            <MDTypography isplay="block" variant="caption" color="text" fontWeight="medium">
              1h 45 min
            </MDTypography>
          </MDBox>
        ),
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        DriverEmotions: (
          <MDBox ml={-1}>
            <MDTypography isplay="block" variant="caption" color="text" fontWeight="medium">
              <MDAvatar src={good} name={"felling"} size="sm" variant="rounded" />
            </MDTypography>
          </MDBox>
        ),
        DriverStatus: (
          <MDBox ml={-1}>
            <MDTypography isplay="block" variant="caption" color="text" fontWeight="medium">
              Everything is fine
            </MDTypography>
          </MDBox>
        ),
      },
      {
        author: <Author image={team2} name="John Michael" email="john@creative-tim.com" />,
        Eyeblink: <Job blink={15} />,
        abletodrive: <AbletoDrive />,
        ActiveDrive: (
          <MDBox ml={-1}>
            <MDTypography isplay="block" variant="caption" color="text" fontWeight="medium">
              1h 45 min
            </MDTypography>
          </MDBox>
        ),
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        DriverEmotions: (
          <MDBox ml={-1}>
            <MDTypography isplay="block" variant="caption" color="text" fontWeight="medium">
              <MDAvatar src={good} name={"felling"} size="sm" variant="rounded" />
            </MDTypography>
          </MDBox>
        ),
        DriverStatus: (
          <MDBox ml={-1}>
            <MDTypography isplay="block" variant="caption" color="text" fontWeight="medium">
              Everything is fine
            </MDTypography>
          </MDBox>
        ),
      },
      {
        author: <Author image={team2} name="John Michael" email="john@creative-tim.com" />,
        Eyeblink: <Job blink={20} />,
        abletodrive: <AbletoDrive />,
        ActiveDrive: (
          <MDBox ml={-1}>
            <MDTypography isplay="block" variant="caption" color="text" fontWeight="medium">
              1h 45 min
            </MDTypography>
          </MDBox>
        ),
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="online" color="success" variant="gradient" size="sm" />
          </MDBox>
        ),
        DriverEmotions: (
          <MDBox ml={-1}>
            <MDTypography isplay="block" variant="caption" color="text" fontWeight="medium">
              <MDAvatar src={good} name={"felling"} size="sm" variant="rounded" />
            </MDTypography>
          </MDBox>
        ),
        DriverStatus: (
          <MDBox ml={-1}>
            <MDTypography isplay="block" variant="caption" color="text" fontWeight="medium">
              Everything is fine
            </MDTypography>
          </MDBox>
        ),
      },
      {
        author: <Author image={team2} name="John Michael" email="john@creative-tim.com" />,
        Eyeblink: <Job blink={30} />,
        abletodrive: <AbletoDrive />,
        ActiveDrive: (
          <MDBox ml={-1}>
            <MDTypography isplay="block" variant="caption" color="text" fontWeight="medium">
              1h 45 min
            </MDTypography>
          </MDBox>
        ),
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
          </MDBox>
        ),
        DriverEmotions: (
          <MDBox ml={-1}>
            <MDTypography isplay="block" variant="caption" color="text" fontWeight="medium">
              <MDAvatar src={angry} name={"felling"} size="sm" variant="rounded" />
            </MDTypography>
          </MDBox>
        ),
        DriverStatus: (
          <MDBox ml={-1}>
            <MDTypography isplay="block" variant="caption" color="text" fontWeight="medium">
              A little nap
            </MDTypography>
          </MDBox>
        ),
      },
      {
        author: <Author image={team2} name="John Michael" email="john@creative-tim.com" />,
        Eyeblink: <Job blink={40} />,
        abletodrive: <AbletoDrive />,
        ActiveDrive: (
          <MDBox ml={-1}>
            <MDTypography isplay="block" variant="caption" color="text" fontWeight="medium">
              1h 45 min
            </MDTypography>
          </MDBox>
        ),
        status: (
          <MDBox ml={-1}>
            <MDBadge badgeContent="offline" color="dark" variant="gradient" size="sm" />
          </MDBox>
        ),
        DriverEmotions: (
          <MDBox ml={-1}>
            <MDTypography isplay="block" variant="caption" color="text" fontWeight="medium">
              <MDAvatar src={tired} name={"felling"} size="sm" variant="rounded" />
            </MDTypography>
          </MDBox>
        ),
        DriverStatus: (
          <MDBox ml={-1}>
            <MDTypography isplay="block" variant="caption" color="text" fontWeight="medium">
              Short rest
            </MDTypography>
          </MDBox>
        ),
      },
    ],
  };
}
