import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
    const [user, setUser] = useState(null);
    const navigate = useNavigate()

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem("token");
            if (token) {
                try {
                    const response = await axios.get("http://localhost:1234/api/getUser", {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setUser(response.data); // assuming response has { name, email }
                } catch (error) {
                    console.error("Error fetching user:", error);
                }
            }
        };

        fetchUser();
    }, []);

    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/")
    };
    const handleLogin = () => {
        navigate("/")
    }

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary px-4">
            <div className="container-fluid">

                {/* 🔹 Logo or Site Name - Left */}
                <a className="navbar-brand fw-bold fs-4" href="/">
                    Demo
                </a>

                {/* 🔹 Right side: User name + Logout */}
                <div className="d-flex align-items-center ms-auto">
                    {user ? (
                        <>
                            <span className="navbar-text text-white me-3">
                                Hello {user.name}.
                            </span>
                            <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <button className="btn btn-outline-light btn-sm" onClick={handleLogin}>
                            Login
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
