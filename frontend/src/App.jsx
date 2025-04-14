import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import TodoCard from "./components/TodoCard/TodoCard";
import Settings from "./components/Setting/Setting";
import Notifications from "./components/Notification/Notification";
import ProfileCard from "./components/ProfileCard/ProfileCard";
import ChangePassword from "./components/ChangePassword/ChangePassword";

const Navbar = ({ setActiveSection, activeSection, toggleProfileCard }) => (
  <nav className="navbar">
    <ul className="left-nav">
      <li
        className={activeSection === "todoDashboard" ? "active" : ""}
        onClick={() => setActiveSection("todoDashboard")}
      >
        Todo Dashboard
      </li>
    </ul>
    <ul className="right-nav">
      <li onClick={toggleProfileCard} className="profile-button">
        Profile
      </li>
      <li
        className={activeSection === "changePassword" ? "active" : ""}
        onClick={() => setActiveSection("changePassword")}
      >
        Change Password
      </li>
    </ul>
  </nav>
);

const App = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [token, setToken] = useState("");
  const [activeSection, setActiveSection] = useState("todoDashboard");
  const [isProfileCardOpen, setIsProfileCardOpen] = useState(false);

  const [profile, setProfile] = useState({});
  const profileCardRef = useRef(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const storedProfile = localStorage.getItem("userProfile");

    if (savedToken) {
      setToken(savedToken);
      setProfile(JSON.parse(storedProfile) || {});
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userProfile");
    setToken("");
    setProfile({});
  };

  const toggleProfileCard = () => {
    setIsProfileCardOpen((prev) => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        profileCardRef.current &&
        !profileCardRef.current.contains(event.target)
      ) {
        setIsProfileCardOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    setIsProfileCardOpen(false);
  }, [activeSection]);

  const updateProfile = (updatedProfile) => {
    setProfile(updatedProfile);
    localStorage.setItem("userProfile", JSON.stringify(updatedProfile));
  };

  const renderContent = () => {
    switch (activeSection) {
      case "todoDashboard":
        return <TodoCard />;
      case "settings":
        return (
          <Settings
            updateProfile={updateProfile}
            setActiveSection={setActiveSection}
          />
        );
      case "notifications":
        return <Notifications />;
      case "changePassword":
        return <ChangePassword />;
      default:
        return <TodoCard />;
    }
  };

  return (
    <div className="app-container">
      {token ? (
        <>
          <Navbar
            setActiveSection={setActiveSection}
            activeSection={activeSection}
            toggleProfileCard={toggleProfileCard}
          />
          <div className="content">{renderContent()}</div>
          {isProfileCardOpen && (
            <div className="profile-card-container" ref={profileCardRef}>
              <ProfileCard
                handleLogout={handleLogout}
                setActiveSection={setActiveSection}
                profile={profile}
              />
            </div>
          )}
        </>
      ) : (
        <div className="form-container">
          {showLogin ? (
            <Login toggleForm={() => setShowLogin(false)} setToken={setToken} />
          ) : (
            <Signup toggleForm={() => setShowLogin(true)} setToken={setToken} />
          )}
        </div>
      )}
    </div>
  );
};

export default App;
