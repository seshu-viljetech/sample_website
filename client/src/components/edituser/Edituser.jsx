import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';

const EditUser = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        old_password: "",
        password: '',
    });
    const [loading, setLoading] = useState(true);
    const [changePassword,setChangepassowrd]=useState(false)
    const navigate = useNavigate();

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('token');
            if (token) {
                try {
                    const response = await axios.get('http://localhost:1234/api/getUser', {
                        headers: {
                            Authorization: `Bearer ${token}`,
                        },
                    });
                    setUser(response.data);
                } catch (err) {
                    alert('Error fetching user data');
                }
            }
        };

        fetchUser();
    }, []);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUser({ ...user, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const token = localStorage.getItem('token');
        if (!token) return;

        try {
            const res = await axios.put(
                'http://localhost:1234/api/updateUser',
                user,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );
            toast.success(res.data.message || 'User updated!');
            setTimeout(() => navigate('/home'), 1000);

        } catch (err) {
            const errorMessage =
                err.response?.data?.message || 'Error updating user data';
            toast.error(errorMessage);
        }
    };



    return (
        <div className="container mt-5 d-flex  flex-column justify-content-center align-items-center" style={{ height: "100vh" }}>
            <div className="card shadow p-4" style={{ maxWidth: '550px', width: '100%' }}>
                <h2>Edit User</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-3">
                        <label htmlFor="name" className="form-label">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            name="name"
                            value={user.name || ""}
                            onChange={handleInputChange}
                            required
                        />
                    </div>

                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Email</label>
                        <input
                            type="email"
                            className="form-control"
                            id="email"
                            name="email"
                            value={user.email || ""}
                            autoComplete="email"
                            onChange={handleInputChange}
                            disabled
                        />
                    </div>
                    { changePassword && 
                        <> 
                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">Old Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="old_password"
                                    name="old_password"
                                    value={user.old_password || ""}

                                    autoComplete="current-passowrd"
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>

                            <div className="mb-3">
                                <label htmlFor="password" className="form-label">New Password</label>
                                <input
                                    type="password"
                                    className="form-control"
                                    id="password"
                                    name="password"
                                    value={user.password || ""}
                                    autoComplete="current-passowrd"
                                    onChange={handleInputChange}
                                    required
                                />
                            </div>
                        </>

                    }
                    {!changePassword && <button onClick={()=>{setChangepassowrd(true)}} className='btn btn-primary me-2'>Change Password</button>}

                    <button type="submit" className="btn btn-primary">
                        Save Changes
                    </button>
                    <button type="submit" className="btn btn-primary ms-2" onClick={() => { navigate("/home") }}>
                        Cancel
                    </button>
                </form>
            </div>
        </div>
    );
};

export default EditUser;
