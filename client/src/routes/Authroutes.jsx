import { Routes, Route } from "react-router-dom"
import LoginForm from "../components/Login"
import SignupForm from "../components/Signup"
import Home from "../components/Home"
function Authroutes() {
    return (
        <>
            <Routes>
                <Route path="/" element={<LoginForm />} />
                <Route path="/signup" element={<SignupForm />} />
                <Route path="/home" element={<Home />} />
            </Routes>
        </>
    )
}
export default Authroutes