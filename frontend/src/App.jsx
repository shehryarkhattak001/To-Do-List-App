import React, { useEffect, useState } from "react";
import "./App.css";
import Login from "./components/Login/Login";
import Signup from "./components/Signup/Signup";
import Form from "./components/Form";
import TodoFilter from "./components/TodoFilter";
import TodoList from "./components/TodoList";
import TodoCard from "./components/TodoCard/TodoCard";
// import TodoCard from "./screens/TodoCard";

const App = () => {
  const [showLogin, setShowLogin] = useState(true);
  const [token, setToken] = useState("");

  useEffect(() => {
    const token = localStorage?.getItem("token");
    if (token) {
      setToken(token);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setToken("");
  };

  return (
    <div className="app-container">
      {token ? (
        <>
          <button onClick={handleLogout} className="btn">
            Logout
          </button>
          <TodoCard />
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
