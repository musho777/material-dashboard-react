import Dashboard from "layouts/dashboard";
import Tables from "layouts/tables";
import Profile from "layouts/profile";
import SignIn from "layouts/authentication/sign-in";
import SignUp from "layouts/authentication/sign-up";
import Icon from "@mui/material/Icon";
import Billing from "layouts/billing";
import Notifications from "layouts/notifications";
import Statistics from "layouts/statistics";
import AllUsers from "layouts/allusers";
import { AddUser } from "layouts/addUsers";
import TeamsPage from "layouts/createTeam";
import TeamPage from "layouts/teamSinglPage";
import SinglTeamPage from "layouts/teamSinglPage";
import BusinessIcon from '@mui/icons-material/Business';

const routes = [
  {
    type: "collapse",
    name: "Dashboard",
    key: "dashboard",
    icon: <Icon fontSize="small">dashboard</Icon>,
    route: "/dashboard",
    component: <Dashboard />,
  },
  // {
  //   type: "collapse",
  //   name: "Tables",
  //   key: "tables",
  //   icon: <Icon fontSize="small">table_view</Icon>,
  //   route: "/tables",
  //   component: <Tables />,
  // },
  // {
  //   type: "collapse",
  //   name: "Billing",
  //   key: "billing",
  //   icon: <Icon fontSize="small">receipt_long</Icon>,
  //   route: "/billing",
  //   component: <Billing />,
  // },
  // {
  //   type: "collapse",
  //   name: "Notifications",
  //   key: "notifications",
  //   icon: <Icon fontSize="small">notifications</Icon>,
  //   route: "/notifications",
  //   component: <Notifications />,
  // },
  {
    type: "collapse",
    name: "Profile",
    key: "profile",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile/:id",
    component: <Profile />,
  },
  {
    type: "collapse",
    name: "team",
    key: "team",
    icon: <Icon fontSize="small">Team</Icon>,
    route: "/team",
    component: <TeamsPage />,
  },
  {
    type: "expanded",
    name: "singlPage",
    key: "singlPage",
    icon: <Icon fontSize="small">company</Icon>,
    route: "/team/:id",
    component: <SinglTeamPage />,
  },
  {
    type: "collapse",
    name: "allusers",
    key: "allusers",
    icon: <Icon fontSize="small">All Users</Icon>,
    route: "/allusers",
    component: <AllUsers />,
  },
  {
    type: "collapse",
    name: "add user",
    key: "creat",
    icon: <Icon fontSize="small">add</Icon>,
    route: "/addUser",
    component: <AddUser />,
  },
  {
    type: "expanded",
    name: "statistics",
    key: "statistic",
    icon: <Icon fontSize="small">person</Icon>,
    route: "/profile/statistic/:type",
    component: <Statistics />,
  },
  {
    type: "expanded",
    name: "Sign In",
    key: "sign-in",
    icon: <Icon fontSize="small">login</Icon>,
    route: "/authentication/sign-in",
    component: <SignIn />,
  },
  {
    type: "expanded",
    name: "Sign Up",
    key: "sign-up",
    icon: <Icon fontSize="small">assignment</Icon>,
    route: "/authentication/sign-up",
    component: <SignUp />,
  },
];

export default routes;
