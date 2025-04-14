const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const bcrypt = require("bcryptjs");
const { User } = require("../models");
const axios = require("axios");
const { oauth2Client } = require("../utils/googleConfig");
const authenticate = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization) {
    return res.status(401).json({ error: "Authorization token is required" });
  }

  const token = authorization.split(" ")[1];
  console.log("Token", token);

  if (!token) {
    return res.status(401).json({ error: "Token is missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log("Decoded value", decoded.id);

    req.user = decoded;

    next();
  } catch (error) {
    return res.status(401).json({ error: "Invalid or expired token" });
  }
};

const registerUser = async (req, res) => {
  const { fullName, email, password } = req.body;
  const emailLower = email.toLowerCase();
  const username = fullName.toLowerCase();
  console.log("Email", emailLower, username);

  try {
    const userExists = await User.findOne({ where: { email: emailLower } });

    if (userExists) {
      if (userExists.type === "google") {
        res.status(400).json({
          message:
            "This email is already registered via Google. Please login using Google or reset your password.",
        });
        return;
      }
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await User.create({
      fullName,
      username,
      email: emailLower,
      password,
      userType: "local",
    });

    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const emailLower = email.toLowerCase();

  try {
    const user = await User.findOne({ where: { email: emailLower } });

    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    console.log("User lsadkf;9ozsdjklxc", user);
    const isPasswordValid = await bcrypt.compare(
      password,
      user.dataValues.password
    );
    if (isPasswordValid) {
      const token = jwt.sign(
        { id: user.dataValues.id },
        process.env.JWT_SECRET
      );
      return res.status(200).json({ message: "Login successful", token });
    }
    if (user.userType === "google" && !isPasswordValid) {
      return res.status(400).json({
        message:
          "This account was created using Google. Please login via 'Continue with Google' or reset your password.",
      });
    }

    if (!isPasswordValid) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign({ id: user.dataValues.id }, process.env.JWT_SECRET);
    res.status(200).json({ message: "Login successful", token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Error logging in", error });
  }
};

const googleLogin = async (req, res) => {
  try {
    const { code } = req.query;
    const googleRes = await oauth2Client.getToken(code);
    oauth2Client.setCredentials(googleRes.tokens);

    const userRes = await axios.get(
      `https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=${googleRes.tokens.access_token}`
    );

    const { email, name, picture } = userRes.data;

    let user = await User.findOne({ where: { email } });

    if (!user) {
      const randomPassword = Math.random().toString(36).slice(-8);
      const hashedPassword = await bcrypt.hash(randomPassword, 10);

      user = await User.create({
        email,
        fullName: name,
        username: name.toLowerCase().replace(/\s+/g, "_"),
        userType: "google",
        userProfile: picture,
        password: hashedPassword,
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET);

    res.status(200).json({
      token,
      fullName: user.fullName,
      username: user.username,
      userProfile: user.userProfile,
    });
  } catch (error) {
    console.error("Google login error:", error);
    res.status(500).json({
      error: "Failed to authenticate with Google",
      details: error.message,
    });
  }
};

const changePassword = async (req, res) => {
  const { currentPassword, newPassword } = req.body;
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) return res.status(404).json({ message: "User not found" });

    const valid = await bcrypt.compare(currentPassword, user.password);
    if (!valid)
      return res.status(401).json({ message: "Current password is incorrect" });

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    user.password = hashedPassword;
    await user.save();

    res.json({ message: "Password changed successfully" });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong", error });
  }
};
module.exports = {
  authenticate,
  registerUser,
  loginUser,
  googleLogin,
  changePassword,
};
