const express = require("express");
const cors = require("cors");
const { router } = require("./routes/router");
require("dotenv").config();
const AuthController = require("./controllers/authenticationController");
const { Sequelize } = require("sequelize");
const app = express();
const { Todo } = require("./models");
const { sendWelcomeEmail } = require("./lib/mailTrap");
require("dotenv").config();
app.use(express.json());
const cron = require("node-cron");
app.use(cors());

app.use("/", router);

app.post("/auth", AuthController.googleAuth, AuthController.googleLogin);
app.get("/oauth", AuthController.googleLogin);
app.use("/auth", router);

async function checkOverdueTodos() {
  try {
    const currentTime = new Date();

    const overdueTodos = await Todo.findAll({
      where: {
        dueDate: { [Sequelize.Op.lt]: currentTime },
        completed: false,
      },
    });

    if (overdueTodos.length) {
      console.log(`Found ${overdueTodos.length} overdue tasks`);

      for (const todo of overdueTodos) {
        await sendWelcomeEmail("shehryarkhansk866@gmail.com", todo);
        console.log(`Sent email for overdue todo: ${todo.name}`);
      }
    } else {
      console.log("No overdue tasks found.");
    }

    return overdueTodos;
  } catch (error) {
    console.error("Error checking overdue Todos:", error);
  }
}

// Schedule the cron job to run every minute
const job = cron.schedule("*/1 * * * *", checkOverdueTodos);
job.start();

app.listen(3000, () => {
  console.log(`server running on port 3000`);
});
