import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import TodoCard from "./components/TodoCard/TodoCard";
import Settings from "./components/Setting";
import Notifications from "./components/Notification";
import ProfileCard from "./components/ProfileCard";

// Navbar Component
const Navbar = ({ setActiveSection, activeSection, toggleProfileCard }) => {
  return (
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
        <li
          className={activeSection === "notifications" ? "active" : ""}
          onClick={() => setActiveSection("notifications")}
        >
          Notifications
        </li>
        <li onClick={toggleProfileCard} className="profile-button">
          Profile
        </li>
      </ul>
    </nav>
  );
};

// App Component
const App = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [token, setToken] = useState("");
  const [activeSection, setActiveSection] = useState("todoDashboard");
  const [isProfileCardOpen, setIsProfileCardOpen] = useState(false);
  const profileCardRef = useRef(null);

  // Fetch token from localStorage on mount
  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  // Logout function
  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  // Toggle profile card visibility
  const toggleProfileCard = () => {
    setIsProfileCardOpen((prev) => !prev);
  };

  // Close profile card when clicked outside
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

  // Optional: close profile card on section change
  useEffect(() => {
    setIsProfileCardOpen(false);
  }, [activeSection]);

  // Section switcher
  const renderContent = () => {
    switch (activeSection) {
      case "todoDashboard":
        return <TodoCard />;
      case "settings":
        return <Settings />;
      case "notifications":
        return <Notifications />;
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
              />
            </div>
          )}
        </>
      ) : (
        <div className="form-container">
          {showLogin ? (
            <Login toggleForm={() => setShowLogin(false)} setToken={setToken} />
          ) : (
            <Signup toggleForm={() => setShowLogin(true)} />
          )}
        </div>
      )}
    </div>
  );
};

export default App;
