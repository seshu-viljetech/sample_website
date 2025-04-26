import React from "react";
import Navbar from "../components/Navbar"; 


const Home = () => {
    const startChatting=()=>{
        if(!localStorage.getItem("token")){
            return alert("Please login")
        }

        
        
    }
  return (
    <div>
      {/* Top Navbar */}
      <Navbar />
      {/* Page Content */}
      <div className="container mt-5 text-center">
        <h1 className="display-5 mb-3">Welcome to ChatZone 💬</h1>
        <p className="lead text-muted">
          Connect and chat with your friends in real-time.  
        </p>
        <hr className="my-4" />
        <p>Click a chat to start a conversation. More features coming soon!</p>

        {/* Optional button */}
        <button className="btn btn-primary mt-3" onClick={startChatting}>Start Chatting</button>
      </div>
    </div>
  );
};

export default Home;
