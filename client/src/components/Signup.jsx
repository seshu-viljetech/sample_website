import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import axios from "axios"
import Button from './Button';
import toast from "react-hot-toast";

const SignupForm = () => {
  const [userdata, setUserdata] = useState({
    Name: "",
    Email: "",
    Password: "",
    CnfrmPassword: ""

  })
  const [loading, setLoading] = useState(false)
  const naviagte = useNavigate()
  const getInputdata = (e) => {
    const { name, value } = e.target
    setUserdata({ ...userdata, [name]: value })
  }


  const getSignupData = async (e) => {
    e.preventDefault(); // Prevent the form from reloading the page on submit
    setLoading(true)

    if (!userdata.Name || !userdata.Email || !userdata.Password || !userdata.CnfrmPassword) {
      toast.error("Input fields cannot be Empty");
      setLoading(false)
      return;
    }

    try {
      const res = await axios.post("http://localhost:1234/api/signup", userdata);
      // Handle successful response
      toast.success(res.data.message); // Display success toast
      setLoading(false)
      naviagte("/")
    } catch (err) {
      // Handle error response
      console.error(err);
      setLoading(false)

      if (err.response && err.response.data) {
        toast.error(err.response.data.message); // Display error toast
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
            <input type="text" className="form-control" id="fullname" placeholder="Enter your name"  name="Name" onChange={getInputdata} />
          </div>
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input type="email" className="form-control" id="email" placeholder="Enter email"  name="Email" onChange={getInputdata} autoComplete='username' />
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Password"  name="Password" onChange={getInputdata} autoComplete='new-password' />
          </div>
          <div className="mb-3">
            <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
            <input type="password" className="form-control" id="confirmPassword" placeholder="Confirm password"  name='CnfrmPassword' onChange={getInputdata} autoComplete="new-password" />
          </div>
          <button type="submit" className="btn btn-success w-100" disabled={loading}>Sign Up</button>

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
