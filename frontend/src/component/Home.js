import { useState, useEffect, useContext } from "react";
import {
  Button,
  Chip,
  Grid,
  IconButton,
  InputAdornment,
  makeStyles,
  Paper,
  TextField,
  Typography,
  Modal,
  Slider,
  FormControlLabel,
  FormGroup,
  MenuItem,
  Checkbox,
  Card,
  CardContent,
  CardActions,
  CardHeader,
  Divider,
  Box,
  Container,
  Toolbar,
} from "@material-ui/core";
import Rating from "@material-ui/lab/Rating";
import Pagination from "@material-ui/lab/Pagination";
import axios from "axios";
import SearchIcon from "@material-ui/icons/Search";
import FilterListIcon from "@material-ui/icons/FilterList";
import hash from "hash.js"; // Import hash function

import { SetPopupContext } from "../App";

import apiList from "../lib/apiList";
import { userType } from "../lib/isAuth";

const useStyles = makeStyles((theme) => ({
  body: {
    height: "inherit",
  },
  searchContainer: {
    backgroundColor: '#b3f0ff', // Light gray background color
    padding: theme.spacing(1),
    borderRadius: '8px', // Adjust border radius as needed
  },
  searchInput: {
    marginRight: theme.spacing(2),
    width: '400px', // Adjust the width to make it larger
    '& .MuiOutlinedInput-root': {
      borderRadius: '8px', // Border radius for input field
      backgroundColor: 'white', // Background color for input field
    },
  },
  // searchContainer: {
  //   display: "flex",
  //   alignItems: "center",
  //   justifyContent: "space-between",
  //   marginBottom: theme.spacing(4),
  // },
  filterButton: {
    marginLeft: theme.spacing(2),
  },
  card: {
    marginBottom: theme.spacing(4),
    borderRadius: theme.spacing(2), // Add some border radius to make the card look cute
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Add a subtle shadow for depth
  },
  applyButton: {
    backgroundColor: theme.palette.primary.main,
    color: "#fff",
    borderRadius: theme.spacing(1), // Add some border radius to the button
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  },
  sidebar: {
    width: "25%",
    padding: theme.spacing(2),
    backgroundColor: theme.palette.background.paper,
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)", // Add a subtle shadow for depth
  },
  filterSection: {
    marginBottom: theme.spacing(4),
  },
  filterTitle: {
    marginBottom: theme.spacing(2),
  },
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  filterModal: {
    padding: theme.spacing(4),
    outline: "none",
    minWidth: "50%", // Adjust width as needed for medium size
    maxWidth: "80%", // Add a maximum width for responsiveness
  },
}));

