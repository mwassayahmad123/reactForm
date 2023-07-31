import React, { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import {
  Stepper,
  Step,
  StepLabel,
  Button,
  TextField,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
  Container,
  Typography,
  Checkbox,
  Grid,
  Paper,
} from '@mui/material';
import { parseISO, isValid } from 'date-fns'; // Import date-fns functions

const steps = ['Personal Details', 'Education Details', 'Travel History'];

const App = () => {
  const [currentlyPursuing, setCurrentlyPursuing] = useState(false);
  const [activeStep, setActiveStep] = useState(0);
  const [newPlace, setNewPlace] = useState('');
  const [newCity, setNewCity] = useState('');

  // State to store form data
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    gender: '',
    instituteName: '',
    duration: '',
    joiningYear: '2020',
    endDate: '2024',
    places: [],
    cities: [],
  });

  const handleChange = (event) => {
    const { name, value, type, checked } = event.target;
    if (type === 'checkbox') {
      // Handle changes for checkbox
      setCurrentlyPursuing(checked);
      // If the checkbox is checked, disable the End Year input field
      // and set the end date to 'Currently Pursuing'
      if (checked) {
        setFormData({ ...formData, endDate: 'Currently Pursuing' });
      } else {
        setFormData({ ...formData, [name]: value });
      }
    } else {
      // Handle changes for other fields
      setFormData({ ...formData, [name]: value });
    }
  };

  // Function to handle step navigation
  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };
  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };
  const handleAddPlaceAndCity = () => {
    if (newPlace && newCity) {
      setFormData({
        ...formData,
        places: [...formData.places, newPlace],
        cities: [...formData.cities, newCity],
      });
      setNewPlace('');
      setNewCity('');
    }
  };

  // Function to validate the form data before proceeding to the next step
  const validateForm = () => {
    const {
      name,
      phone,
      email,
      gender,
      instituteName,
      duration,
      joiningYear,
      endDate,
      places,
      cities,
    } = formData;
    switch (activeStep) {
      case 0:
        return name && phone && email && gender;
      case 1:
        return instituteName && duration && isValid(parseISO(joiningYear)) && endDate;
      case 2:
        return places.length > 0 && cities.length > 0;
      default:
        return false;
    }
  };

  // Function to submit the form data
  const handleSubmit = () => {
    // Do something with the form data (e.g., send it to a server)
    console.log(formData);
  };

  const validationSchema = yup.object({
    email: yup.string('Enter your email').email('Enter a valid email').required('Email is required'),
    name: yup.string('Enter your name').required('Name is required'),
    phone: yup.string('Enter Phone number').required('Phone number is required'),
  });

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <div style={{padding: '10px'}}>
            <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend" className="form-title">
              Personal Details
            </FormLabel>
            <TextField
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              type="text"
              fullWidth
              required
              margin="normal"
              variant="outlined"
              className="input-field"
            />
            <TextField
              label="Phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
              variant="outlined"
              className="input-field"
            />
            <TextField
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              type="email"
              fullWidth
              required
              margin="normal"
              variant="outlined"
              className="input-field"
            />
            <FormLabel component="legend">Gender</FormLabel>
            <RadioGroup aria-label="gender" name="gender" value={formData.gender} onChange={handleChange} row>
              <FormControlLabel value="male" control={<Radio />} label="Male" />
              <FormControlLabel value="female" control={<Radio />} label="Female" />
              <FormControlLabel value="other" control={<Radio />} label="Other" />
            </RadioGroup>
          </FormControl>
          </div>
          
        );
      case 1:
        return (
          <div style={{padding: '10px'}}>
            <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend" className="form-title">
              Education Details
            </FormLabel>
            <TextField
              label="Institute Name"
              name="instituteName"
              value={formData.instituteName}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
              variant="outlined"
              className="input-field"
            />
            <TextField
              label="Duration"
              name="duration"
              value={formData.duration}
              onChange={handleChange}
              fullWidth
              required
              margin="normal"
              variant="outlined"
              className="input-field"
            />
            <TextField
              label="Joining Year"
              name="joiningYear"
              value={formData.joiningYear}
              onChange={handleChange}
              fullWidth
              required
              placeholder="2020"
              helperText="Enter Year"
              error={!isValid(parseISO(formData.joiningYear))}
              margin="normal"
              variant="outlined"
              className="input-field"
            />
            <FormControlLabel
              control={
                <Checkbox checked={currentlyPursuing} onChange={handleChange} name="currentlyPursuing" />
              }
              label="Currently Pursuing"
            />
            <TextField
              label="End Year"
              name="endDate"
              helperText="Enter Year"
              value={formData.endDate}
              onChange={handleChange}
              fullWidth
              required={!currentlyPursuing}
              placeholder="2024"
              error={!isValid(parseISO(formData.endDate)) && !currentlyPursuing}
              disabled={currentlyPursuing}
              margin="normal"
              variant="outlined"
              className="input-field"
            />
          </FormControl>
          </div>
          
        );
      case 2:
        return (
          <div style={{padding: '10px'}}>
            <FormControl component="fieldset" fullWidth>
            <FormLabel component="legend" className="form-title">
              Travel History
            </FormLabel>
            <TextField
              label="Place Name"
              value={newPlace}
              onChange={(e) => setNewPlace(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
              className="input-field"
            />
            <TextField
              label="City"
              value={newCity}
              onChange={(e) => setNewCity(e.target.value)}
              fullWidth
              margin="normal"
              variant="outlined"
              className="input-field"
            />
            <Button variant="contained" color="primary" onClick={handleAddPlaceAndCity} fullWidth className="add-btn">
              Add Place and City
            </Button>
            <Typography variant="h6" className="added-title">Added Places and Cities:</Typography>
            {formData.places.map((place, index) => (
              <Typography key={index} variant="body1" className="added-item">
                Place: {place}, City: {formData.cities[index]}
              </Typography>
            ))}
          </FormControl>
          </div>
          
        );
      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md" className="form-container" style={{padding: '40px'}}>
      <Paper elevation={3} className="form-box">
        <Stepper activeStep={activeStep} alternativeLabel className="stepper" style={{padding: '10px'}}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <div>
          {activeStep === steps.length ? (
            <div>
              <Typography variant="h5" gutterBottom align="center" className="form-title">
                Thank you for submitting the form!
              </Typography>
              <Typography variant="body1" align="center" gutterBottom className="submitted-item">
                Name: {formData.name}
              </Typography>
              <Typography variant="body1" align="center" gutterBottom className="submitted-item">
                Phone: {formData.phone}
              </Typography>
              <Typography variant="body1" align="center" gutterBottom className="submitted-item">
                Email: {formData.email}
              </Typography>
              <Typography variant="body1" align="center" gutterBottom className="submitted-item">
                Gender: {formData.gender}
              </Typography>
              <Typography variant="body1" align="center" gutterBottom className="submitted-item">
                Institute Name: {formData.instituteName}
              </Typography>
              <Typography variant="body1" align="center" gutterBottom className="submitted-item">
                Duration: {formData.duration}
              </Typography>
              <Typography variant="body1" align="center" gutterBottom className="submitted-item">
                Joining Year: {formData.joiningYear}
              </Typography>
              <Typography variant="body1" align="center" gutterBottom className="submitted-item">
                End Date: {formData.endDate}
              </Typography>
              <Typography variant="body1" align="center" gutterBottom className="submitted-item">
                Places: {formData.places.join(', ')}
              </Typography>
              <Typography variant="body1" align="center" gutterBottom className="submitted-item">
                Cities: {formData.cities.join(', ')}
              </Typography>
            </div>
          ) : (
            <div>
              {renderStepContent(activeStep)}
              <div className="button-container" style={{display: 'flex', gap: '20px', padding: '10px'}}>
                <Button disabled={activeStep === 0} onClick={handleBack} variant="outlined" color="primary">
                  Back
                </Button>
                <Button
                  variant="contained"
                  color="secondary"
                  onClick={handleNext}
                  disabled={!validateForm()}
                  className="next-btn"
                >
                  {activeStep === steps.length - 1 ? 'Submit' : 'Next'}
                </Button>
              </div>
            </div>
          )}
        </div>
      </Paper>
    </Container>
  );
};

export default App;
