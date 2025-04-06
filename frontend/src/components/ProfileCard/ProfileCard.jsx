import React from "react";
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";
import img from "../../assets/shery.jpg";
import "./ProfileCard.css";

const ProfileCard = ({ handleLogout, setActiveSection, profile }) => {
  return (
    <div className="profile-card-wrapper">
      <div className="top-section">
        <img
          src={profile.image || img}
          alt="Profile"
          className="profile-image"
        />
      </div>

      <div className="bottom-section">
        <h2 className="name">
          {profile.firstName} {profile.lastName}
        </h2>
        <h3 className="title">{profile.title || "Full Stack Developer"}</h3>{" "}
        {/* Title */}
        <hr className="line" />
        <p className="description">{profile.bio}</p>
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
