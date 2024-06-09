import { Card, CardContent, CardActions, Button } from '@material-ui/core';
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
  const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}33`; // Generate a random hex color code with opacity

  return (
    <Card className={classes.card} style={{ backgroundColor: randomColor }}>
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
          disabled={userType() === "recruiter"}
        >
          Apply
        </Button>
      </CardActions>
      <Modal open={open} onClose={handleClose}>
        <Paper style={{ padding: "20px", outline: "none" }}>
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
