const express = require("express");
const cors = require("cors");
const { router } = require("./routes/router");
require("dotenv").config();
const AuthController = require("./controllers/authenticationController");
const app = express();
app.use(express.json());

app.use(cors());

// Authentication routes
app.post("/auth", AuthController.googleAuth, AuthController.googleLogin);
app.get("/oauth", AuthController.googleLogin);
app.use("/auth", router);

app.listen(3000, () => {
  console.log(`server running on port 3000`);
});
