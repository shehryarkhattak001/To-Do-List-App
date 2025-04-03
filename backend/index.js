const express = require("express");
const cors = require("cors");
const { router } = require("./routes/router");
require("dotenv").config();

const app = express();
app.use(express.json());

app.use(cors());

app.use("/auth", router);

app.listen(3000, () => {
  console.log(`server running on port 3000`);
});
