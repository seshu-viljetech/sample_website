import React from "react";
import Navbar from "../../components/Navbar";
import "./Home.css"

const Home = () => {
  const startAction = () => {
    if (!localStorage.getItem("token")) {
      return alert("Please login to continue.");
    }
    console.log("Action started...");
  };

  return (
    <div className="home-page">
      <Navbar />
      
      <div className="container-fluid home-container">
        <div className="row vh-100">
          {/* Left Section: Welcome message */}
          <div className="col-md-6 d-flex flex-column justify-content-center align-items-start text-left">
            <h1 className="display-3 mb-4 text-white">
              Experience the Premium
              <br />
              <span className="text-primary">Power of Innovation</span>
            </h1>
            <p className="lead text-light mb-4">
              Unlock unlimited features, premium content, and much more.
            </p>
            <button className="btn btn-light btn-lg" onClick={startAction}>
              Get Started
            </button>
          </div>

          {/* Right Section: Premium Features Cards */}
          <div className="col-md-6 d-flex justify-content-center align-items-center">
            <div className="premium-cards">
              <div className="card premium-card mb-4 shadow-lg">
                <div className="card-body">
                  <h5 className="card-title">Exclusive Access</h5>
                  <p className="card-text">Get exclusive content only available for premium users.</p>
                </div>
              </div>
              <div className="card premium-card mb-4 shadow-lg">
                <div className="card-body">
                  <h5 className="card-title">Premium Support</h5>
                  <p className="card-text">Enjoy priority support and faster response times.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
