// import React, { useEffect, useState, useRef } from "react";
// import "./App.css";
// import Login from "./components/Login/Login";
// import Signup from "./components/Signup/Signup";
// import TodoCard from "./components/TodoCard/TodoCard";
// import Settings from "./components/Setting";
// import Notifications from "./components/Notification";
// import ProfileCard from "./components/ProfileCard";
// import ChangePassword from "./components/ChangePassword";

// const Navbar = ({ setActiveSection, activeSection, toggleProfileCard }) => {
//   return (
//     <nav className="navbar">
//       <ul className="left-nav">
//         <li
//           className={activeSection === "todoDashboard" ? "active" : ""}
//           onClick={() => setActiveSection("todoDashboard")}
//         >
//           Todo Dashboard
//         </li>
//       </ul>
//       <ul className="right-nav">
//         <li onClick={toggleProfileCard} className="profile-button">
//           Profile
//         </li>
//         <li
//           className={activeSection === "changePassword" ? "active" : ""}
//           // onClick={() => setActiveSection("changePassword")}
//         >
//           Change Password
//         </li>
//       </ul>
//     </nav>
//   );
// };

// const App = () => {
//   const [showLogin, setShowLogin] = useState(true);
//   const [token, setToken] = useState("");
//   const [activeSection, setActiveSection] = useState("todoDashboard");
//   const [isProfileCardOpen, setIsProfileCardOpen] = useState(false);
//   const [profile, setProfile] = useState(() => {
//     const savedProfile = localStorage.getItem("profile");
//     return savedProfile
//       ? JSON.parse(savedProfile)
//       : {
//           image: "../assets/default-avatar.png",
//           firstName: "Shehryar",
//           lastName: "Khan",
//           title: "Full Stack Developer",
//           bio: "I love solving visual problems and building beautiful full-stack web apps with modern UI/UX.",
//         };
//   });

//   const profileCardRef = useRef(null);

//   useEffect(() => {
//     const savedToken = localStorage.getItem("token");
//     if (savedToken) {
//       setToken(savedToken);
//     }
//   }, []);

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     setToken("");
//     localStorage.removeItem("profile");
//   };

//   const toggleProfileCard = () => {
//     setIsProfileCardOpen((prev) => !prev);
//   };

//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (
//         profileCardRef.current &&
//         !profileCardRef.current.contains(event.target)
//       ) {
//         setIsProfileCardOpen(false);
//       }
//     };
//     document.addEventListener("mousedown", handleClickOutside);
//     return () => document.removeEventListener("mousedown", handleClickOutside);
//   }, []);

//   useEffect(() => {
//     setIsProfileCardOpen(false);
//   }, [activeSection]);

//   const renderContent = () => {
//     switch (activeSection) {
//       case "todoDashboard":
//         return <TodoCard />;
//       case "settings":
//         return (
//           <Settings
//             updateProfile={updateProfile}
//             setActiveSection={setActiveSection}
//           />
//         );
//       case "notifications":
//         return <Notifications />;
//       default:
//         return <TodoCard />;
//     }
//   };

//   const updateProfile = (updatedProfile) => {
//     setProfile(updatedProfile);
//     localStorage.setItem("profile", JSON.stringify(updatedProfile)); // Save updated profile to localStorage
//   };

//   return (
//     <div className="app-container">
//       {token ? (
//         <>
//           <Navbar
//             setActiveSection={setActiveSection}
//             activeSection={activeSection}
//             toggleProfileCard={toggleProfileCard}
//           />
//           <div className="content">{renderContent()}</div>
//           {isProfileCardOpen && (
//             <div className="profile-card-container" ref={profileCardRef}>
//               <ProfileCard
//                 handleLogout={handleLogout}
//                 setActiveSection={setActiveSection}
//                 profile={profile}
//               />
//             </div>
//           )}
//         </>
//       ) : (
//         <div className="form-container">
//           {showLogin ? (
//             <Login toggleForm={() => setShowLogin(false)} setToken={setToken} />
//           ) : (
//             <Signup toggleForm={() => setShowLogin(true)} />
//           )}
//         </div>
//       )}
//     </div>
//   );
// };

// export default App;

import React, { useEffect, useState, useRef } from "react";
import "./App.css";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import TodoCard from "./components/TodoCard/TodoCard";
import Settings from "./components/Setting/Setting";
import Notifications from "./components/Notification/Notification";
import ProfileCard from "./components/ProfileCard/ProfileCard";
import ChangePassword from "./components/ChangePassword/ChangePassword"; // ✅

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
        <li onClick={toggleProfileCard} className="profile-button">
          Profile
        </li>
        <li
          className={activeSection === "changePassword" ? "active" : ""}
          onClick={() => setActiveSection("changePassword")} // ✅ Un-commented
        >
          Change Password
        </li>
      </ul>
    </nav>
  );
};

const App = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [token, setToken] = useState("");
  const [activeSection, setActiveSection] = useState("todoDashboard");
  const [isProfileCardOpen, setIsProfileCardOpen] = useState(false);
  const [profile, setProfile] = useState(() => {
    const savedProfile = localStorage.getItem("profile");
    return savedProfile
      ? JSON.parse(savedProfile)
      : {
          image: "../assets/default-avatar.png",
          firstName: "Shehryar",
          lastName: "Khan",
          title: "Full Stack Developer",
          bio: "I love solving visual problems and building beautiful full-stack web apps with modern UI/UX.",
        };
  });

  const profileCardRef = useRef(null);

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
    localStorage.removeItem("profile");
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
    localStorage.setItem("profile", JSON.stringify(updatedProfile));
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
      case "changePassword": // ✅ Added ChangePassword route
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
            <Signup toggleForm={() => setShowLogin(true)} />
          )}
        </div>
      )}
    </div>
  );
};

export default App;
