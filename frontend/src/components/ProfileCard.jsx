import React from "react";
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";
import img from "../assets/shery.jpg";
import "./profileCard.css";

const ProfileCard = ({ handleLogout, setActiveSection }) => {
  return (
    <div className="profile-card-wrapper">
      <div className="top-section">
        <img src={img} alt="Profile" className="profile-image" />
      </div>

      <div className="bottom-section">
        <h2 className="name">Shehryar Khan</h2>
        <h3 className="title">Full Stack Developer</h3>
        <hr className="line" />
        <p className="description">
          I love solving visual problems and building beautiful full-stack web
          apps with modern UI/UX.
        </p>

        <div className="social-icons">
          <a href="#">
            <FaInstagram />
          </a>
          <a href="#">
            <FaTwitter />
          </a>
          <a href="#">
            <FaFacebook />
          </a>
        </div>

        <div className="action-buttons">
          <button
            className="btn-settings"
            onClick={() => setActiveSection("settings")}
          >
            Profile Settings
          </button>
          <button onClick={handleLogout} className="btn-logout">
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
