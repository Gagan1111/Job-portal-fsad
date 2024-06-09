import { useState, useEffect, useContext } from "react";
import {
  Button,
  Chip,
  Grid,
  makeStyles,
  Paper,
  Typography,
  Modal,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import axios from "axios";
import { SentimentDissatisfied } from "@material-ui/icons";
import { SetPopupContext } from "../App";
import apiList from "../lib/apiList";

const useStyles = makeStyles((theme) => ({
  body: {
    height: "inherit",
  },
  statusBlock: {
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    textTransform: "uppercase",
  },
  jobTileOuter: {
    padding: "30px",
    margin: "20px",
    boxSizing: "border-box",
    width: "100%",
    backgroundColor: "#f9f9f9", // Light grey color for background
    borderRadius: "15px", // Adding border radius
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)", // Adding a subtle box shadow
  },
  popupDialog: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  acceptedRow: {
    backgroundColor: "#e0f7e9", // light green
  },
  appliedRow: {
    backgroundColor: "#e3f2fd", // light blue
  },
  finishedRow: {
    backgroundColor: "#fffde7", // light yellow
  },
  rejectedRow: {
    backgroundColor: "#ffebee", // light red
  },
  noDataContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  noDataText: {
    fontSize: "1.5rem",
    color: "#666",
  },
  noDataIcon: {
    width: "150px",
    height: "150px",
    marginBottom: "20px",
  },
}));

