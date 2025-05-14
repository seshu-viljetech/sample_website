import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from "axios";
import toast from "react-hot-toast";

const SignupForm = () => {
  const [userdata, setUserdata] = useState({
    userName: "",
    email: "",
    password: "",
    phone: "",
    city: ""
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
      if (err.response && err.response.data.message === "Email already registered") {
        toast.error("Email already registered");
      } else if (err.response && err.response.data.errors) {
        setErrors(err.response.data.errors);
        console.log(err.response.data.errors);

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
              id="userName"
              placeholder="Enter your name"
              name="userName"
              onChange={getInputdata}
              value={userdata.userName}
            />
            {errors.name && <small className="text-danger">{errors.name}</small>}
          </div>

          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="Enter email"
              name="email"
              onChange={getInputdata}
              value={userdata.email}
            />
            {errors.email && <small className="text-danger">{errors.email}</small>}
          </div>

          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input
              type="password"
              className="form-control"
              id="password"
              placeholder="Password"
              name="password"
              onChange={getInputdata}
              value={userdata.password}
            />
            {errors.password && <small className="text-danger">{errors.password}</small>}
          </div>

          <div className="mb-3">
            <label htmlFor="number" className="form-label">Phone</label>
            <input
              type="number"
              className="form-control"
              id="phone"
              placeholder="Phone"
              name="phone"
              onChange={getInputdata}
              value={userdata.phone}
            />
            {errors.phone && <small className="text-danger">{errors.phone}</small>}
          </div>

          <div className="mb-3">
            <label htmlFor="city" className="form-label">City</label>
            <input
              type="text"
              className="form-control"
              id="city"
              placeholder="city"
              name="city"
              onChange={getInputdata}
              value={userdata.city}
            />
            {errors.city && <small className="text-danger">{errors.city}</small>}
          </div>
          <button type="submit" className="btn btn-success w-100">Submit   </button>

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
