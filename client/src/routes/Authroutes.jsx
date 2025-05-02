import { Routes, Route, Navigate } from "react-router-dom"
import LoginForm from "../pages/auth/Login"
import SignupForm from "../pages/auth/Signup"
import EditUser from "../components/edituser/Edituser"
import { lazy, Suspense } from "react"
function Authroutes() {

    const isAuthenticated = () => {
        const token = localStorage.getItem("token");
        return token !== null;  // Return true if token exists
    };

    const Home = lazy(() => import("../pages/home/Home"));
    return (
        <>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/signup" element={<SignupForm />} />
                <Route path="/home" element={
                    <Suspense fallback={<div>Loading</div>}><Home /></Suspense>} />
                <Route
                    path="/edituser"
                    element={isAuthenticated() ? <EditUser /> : <Navigate to="/" />}
                />

            </Routes>
        </>
    )
}
export default Authroutes