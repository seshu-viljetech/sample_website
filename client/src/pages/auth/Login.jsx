import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from "react-hot-toast"
import axios from 'axios';
import Email from "../../assets/Email.svg"


const LoginForm = () => {
    const [userdata, setUserdata] = useState({ email: "", password: "" })
    const [error, setError] = useState({
        emailerror: "",
        passworderror: ""
    })
    const emailregex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,})+$/
    const passwordRegex = /^(?=.*[A-Z]).{6,}$/;


    const getinputData = (e) => {
        const { name, value } = e.target
        setUserdata({ ...userdata, [name]: value })


        if (name == "email") {
            return setError({ ...error, emailerror: emailregex.test(userdata.email) ? "" : "valid format" })
        }

        if (name == "password") {
            return setError({ ...error, passworderror: passwordRegex.test(userdata.password) ? "" : "password must have at least 6 characters and one uppercase letter" })
        }
    }

    const navigate = useNavigate()


    const handleLogin = async (e) => {
        e.preventDefault();
        console.log(userdata);
        

        if (!userdata.email || !userdata.password) {
            toast.error("Please enter both email and password.");
            return;
        }

        try {
            const response = await axios.post('http://localhost:1234/api/login', userdata);

            // Success Response
            if (response.status === 200) {
                toast.success("Login successful!");
                console.log(response.data.token);
                localStorage.setItem("token", response.data.token)
                navigate("/home")


                // You can redirect to a different page or store the user data in state/context here
            }
        } catch (error) {
            // Error Response
            console.log(error);

            toast.error(error.response?.data?.message || "An error occurred. Please try again.");
        }
    };

    return (
        <div className="container d-flex align-items-center justify-content-center min-vh-100">
            <div className="card shadow p-4" style={{ maxWidth: '400px', width: '100%' }}>
                <h3 className=" login_heading mb-3" >Login</h3>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label email_label"><img src={Email} alt="Email icon"  width="24px" height="24px"/> <span>Email </span><span className='text-danger'>*</span></label>
                        <input type="email" className="form-control" id="email" placeholder="Enter email" name="email" onChange={getinputData} value={userdata.userName} />
                        <small>{error.emailerror}</small>
                    </div>
                    <div className="mb-3">
                        <label htmlFor="password" className="form-label">Password</label>
                        <input type="password" className="form-control" id="password" placeholder="password" autoComplete='currentpassword' name='password' onChange={getinputData} value={userdata.password} />
                        <small>{error.passworderror}</small>
                    </div>
                    <button type="submit" className="btn btn-primary w-100">Login</button>
                    <div className="text-center mt-3">
                        <small>
                            Don't have an account? <Link to="/signup">Sign up</Link>
                        </small>
                    </div>
                </form>
            </div>
        </div>
    );
};

const data=()=>{
    console.log("data");
    
}

export default LoginForm;