const FilterPopup = (props) => {
  const classes = useStyles();
  const { open, handleClose, searchOptions, setSearchOptions, getData } = props;

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
      className={classes.modal}
    >
      <Paper className={classes.filterModal}>
        <Grid container direction="column" spacing={3}>
          <Grid item container alignItems="center">
            <Grid item xs={3}>Job Type</Grid>
            <Grid item xs={9}>
              <FormGroup row>
                <FormControlLabel
                  control={
                    <Checkbox
                      name="fullTime"
                      checked={searchOptions.jobType.fullTime}
                      onChange={(event) => setSearchOptions({
                        ...searchOptions,
                        jobType: {
                          ...searchOptions.jobType,
                          [event.target.name]: event.target.checked,
                        },
                      })}
                    />
                  }
                  label="Full Time"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="partTime"
                      checked={searchOptions.jobType.partTime}
                      onChange={(event) => setSearchOptions({
                        ...searchOptions,
                        jobType: {
                          ...searchOptions.jobType,
                          [event.target.name]: event.target.checked,
                        },
                      })}
                    />
                  }
                  label="Part Time"
                />
                <FormControlLabel
                  control={
                    <Checkbox
                      name="wfh"
                      checked={searchOptions.jobType.wfh}
                      onChange={(event) => setSearchOptions({
                        ...searchOptions,
                        jobType: {
                          ...searchOptions.jobType,
                          [event.target.name]: event.target.checked,
                        },
                      })}
                    />
                  }
                  label="Work From Home"
                />
              </FormGroup>
            </Grid>
          </Grid>
          <Grid item container alignItems="center">
            <Grid item xs={3}>Salary</Grid>
            <Grid item xs={9}>
              <Slider
                valueLabelDisplay="auto"
                valueLabelFormat={(value) => value * 1000}
                marks={[
                  { value: 0, label: "0" },
                  { value: 100, label: "100k" },
                ]}
                value={searchOptions.salary}
                onChange={(event, value) => setSearchOptions({ ...searchOptions, salary: value })}
              />
            </Grid>
          </Grid>
          <Grid item container alignItems="center">
            <Grid item xs={3}>Duration</Grid>
            <Grid item xs={9}>
              <TextField
                select
                label="Duration"
                variant="outlined"
                fullWidth
                value={searchOptions.duration}
                onChange={(event) => setSearchOptions({ ...searchOptions, duration: event.target.value })}
              >
                <MenuItem value="0">All</MenuItem>
                <MenuItem value="1">1</MenuItem>
                <MenuItem value="2">2</MenuItem>
                <MenuItem value="3">3</MenuItem>
                <MenuItem value="4">4</MenuItem>
                <MenuItem value="5">5</MenuItem>
                <MenuItem value="6">6</MenuItem>
                <MenuItem value="7">7</MenuItem>
                <MenuItem value="8">8</MenuItem>
                <MenuItem value="9">9</MenuItem>
              </TextField>
            </Grid>
          </Grid>
          <Grid item container alignItems="center">
            <Grid item xs={3}>Priority</Grid>
            <Grid item xs={9}>
              <TextField
                select
                label="Priority"
                variant="outlined"
                fullWidth
                value={searchOptions.priority}
                onChange={(event) => setSearchOptions({ ...searchOptions, priority: event.target.value })}
              >
                <MenuItem value="">All</MenuItem>
                <MenuItem value="Urgent">Urgent</MenuItem>
                <MenuItem value="Normal">Normal</MenuItem>
              </TextField>
            </Grid>
          </Grid>
          {/* <Grid item container alignItems="center">
            <Grid item xs={3}>Sort</Grid>
            <Grid item xs={9}>
              <TextField
                select
                label="Sort"
                variant="outlined"
                fullWidth
                value={searchOptions.sort}
                onChange={(event) => setSearchOptions({ ...searchOptions, sort: event.target.value })}
              >
                <MenuItem value="salary">Salary</MenuItem>
                <MenuItem value="duration">Duration</MenuItem>
                <MenuItem value="rating">Rating</MenuItem>
              </TextField>
            </Grid>
          </Grid> */}
          <Grid item container justify="space-between">
            <Button
              variant="contained"
              color="primary"
              onClick={() => {
                getData();
                handleClose();
              }}
            >
              Apply
            </Button>
            <Button
              variant="contained"
              onClick={() => {
                setSearchOptions({
                  query: "",
                  jobType: {
                    fullTime: false,
                    partTime: false,
                    wfh: false,
                  },
                  salary: [0, 100],
                  duration: "0",
                  sort: "salary",
                  priority: "", // Add this line
                });
              }}
            >
              Reset
            </Button>
          </Grid>
        </Grid>
      </Paper>
    </Modal>
  );
};


const JobTile = (props) => {
  const classes = useStyles();
  const { job } = props;
  const setPopup = useContext(SetPopupContext);

  const [open, setOpen] = useState(false);
  const [sop, setSop] = useState("");

  const handleClose = () => {
    setOpen(false);
    setSop("");
  };

  const handleApply = () => {
    axios
      .post(
        `${apiList.jobs}/${job._id}/applications`,
        { sop },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
      .then((response) => {
        setPopup({
          open: true,
          severity: "success",
          message: response.data.message,
        });
        handleClose();
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: "error",
          message: err.response.data.message,
        });
        handleClose();
      });
  };

  const deadline = new Date(job.deadline).toLocaleDateString();
  // Generate a fixed random color based on job title or ID
  const jobColor = `#${hash.sha1().update(job.title).digest("hex").slice(0, 6)}33`;

  return (
    <Card className={classes.card} style={{ backgroundColor: jobColor }}>
      <CardHeader
        title={job.title}
        subheader={`Posted by: ${job.recruiter.name}`}
      />
      <CardContent>
        <Typography variant="body2" color="textSecondary">
          Role: {job.jobType}
          <br />
          Salary: &#8377;{job.salary} per month
          <br />
          Duration: {job.duration !== 0 ? `${job.duration} month` : `Flexible`}
          <br />
          Application Deadline: {deadline}
          <br/>
          Priority: {job.priority}
        </Typography>
        <Rating value={job.rating !== -1 ? job.rating : null} readOnly />
        <div>
          {job.skillsets.map((skill, index) => (
            <Chip key={index} label={skill} style={{ marginRight: "2px" }} />
          ))}
        </div>
      </CardContent>
      <CardActions>
        <Button
          variant="contained"
          className={classes.applyButton}
          onClick={() => setOpen(true)}
        >
          Apply
        </Button>
      </CardActions>
      
      <Modal open={open} onClose={handleClose} style={{
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: 600,
    height: 500,
    marginLeft:370
  }}>
        <Paper style={{ padding: "20px", outline: "none",  width: 600,
    height: 300,}} >
          <TextField
            label="Write SOP (upto 250 words)"
            multiline
            rows={8}
            style={{ width: "100%", marginBottom: "30px" }}
            variant="outlined"
            value={sop}
            onChange={(event) => {
              if (event.target.value.split(" ").filter(Boolean).length <= 250) {
                setSop(event.target.value);
              }
            }}
          />
          <Button
            variant="contained"
            color="primary"
            style={{ padding: "10px 50px" }}
            onClick={handleApply}
          >
            Submit
          </Button>
        </Paper>
      </Modal>
    </Card>
  );
};


