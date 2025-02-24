import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";

// Define types for the form fields
type FormData = {
  assignee: string;
  type: string;
  status: string;
  priority: string;
};

interface FormProps {
  onSubmit: any;
}

const FormComponent: React.FC<FormProps> = ({ onSubmit }) => {
  // State to manage form data
  const [formData, setFormData] = useState<FormData>({
    assignee: "John Doe",
    type: "",
    status: "",
    priority: "",
  });

  // Handle form field changes
  const handleChange = (event: SelectChangeEvent<string>) => {
    const { name, value } = event.target;
    console.log("name", name, value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    onSubmit(formData);
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: 3,
        margin: "auto",
      }}
    >
      {/* Assignee Dropdown */}
      <FormControl fullWidth>
        <InputLabel id="assignee-label">Assignee</InputLabel>
        <Select
          labelId="assignee-label"
          id="assignee"
          name="assignee"
          value={formData.assignee}
          onChange={handleChange}
          label="Assignee"
        >
          <MenuItem value="John Doe">John Doe</MenuItem>
          <MenuItem value="Nitin">Nitin</MenuItem>
          <MenuItem value="Sangham">Sangham</MenuItem>
          <MenuItem value="Vishnu">Vishnu</MenuItem>
        </Select>
      </FormControl>

      {/* Type Dropdown */}
      <FormControl fullWidth>
        <InputLabel id="type-label">Type</InputLabel>
        <Select
          labelId="type-label"
          id="type"
          name="type"
          value={formData.type}
          onChange={handleChange}
          label="Type"
        >
          <MenuItem value="assignee">Assignee</MenuItem>
          <MenuItem value="proposal">Proposal</MenuItem>
        </Select>
      </FormControl>

      {/* Status Dropdown */}
      <FormControl fullWidth>
        <InputLabel id="status-label">Status</InputLabel>
        <Select
          labelId="status-label"
          id="status"
          name="status"
          value={formData.status}
          onChange={handleChange}
          label="Status"
        >
          <MenuItem value="In Progress">In Progress</MenuItem>
          <MenuItem value="Complete">Complete</MenuItem>
        </Select>
      </FormControl>

      {/* Priority Dropdown */}
      <FormControl fullWidth>
        <InputLabel id="priority-label">Priority</InputLabel>
        <Select
          labelId="priority-label"
          id="priority"
          name="priority"
          value={formData.priority}
          onChange={handleChange}
          label="Priority"
        >
          <MenuItem value="High">High</MenuItem>
          <MenuItem value="Medium">Medium</MenuItem>
          <MenuItem value="Low">Low</MenuItem>
        </Select>
      </FormControl>

      {/* Submit Button */}
      <Button type="submit" variant="contained" color="primary">
        Submit
      </Button>
    </Box>
  );
};

export default FormComponent;
