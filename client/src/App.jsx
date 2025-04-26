import { Toaster } from "react-hot-toast"
import LoginForm from "./components/Login"
import Authroutes from "./routes/Authroutes"

function App() {
  return (
    <>
      <Toaster  />
      <Authroutes />
    </>
  )
}
export default App