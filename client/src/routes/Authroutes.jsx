import { Routes, Route } from "react-router-dom"
import LoginForm from "../pages/auth/Login"
import SignupForm from "../pages/auth/Signup"
import EditUser from "../components/edituser/Edituser"
import { lazy, Suspense } from "react"
import Privateroute from "./Privateroute"
import Pagenotfound from "../pages/pagenotfound/Pagenotfound"


function Authroutes() {

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
                    element={
                        <Privateroute>
                            <EditUser />
                        </Privateroute>
                    }
                />
                <Route path="*" element={<Pagenotfound />} />
            </Routes>
        </>
    )
}
export default Authroutes