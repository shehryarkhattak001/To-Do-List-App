import React, { useState } from "react";
import "./signup.css";
import { useGoogleLogin } from "@react-oauth/google";
// import { useNavigate } from "react-router-dom";

const Signup = ({ toggleForm, setToken }) => {
  // const navigate = useNavigate();

  const [signUpForm, setSignUpForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    fullName: "",
  });

  const [backendError, setBackendError] = useState("");
  const [googleLoading, setGoogleLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");

  const signUpFormHandleChange = (key, value) => {
    setSignUpForm({
      ...signUpForm,
      [key]: value,
    });
  };

  const googleSigninHandler = async (authResult) => {
    if (!authResult.code) {
      setBackendError("No authorization code received from Google.");
      return;
    }

    setGoogleLoading(true);
    try {
      const response = await fetch(
        `http://localhost:3000/auth/google?code=${authResult.code}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Google Signin failed");
      }

      localStorage.setItem("token", data.token);
      localStorage.setItem("userName", data.username);
      localStorage.setItem("userProfile", data.userProfile);
      localStorage.setItem("fullName", data.fullName);
      setToken(data.token);

      navigate("/");
    } catch (error) {
      console.log("Google Signin Error:", error);
      setBackendError(
        error.message || "Something went wrong with Google Signin."
      );
    } finally {
      setGoogleLoading(false);
    }
  };

  const googleSignin = useGoogleLogin({
    onSuccess: googleSigninHandler,
    onError: googleSigninHandler,
    flow: "auth-code",
  });

  const submitHandle = async (e) => {
    e.preventDefault();

    let newError = {
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
    };

    if (!signUpForm.fullName.trim()) {
      newError.fullName = "Full name is required";
    }
    if (!signUpForm.email.trim()) {
      newError.email = "Email is required";
    }
    if (!signUpForm.password.trim()) {
      newError.password = "Password is required";
    }
    if (signUpForm.password !== signUpForm.confirmPassword) {
      newError.confirmPassword = "Passwords do not match";
    }

    if (
      newError.email ||
      newError.password ||
      newError.confirmPassword ||
      newError.fullName
    ) {
      setError(newError);
      return;
    }

    setSuccessMessage("");
    setError({
      email: "",
      password: "",
      confirmPassword: "",
      fullName: "",
    });
    setIsLoading(true);

    try {
      const response = await fetch("http://localhost:3000/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(signUpForm),
      });

      const data = await response.json();

      if (!response.ok) {
        if (data.message) {
          setBackendError(data.message);
        }
        return;
      }

      setSuccessMessage("Signup successful! You can now log in.");
      setSignUpForm({
        email: "",
        password: "",
        confirmPassword: "",
        fullName: "",
      });
      toggleForm();
    } catch (error) {
      setError({
        email: "Something went wrong. Please try again later.",
        password: "",
        confirmPassword: "",
        fullName: "",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form className="form" onSubmit={submitHandle}>
      <h2>Sign Up</h2>

      {successMessage && <p className="success">{successMessage}</p>}
      {backendError && <p className="error">{backendError}</p>}

      <input
        type="text"
        className="input"
        placeholder="Full Name"
        value={signUpForm.fullName}
        onChange={(e) => signUpFormHandleChange("fullName", e.target.value)}
      />
      {error.fullName && <p className="error">*{error.fullName}</p>}

      <input
        type="email"
        className="input"
        placeholder="Email"
        value={signUpForm.email}
        onChange={(e) => signUpFormHandleChange("email", e.target.value)}
      />
      {error.email && <p className="error">*{error.email}</p>}

      <input
        type="password"
        className="input"
        placeholder="Password"
        value={signUpForm.password}
        onChange={(e) => signUpFormHandleChange("password", e.target.value)}
      />
      {error.password && <p className="error">*{error.password}</p>}

      <input
        type="password"
        className="input"
        placeholder="Confirm Password"
        value={signUpForm.confirmPassword}
        onChange={(e) =>
          signUpFormHandleChange("confirmPassword", e.target.value)
        }
      />
      {error.confirmPassword && (
        <p className="error">*{error.confirmPassword}</p>
      )}

      <button className="btn" type="submit" disabled={isLoading}>
        {isLoading ? "Signing Up..." : "Sign Up"}
      </button>

      <button
        className="btn google-btn"
        type="button"
        onClick={googleSignin}
        disabled={googleLoading}
      >
        {googleLoading ? "Redirecting..." : "Continue with Google"}
      </button>

      <p>
        Already have an account?{" "}
        <span className="toggle-form" onClick={toggleForm}>
          Login
        </span>
      </p>
    </form>
  );
};

export default Signup;