const ApplicationTile = (props) => {
  const classes = useStyles();
  const { application } = props;
  const setPopup = useContext(SetPopupContext);
  const [open, setOpen] = useState(false);
  const [rating, setRating] = useState(application.job.rating);

  const appliedOn = new Date(application.dateOfApplication);
  const joinedOn = new Date(application.dateOfJoining);

  const fetchRating = () => {
    axios
      .get(`${apiList.rating}?id=${application.job._id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setRating(response.data.rating);
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err.response.data);
        setPopup({
          open: true,
          severity: "error",
          message: "Error",
        });
      });
  };

  const changeRating = () => {
    axios
      .put(
        apiList.rating,
        { rating: rating, jobId: application.job._id },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        console.log(response.data);
        setPopup({
          open: true,
          severity: "success",
          message: "Rating updated successfully",
        });
        fetchRating();
        setOpen(false);
      })
      .catch((err) => {
        console.log(err);
        setPopup({
          open: true,
          severity: "error",
          message: err.response.data.message,
        });
        fetchRating();
        setOpen(false);
      });
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Paper className={classes.jobTileOuter} style={{ backgroundColor: props.color }} elevation={3}>
      <Grid container>
        <Grid container item xs={9} spacing={1} direction="column">
          <Grid item>
            <Typography variant="h5" style={{ fontSize: "1.5rem", fontWeight: "bold" }}>{application.job.title}</Typography>
          </Grid>
          <Grid item>Posted By: {application.recruiter.name}</Grid>
          <Grid item>Role : {application.job.jobType}</Grid>
          <Grid item>Salary : &#8377; {application.job.salary} per month</Grid>
          <Grid item>
            Duration :{" "}
            {application.job.duration !== 0
              ? `${application.job.duration} month`
              : `Flexible`}
          </Grid>
          <Grid item>
            {application.job.skillsets.map((skill) => (
              <Chip key={skill} label={skill} style={{ marginRight: "2px" }} />
            ))}
          </Grid>
          <Grid item>Applied On: {appliedOn.toLocaleDateString()}</Grid>
          {application.status === "accepted" ||
            application.status === "finished" ? (
            <Grid item>Joined On: {joinedOn.toLocaleDateString()}</Grid>
          ) : null}
        </Grid>
        <Grid item container direction="column" xs={3}>
          <Grid item xs>
            {/* <Paper
              className={classes.statusBlock}
              style={{
                background: colorSet[application.status],
                color: "#ffffff",
              }}
            >
              {application.status}
            </Paper> */}
          </Grid>
          {application.status === "accepted" ||
            application.status === "finished" ? (
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                className={classes.statusBlock}
                onClick={() => {
                  fetchRating();
                  setOpen(true);
                }}
              >
                Rate Job
              </Button>
            </Grid>
          ) : null}
        </Grid>
      </Grid>
      <Modal open={open} onClose={handleClose} className={classes.popupDialog}>
        <Paper
          style={{
            padding: "20px",
            outline: "none",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minWidth: "30%",
            alignItems: "center",
          }}
        >
          <Rating
            name="simple-controlled"
            style={{ marginBottom: "30px" }}
            value={rating === -1 ? null : rating}
            onChange={(event, newValue) => {
              setRating(newValue);
            }}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ padding: "10px 50px" }}
            onClick={() => changeRating()}
          >
            Submit
          </Button>
        </Paper>
      </Modal>
    </Paper>
  );
};

const Applications = (props) => {
  const classes = useStyles();
  const setPopup = useContext(SetPopupContext);
  const [applications, setApplications] = useState([]);

  useEffect(() => {
    getData();
  }, []);

  const getData = () => {
    axios
      .get(apiList.applications, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setApplications(response.data);
      })
      .catch((err) => {
        console.log(err.response.data);
        setPopup({
          open: true,
          severity: "error",
          message: "Error",
        });
      });
  };

  const categorizedApplications = {
    accepted: applications.filter((app) => app.status === "accepted"),
    applied: applications.filter((app) => app.status === "applied"),
    finished: applications.filter((app) => app.status === "finished"),
    rejected: applications.filter((app) => app.status === "rejected"),
  };

  const renderNoData = (text) => (
    <div className={classes.noDataContainer}>
      <SentimentDissatisfied className={classes.noDataIcon} />
      <Typography className={classes.noDataText}>{text}</Typography>
    </div>
  );

  return (
    <Grid
      container
      item
      direction="column"
      alignItems="center"
      style={{ padding: "30px", minHeight: "93vh" }}
    >
      <Grid item>
        <Typography variant="h2" style={{ fontSize: "3rem", marginBottom: "20px" }}>Applications</Typography>
      </Grid>
      <Typography variant="h4" style={{ fontSize: "2rem", margin: "20px 0", textAlign: "left", width: "100%" }}>Accepted Applications</Typography>
      <Grid
        container
        item
        spacing={2}
        style={{ width: "100%", marginBottom: "20px" }}
      >
        {categorizedApplications.accepted.length > 0 ? (
          categorizedApplications.accepted.map((obj) => (
            <Grid key={obj._id} item xs={12} sm={6} md={4} >
              <ApplicationTile application={obj} color="#e0f7e9" />
            </Grid>
          ))
        ) : (
          renderNoData("No Accepted Applications Found")
        )}
      </Grid>
      <Typography
  variant="h4"
  style={{ fontSize: "2rem", margin: "20px 0", textAlign: "left", width: "100%" }}
>
  Applied Applications
</Typography>      <Grid
        container
        item
        spacing={2}
        style={{ width: "100%", marginBottom: "20px" }}
      >
        {categorizedApplications.applied.length > 0 ? (
          categorizedApplications.applied.map((obj) => (
            <Grid key={obj._id} item xs={12} sm={6} md={4} >
              <ApplicationTile application={obj} color="#e3f2fd" />
            </Grid>
          ))
        ) : (
          renderNoData("No Applied Applications Found")
        )}
      </Grid>
      <Typography variant="h4" style={{ fontSize: "2rem", margin: "20px 0", textAlign: "left", width: "100%" }}>Finished Applications</Typography>
      <Grid
        container
        item
        spacing={2}
        style={{ width: "100%", marginBottom: "20px" }}
      >
        {categorizedApplications.finished.length > 0 ? (
          categorizedApplications.finished.map((obj) => (
            <Grid key={obj._id} item xs={12} sm={6} md={4} >
              <ApplicationTile application={obj} color="#fffde7" />
            </Grid>
          ))
        ) : (
          renderNoData("No Finished Applications Found")
        )}
      </Grid>
      <Typography variant="h4" style={{ fontSize: "2rem", margin: "20px 0", textAlign: "left", width: "100%" }}>Rejected Applications</Typography>
      <Grid
        container
        item
        spacing={2}
        style={{ width: "100%", marginBottom: "20px" }}
      >
        {categorizedApplications.rejected.length > 0 ? (
          categorizedApplications.rejected.map((obj) => (
            <Grid key={obj._id} item xs={12} sm={6} md={4} >
              <ApplicationTile application={obj} color="#ffebee" />
            </Grid>
          ))
        ) : (
          renderNoData("No Rejected Applications Found")
        )}
      </Grid>
    </Grid>
  );
};

export default Applications;
