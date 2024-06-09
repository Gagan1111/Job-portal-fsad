import React, { useState } from "react";
import {
  Modal,
  Paper,
  TextField,
  Button,
  makeStyles,
} from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  filterModal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: theme.spacing(4),
    outline: "none",
    minWidth: "50%", // Adjust width as needed for medium size
    maxWidth: "80%", // Add a maximum width for responsiveness
  },
}));

const FilterPopup = ({ onApply }) => {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [filters, setFilters] = useState({
    // Define your filter state here
    // Example:
    // keyword: "",
    // minSalary: 0,
    // maxSalary: 100000,
    // duration: 0,
  });

  const handleApply = () => {
    // Pass the filters to the parent component
    onApply(filters);
    setOpen(false);
  };

  return (
    <>
      <IconButton
        color="primary"
        onClick={() => setOpen(true)}
        className={classes.filterButton}
      >
        <FilterListIcon />
      </IconButton>
      <Modal open={open} onClose={() => setOpen(false)}>
        <Paper className={classes.filterModal}>
          {/* Add your filter fields here */}
          {/* Example: */}
          {/* <TextField
            label="Keyword"
            value={filters.keyword}
            onChange={(e) => setFilters({ ...filters, keyword: e.target.value })}
          />
          <TextField
            label="Minimum Salary"
            value={filters.minSalary}
            onChange={(e) => setFilters({ ...filters, minSalary: e.target.value })}
          />
          <TextField
            label="Maximum Salary"
            value={filters.maxSalary}
            onChange={(e) => setFilters({ ...filters, maxSalary: e.target.value })}
          />
          <TextField
            label="Duration"
            value={filters.duration}
            onChange={(e) => setFilters({ ...filters, duration: e.target.value })}
          /> */}
          {/* Add more filter fields as needed */}
          <Button variant="contained" color="primary" onClick={handleApply}>
            Apply
          </Button>
        </Paper>
      </Modal>
    </>
  );
};

export default FilterPopup;
