const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
dotenv.config();
const { OAuth2Client } = require("google-auth-library");
const bcrypt = require("bcryptjs");
const { User } = require("../models");
const fetch = require("node-fetch");
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
  const { username, email, password } = req.body;

  try {
    const userExists = await User.findOne({ where: { email } });

    if (userExists) {
      return res.status(400).json({ message: "User already exists" });
    }

    const newUser = await User.create({ username, email, password });
    res
      .status(201)
      .json({ message: "User registered successfully", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};
function googleAuth(req, res, next) {
  res.header("Access-Control-Allow-Origin", "http://localhost:5173");
  res.header("Referer-Policy", "no-referrer-when-downgrade");

  const redirectUrl = "http://127.0.0.1:3000/oauth";

  const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    redirectUrl
  );

  const authorizeUrl = oAuth2Client.generateAuthUrl({
    access_type: "offline",
    scope: "https://www.googleapis.com/auth/userinfo.profile openid",
    prompt: "consent",
  });
  req.url = authorizeUrl;
  next();
}
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(
      password,
      user.dataValues.password
    );

    console.log("ISPASSWORD", isPasswordValid);

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
  if (req.method === "POST") {
    console.log("Post wala method");
    console.log("Request", req.url);
    return res.json({ url: req.url });
  }

  const code = req.query.code;
  if (!code) {
    return res.status(400).json({ error: "Missing authorization code" });
  }
  const oAuth2Client = new OAuth2Client(
    process.env.CLIENT_ID,
    process.env.CLIENT_SECRET,
    "http://127.0.0.1:3000/oauth"
  );

  try {
    const { tokens } = await oAuth2Client.getToken(code);
    req.tokens = tokens;

    await oAuth2Client.setCredentials(res.tokens);
    console.log("Tokens acquired");

    const user = oAuth2Client.credentials;
    console.log("Credentials", user);

    const userData = await fetchUserData(tokens.access_token);

    res.json({ user: userData });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Failed to authenticate with Google", details: error });
  }
};

const fetchUserData = async (access_token) => {
  const response = await fetch(
    `    https://www.googleapis.com/oauth2/v3/userinfo?access_token=${access_token}
`
  );

  if (!response.ok) {
    throw new Error("Failed to fetch user data from Google");
  }

  const userData = await response.json();
  return userData;
};
module.exports = {
  authenticate,
  registerUser,
  loginUser,
  googleAuth,
  googleLogin,
};
