import React from "react";
import { Grid, Typography, Card, CardContent, CardMedia, makeStyles } from "@material-ui/core";
import welcomeImage from "./welcome.png"; // Import your welcome image
import { useHistory } from "react-router-dom";
import person from "./person.png"; // Make sure the path to your logo is correct
import accept from "./accept.png"; // Make sure the path to your logo is correct
import candidate from "./candidate.png"; // Make sure the path to your logo is correct
import smiley from "./smiley.png"; // Make sure the path to your logo is correct
import {
  Button
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.default, // Set background color
    minHeight: "100vh", // Ensure full viewport height
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    width: 1000,
    height: 600,
    margin: theme.spacing(2),
    borderRadius: theme.shape.borderRadius, // Apply border radius
    boxShadow: theme.shadows[4], // Add subtle shadow
  },
  media: {
    height: 500,
    backgroundSize: "cover",
  },
  cardContent: {
    textAlign: "center",
  },
  pieChartContainer: {
    marginTop: theme.spacing(4),
  },
  tileContainer: {
    marginTop: theme.spacing(4),
  },
  tile: {
    padding: theme.spacing(2),
    border: "1px solid #ddd",
    borderRadius: theme.shape.borderRadius,
    textAlign: "center",
  },
}));

const Welcome = (props) => {
  const classes = useStyles();
  const history = useHistory();

  return (
    <div className={classes.root}>
      <Grid container direction="column" alignItems="center">
        <Grid item>
          <Typography variant="h2">Welcome to Job Portal</Typography>
        </Grid>
        <Grid item>
          <Card className={classes.card} style={{ width: 1000, height: 600, position: "relative" }}>
            <CardMedia
              className={classes.media}
              image={welcomeImage}
              title="Welcome Image"
            />
             <Button  
  style={{
    position: "absolute",
    bottom: "32px", // Adjust the distance from the bottom as needed
    left: "50%",
    transform: "translateX(-50%)",
    padding: "10px",
    background: "#ADD8E6"
  }}
  variant="contained"
  onClick={() => {
    history.push("/home");
  }}
>
  Apply for Jobs
</Button>

          </Card>
         
        </Grid>

        <Card style={{ width: 1000, height: 350 }}>
          <Grid item>
            <Typography style={{ fontSize: "30px", padding: "20px", color: "black", textAlign: "center" }}>
              Steps to do
            </Typography>
            <Grid item container spacing={2} justify="center">
              <Grid item>
                <Card style={{ width: 220, height: 210 }}>
                  <CardContent>
                    <img src={person} alt="Logo" style={{ width: 30, height: 40, margin: "12px" }} />
                    <Typography variant="body2" color="textSecondary">
                      Sign up to our platform by providing your details including your full name, educational background, work experience, and resume.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item>
                <Card style={{ width: 220, height: 210 }}>
                  <CardContent>
                    <img src={candidate} alt="Logo" style={{ width: 30, height: 40, margin: "12px" }} />
                    <Typography variant="body2" color="textSecondary">
                      Browse through our available job listings, select the position that matches your skills and interests, and submit your application promptly.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item>
                <Card style={{ width: 220, height: 210 }}>
                  <CardContent>
                    <img src={accept} alt="Logo" style={{ width: 30, height: 40, margin: "12px" }} />
                    <Typography variant="body2" color="textSecondary">
                      After completing the recruiter interview process, you have the option to accept the job offer and start your new career.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
              <Grid item>
                <Card style={{ width: 220, height: 210 }}>
                  <CardContent>
                    <img src={smiley} alt="Logo" style={{ width: 30, height: 40, margin: "12px" }} />
                    <Typography variant="body2" color="textSecondary">
                      We are excited for you to begin your new position and wish you success and fulfillment in your career.
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            </Grid>
          </Grid>
        </Card>
      </Grid>
    </div>
  );
};

export const ErrorPage = (props) => {
  return (
    <Grid
      container
      item
      direction="column"
      alignItems="center"
      justify="center"
      style={{ padding: "30px", minHeight: "93vh" }}
    >
      <Grid item>
        <Typography variant="h2">Error 404</Typography>
      </Grid>
    </Grid>
  );
};


export default Welcome;
