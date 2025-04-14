import React from "react";
import { FaInstagram, FaTwitter, FaFacebook } from "react-icons/fa";
import defaultAvatar from "../../assets/shery.jpg";
import "./ProfileCard.css";

const ProfileCard = ({ handleLogout, setActiveSection, profile }) => {
  const imageUrl = profile?.image || defaultAvatar;
  const fullName = (profile?.firstName || "") + " " + (profile?.lastName || "");
  const title = profile?.title || "Full Stack Developer";
  const bio =
    profile?.bio ||
    "I love solving visual problems and building beautiful full-stack web apps with modern UI/UX.";

  return (
    <div className="profile-card-wrapper">
      <div className="top-section">
        <img src={imageUrl} alt="Profile" className="profile-image" />
      </div>

      <div className="bottom-section">
        <h2 className="name">{fullName.trim() || "Shehryar Khan"}</h2>
        <h3 className="title">{title}</h3>
        <hr className="line" />
        <p className="description">{bio}</p>

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