const Home = () => {
  const classes = useStyles();
  const setPopup = useContext(SetPopupContext);

  const [jobs, setJobs] = useState([]);
  const [page, setPage] = useState(1);
const [searchQuery, setSearchQuery] = useState("");
  const [searchOptions, setSearchOptions] = useState({
    query: "",
    jobType: {
      fullTime: false,
      partTime: false,
      wfh: false,
    },
    salary: [0, 100],
    duration: "0",
    sort: "salary",
    priority: "",
  });
  const [open, setOpen] = useState(false);
const getDataSearch = () => {
  axios
    .get(`${apiList.jobs}?page=${page}&q=${searchQuery}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
    .then((response) => {
      setJobs(response.data);
    })
    .catch((err) => {
      setPopup({
        open: true,
        severity: "error",
        message: "Error",
      });
    });
};

useEffect(() => {
  getDataSearch();
}, [page, searchQuery]);

  const getData = () => {
    let searchParams = [];
    if (searchOptions.query !== "") {
      searchParams = [...searchParams, `q=${searchOptions.query}`];
    }
    if (searchOptions.jobType.fullTime) {
      searchParams = [...searchParams, "jobType=Full%20Time"];
    }
    if (searchOptions.jobType.partTime) {
      searchParams = [...searchParams, "jobType=Part%20Time"];
    }
    if (searchOptions.jobType.wfh) {
      searchParams = [...searchParams, "jobType=Work%20From%20Home"];
    }
    if (searchOptions.salary[0] > 0) {
      searchParams = [...searchParams, `salaryMin=${searchOptions.salary[0] * 1000}`];
    }
    if (searchOptions.salary[1] < 100) {
      searchParams = [...searchParams, `salaryMax=${searchOptions.salary[1] * 1000}`];
    }
    if (searchOptions.duration !== "0") {
      searchParams = [...searchParams, `duration=${searchOptions.duration}`];
    }
    if (searchOptions.priority !== "") {
      searchParams = [...searchParams, `priority=${searchOptions.priority}`];
    }
    const searchString = searchParams.join("&");
    axios
      .get(`${apiList.jobs}?page=${page}&${searchString}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setJobs(response.data);
      })
      .catch((err) => {
        setPopup({
          open: true,
          severity: "error",
          message: "Error",
        });
      });
  };
  
  useEffect(() => {
    getData();
  }, [page]);
  

  useEffect(() => {
    getData();
  }, [page]);

  return (
    <Container className={classes.body}>
    <Toolbar />
    <Box display="flex" justifyContent="center" alignItems="center" mb={4}>
      <Box display="flex" alignItems="center" className={classes.searchContainer}>
        <TextField
          variant="outlined"
          placeholder="Search for jobs..."
          value={searchOptions.query}
          onChange={(event) => {
            setSearchOptions({ ...searchOptions, query: event.target.value });
            setSearchQuery(event.target.value);
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          className={classes.searchInput}
          style={{margin:"7px"}}
        />
        <IconButton
          color="primary"
          onClick={() => setOpen(true)}
          className={classes.filterButton}
        >
          <FilterListIcon />
        </IconButton>
      </Box>
    </Box>
    <Grid container spacing={4}>
      {jobs.map((job) => (
        <Grid item xs={12} sm={6} md={4} key={job._id}>
          <JobTile job={job} />
        </Grid>
      ))}
    </Grid>
    <Grid container justifyContent="center">
      <Pagination
        count={10}
        page={page}
        onChange={(event, value) => setPage(value)}
      />
    </Grid>
    <FilterPopup
      open={open}
      handleClose={() => setOpen(false)}
      searchOptions={searchOptions}
      setSearchOptions={setSearchOptions}
      getData={getData}
    />
  </Container>
  );
};

export default Home;
