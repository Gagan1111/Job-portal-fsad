import { createContext, useState } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { Grid, makeStyles } from "@material-ui/core";

import Welcome, { ErrorPage } from "./component/Welcome";
import Navbar from "./component/Navbar";
import Login from "./component/Login";
import Logout from "./component/Logout";
import Signup from "./component/Signup";
import Home from "./component/Home";
import Applications from "./component/Applications";
import Profile from "./component/Profile";
import CreateJobs from "./component/recruiter/CreateJobs";
import MyJobs from "./component/recruiter/MyJobs";
import JobApplications from "./component/recruiter/JobApplications";
import AcceptedApplicants from "./component/recruiter/AcceptedApplicants";
import RecruiterProfile from "./component/recruiter/Profile";
import MessagePopup from "./lib/MessagePopup";
import isAuth, { userType } from "./lib/isAuth";

// Styling for the application
const useStyles = makeStyles((theme) => ({
  body: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "98vh",
    paddingTop: "64px",
    boxSizing: "border-box",
    width: "100%",
  },
}));

// Create context for managing popup state
export const SetPopupContext = createContext();

function App() {
  const classes = useStyles();
  const [popup, setPopup] = useState({
    open: false,
    severity: "",
    message: "",
  });

  return (
    <BrowserRouter>
      <SetPopupContext.Provider value={setPopup}>
        <Grid container direction="column">
          <Grid item xs>
            <Navbar />
          </Grid>
          <Grid item className={classes.body}>
            <Switch>
              <Route exact path="/">
                <Welcome />
              </Route>
              <Route exact path="/login">
                <Login />
              </Route>
              <Route exact path="/signup">
                <Signup />
              </Route>
              <Route exact path="/logout">
                <Logout />
              </Route>
              <ProtectedRoute exact path="/home">
                <Home />
              </ProtectedRoute>
              <ProtectedRoute exact path="/applications">
                <Applications />
              </ProtectedRoute>
              <ProtectedRoute exact path="/profile">
                {userType() === "recruiter" ? (
                  <RecruiterProfile />
                ) : (
                  <Profile />
                )}
              </ProtectedRoute>
              <ProtectedRoute exact path="/addjob" requiredRole="recruiter">
                <CreateJobs />
              </ProtectedRoute>
              <ProtectedRoute exact path="/myjobs" requiredRole="recruiter">
                <MyJobs />
              </ProtectedRoute>
              <ProtectedRoute exact path="/job/applications/:jobId" requiredRole="recruiter">
                <JobApplications />
              </ProtectedRoute>
              <ProtectedRoute exact path="/employees" requiredRole="recruiter">
                <AcceptedApplicants />
              </ProtectedRoute>
              <Route>
                <ErrorPage />
              </Route>
            </Switch>
          </Grid>
        </Grid>
        <MessagePopup
          open={popup.open}
          setOpen={(status) =>
            setPopup({
              ...popup,
              open: status,
            })
          }
          severity={popup.severity}
          message={popup.message}
        />
      </SetPopupContext.Provider>
    </BrowserRouter>
  );
}

// Custom ProtectedRoute component to handle authentication and authorization
const ProtectedRoute = ({ children, requiredRole, ...rest }) => {
  return (
    <Route
      {...rest}
      render={({ location }) =>
        isAuth() ? (
          requiredRole && userType() !== requiredRole ? (
            <Redirect to={{ pathname: "/", state: { from: location } }} />
          ) : (
            children
          )
        ) : (
          <Redirect to={{ pathname: "/login", state: { from: location } }} />
        )
      }
    />
  );
};

export default App;
