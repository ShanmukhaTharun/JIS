import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import "./index.css";

// Components
import LandingNavbar from "./components/LandingNavbar";

// Auth + Landing pages
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile"; // new Profile page

// Role pages
import Registrar from "./pages/Registrar";
import Judge from "./pages/Judge";
import Lawyer from "./pages/Lawyer";
import Police from "./pages/Police";
import User from "./pages/User";

export default function App() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const images = [
    "https://source.unsplash.com/1600x600/?law,court",
    "https://source.unsplash.com/1600x600/?justice,judge",
    "https://source.unsplash.com/1600x600/?legal,constitution",
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % images.length);
    }, 3000);
    return () => clearInterval(interval);
  }, [images.length]);

  const HomePage = () => (
    <>
      {/* Landing Page Navbar */}
      <LandingNavbar />

      {/* Carousel */}
      <div className="carousel">
        <div
          className="carousel-inner"
          style={{ transform: `translateX(-${currentSlide * 100}%)` }}
        >
          {images.map((img, index) => (
            <div className="carousel-item" key={index}>
              <img src={img} alt={`Slide ${index + 1}`} />
              <div className="carousel-caption">
                <h2>
                  {[
                    "Judicial Transparency",
                    "Access to Justice",
                    "Digital Legal System",
                  ][index]}
                </h2>
                <p>Empowering citizens through digital transformation.</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Feature Cards */}
      <div className="cards">
        <div className="card">
          <h3>Case Tracking</h3>
          <p>Track ongoing and past cases efficiently with our system.</p>
        </div>
        <div className="card">
          <h3>Legal Documents</h3>
          <p>Access verified and updated legal documents anytime.</p>
        </div>
        <div className="card">
          <h3>Online Filing</h3>
          <p>Submit petitions and case filings digitally with ease.</p>
        </div>
      </div>

      {/* Footer */}
      <div className="footer">
        <p>© 2025 Judicial Information System | All Rights Reserved</p>
      </div>
    </>
  );

  return (
    <Router>
      <Routes>
        {/* Landing Page */}
        <Route path="/" element={<HomePage />} />

        {/* Auth Pages */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />

        {/* Profile Page */}
        <Route path="/profile" element={<Profile />} />

        {/* Role Pages */}
        <Route path="/registrar" element={<Registrar />} />
        <Route path="/judge" element={<Judge />} />
        <Route path="/lawyer" element={<Lawyer />} />
        <Route path="/police" element={<Police />} />
        <Route path="/user" element={<User />} />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}
