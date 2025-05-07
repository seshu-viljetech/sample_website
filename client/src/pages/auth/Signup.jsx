import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";

const SignupForm = () => {
  const [userdata, setUserdata] = useState({
    Name: "",
    Email: "",
    Password: "",
    CnfrmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const getInputdata = (e) => {
    const { name, value } = e.target;
    setUserdata({ ...userdata, [name]: value });
  };

  // Handle form submission
  const getSignupData = async (e) => {
    e.preventDefault(); // Prevent form from reloading the page on submit

    try {
      const res = await axios.post("http://localhost:1234/api/signup", userdata);
      toast.success(res.data.message);
      navigate("/"); // Redirect to the login page
    } catch (err) {
      console.error(err);

      if (err.response && err.response.data.errors) {
        setErrors(err.response.data.errors);
        toast.error("Please fix the validation errors.");
      } else {
        toast.error("An unexpected error occurred");
      }
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
        <h3 className="text-center mb-4">Sign Up</h3>
        <form onSubmit={getSignupData}>
          <div className="mb-3">
            <label htmlFor="fullname" className="form-label">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="fullname"
              placeholder="Enter your name"
              name="Name"
              onChange={getInputdata}
              value={userdata.Name}
            />
            {errors.Name && <small className="text-danger">{errors.Name}</small>}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              name="Email"
              onChange={getInputdata}
              value={userdata.Email}
            />
            {errors.Email && <small className="text-danger">{errors.Email}</small>}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              name="Password"
              onChange={getInputdata}
              value={userdata.Password}
            />
            {errors.Password && <small className="text-danger">{errors.Password}</small>}
          </div>

          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="confirmPassword"
              placeholder="Confirm password"
              name="CnfrmPassword"
              onChange={getInputdata}
              value={userdata.CnfrmPassword}
            />
            {errors.CnfrmPassword && <small className="text-danger">{errors.CnfrmPassword}</small>}
          </div>

          <button type="submit" className="btn btn-success w-100">Submit          </button>

          <div className="text-center mt-3">
            <small>
              Already have an account? <Link to="/">Login</Link>
            </small>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupForm;
