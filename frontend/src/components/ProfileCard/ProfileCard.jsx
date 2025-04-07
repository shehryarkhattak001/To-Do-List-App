import React from "react";
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";
import defaultAvatar from "../../assets/shery.jpg";

import "./ProfileCard.css";

const ProfileCard = ({ handleLogout, setActiveSection, profile, fullName }) => {
  console.log("Profile", profile);
  return (
    <div className="profile-card-wrapper">
      <div className="top-section">
        {profile ? (
          <img
            src={`${profile.trim()}`}
            alt="Profile 12"
            className="profile-image"
          />
        ) : (
          <img src={defaultAvatar} alt="Profile" className="profile-image" />
        )}
      </div>

      <div className="bottom-section">
        <h2 className="name">{fullName ? fullName : "Shehryar Khan"}</h2>
        <h3 className="title">Full Stack Developer</h3>
        <hr className="line" />
        <p className="description">
          I love solving visual problems and building beautiful full-stack web
          apps with modern UI/UX.
        </p>

        <div className="social-icons">
          <a href="#" aria-label="Instagram">
            <FaInstagram />
          </a>
          <a href="#" aria-label="Twitter">
            <FaTwitter />
          </a>
          <a href="#" aria-label="Facebook">
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
