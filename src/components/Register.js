import { Button, CircularProgress, Stack, TextField } from "@mui/material";
import { Box } from "@mui/system";
import axios from "axios";
import { useSnackbar } from "notistack";
import React, { useState } from "react";
import { config } from "../App";
import Footer from "./Footer";
import Header from "./Header";
import "./Register.css";
import { useNavigate, Link } from "react-router-dom";

const Register = () => {
  const { enqueueSnackbar } = useSnackbar();


  /**
   * Definition for register handler
   * - Function to be called when the user clicks on the register button or submits the register form
   *
   * @param {{ name: string, password: string, confirmPassword: string }} formData
   *  Object with values of name, password and confirm password user entered to register
   *
   * API endpoint - "POST /auth/register"
   *
   * Example for successful response from backend for the API call:
   * HTTP 201
   * {
   *      "success": true,
   * }
   *
   * Example for failed response from backend for the API call:
   * HTTP 400
   * {
   *      "success": false,
   *      "message": "name is already taken"
   * }
   */
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate()

  const register = async (formData) => {
    if (!validateInput(formData)) return
    try {
      setLoading(true);
      await axios.post(`${config.endpoint}/auth/register`, 
      {
      name: formData.name[0],
      email: formData.email[0],
      password: formData.password[0],
      })
      setLoading(false);
      setFormData({
        name:"",
        email:"",
        password:"",
        confirmPassword:"",
      });
      enqueueSnackbar('Registered successfully', {variant: "success"})
      navigate("/login");
    }
    catch(e) {
      setLoading(false);
      if (e.response && e.response.status === 400) {
        enqueueSnackbar(`${e.response.data.message}`, {variant: "error"})
      } else {
        enqueueSnackbar("Something went wrong. Check that the backend is running, reachable and returns valid JSON.", {variant: "error"})
      }
    };

  }

  /**
   * Validate the input values so that any bad or illegal values are not passed to the backend.
   *
   * @param {{ name: string, password: string, confirmPassword: string }} data
   *  Object with values of name, password and confirm password user entered to register
   *
   * @returns {boolean}
   *    Whether validation has passed or not
   *
   * Return false if any validation condition fails, otherwise return true.
   * (NOTE: The error messages to be shown for each of these cases, are given with them)
   * -    Check that name field is not an empty value - "name is a required field"
   * -    Check that name field is not less than 6 characters in length - "name must be at least 6 characters"
   * -    Check that password field is not an empty value - "Password is a required field"
   * -    Check that password field is not less than 6 characters in length - "Password must be at least 6 characters"
   * -    Check that confirmPassword field has the same value as password field - Passwords do not match
   */
  const validateInput = (data) => {
    if (!data.name) {
      enqueueSnackbar("name is a required field", {variant: "warning"});
      return false;
    }
    if (data.name[0].length < 6) {
      enqueueSnackbar("name must be at least 6 characters", {variant: "warning"});
      return false;
    }
    if (!data.password) {
      enqueueSnackbar("Password is a required field", {variant: "warning"});
      return false;
    }
    if (data.password[0].length < 6) {
      enqueueSnackbar("Password must be at least 6 characters", {variant: "warning"});
      return false;
    }
    if (data.password[0] !== data.confirmPassword[0]) {
      enqueueSnackbar("Passwords do not match", {variant: "warning"});
      return false;
    } else return true
  };

  return (
    <Box
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      minHeight="100vh"
    >
      <Header hasHiddenAuthButtons />
      <Box className="content">
        <Stack spacing={2} className="form">
          <h2 className="title">Register</h2>
          <TextField
            id="name"
            label="Name"
            variant="outlined"
            title="name"
            name="name"
            placeholder="Enter Name"
            fullWidth
            value={formData.name}
            onChange={e => setFormData({...formData, [e.target.name]:[e.target.value]})}
          />
          <TextField
            id="email"
            label="Email"
            variant="outlined"
            title="Email"
            name="email"
            placeholder="Enter Email"
            fullWidth
            value={formData.email}
            onChange={e => setFormData({...formData, [e.target.name]:[e.target.value]})}
          />
          <TextField
            id="password"
            variant="outlined"
            label="Password"
            name="password"
            type="password"
            helperText="Password must be atleast 6 characters length"
            fullWidth
            placeholder="Enter a password with minimum 6 characters"
            value={formData.password}
            onChange={e => setFormData({...formData, [e.target.name]:[e.target.value]})}
          />
          <TextField
            id="confirmPassword"
            variant="outlined"
            label="Confirm Password"
            name="confirmPassword"
            type="password"
            placeholder="Re-Enter your password to confirm"
            fullWidth
            value={formData.confirmPassword}
            onChange={e => setFormData({...formData, [e.target.name]:[e.target.value]})}
          />
          
          {loading ?
            <Box sx={{ display: 'flex'}} id="loading">
              <CircularProgress />
            </Box> :
            <Button className="button" variant="contained" onClick={() =>register(formData)}>
              Register Now
            </Button>
          }
          <p className="secondary-action">
            Already have an account?{" "}
              <Link to="/Login" className="link">Login Here</Link>
          </p>
        </Stack>
      </Box>
      <Footer />
    </Box>
  );
};

export default Register;