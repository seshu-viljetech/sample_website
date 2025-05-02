import React, { useEffect, useState } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';
import { useNavigate } from "react-router-dom";
import { Dropdown } from 'react-bootstrap'; // Importing Bootstrap Dropdown
import { FaUserCircle } from 'react-icons/fa'; // Font Awesome icon for the logo
import Deletemodel from "./modal/Deletemodal";
import toast from "react-hot-toast";
import Dropdownmenu from "./dropdown/Dropdown";

const Navbar = () => {
    const [user, setUser] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const navigate = useNavigate();

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

    const handleDeleteAccount = async () => {
        try {
            setShowModal(false); // Close the modal first
            const token = localStorage.getItem("token");

            if (token) {
                const res = await axios.delete("http://localhost:1234/api/deleteUser", {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                toast.success(res.data.message || "Account deleted successfully");
                localStorage.removeItem("token");
                setTimeout(() => navigate("/"), 1000);
            }
        } catch (error) {
            console.error("Error deleting account:", error);
            const errorMsg = error.response?.data?.message || "Failed to delete account";
            toast.error(errorMsg);
        }
    };

    const handleLogin = () => {
        navigate("/");
    };


    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
            <div className="container-fluid">
                {/* 🔹 Logo or Site Name - Left */}
                <a className="navbar-brand fw-bold fs-4" href="/">
                    Demo
                </a>

                {/* 🔹 Right side: User logo + Logout */}
                <div className="d-flex align-items-center ms-auto">
                    {user ? (
                        <>
                            {/* Logo (FontAwesome Icon) with Dropdown */}
                            <Dropdownmenu  setShowModal={setShowModal}  Userdata={user}/>
                            <Deletemodel
                                show={showModal}
                                onClose={() => setShowModal(false)}
                                onConfirm={handleDeleteAccount}
                            />

                        </>
                    ) : (
                        <button className="btn btn-outline-light" onClick={handleLogin}>
                            Login
                        </button>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
