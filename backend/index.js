require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Sequelize } = require("sequelize");
const db = require("./models");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Backend is running!");
});

app.post("/todos", async (req, res) => {
  try {
    const { todoName, completed } = req.body;
    const newTodo = await db.Todo.create({ todoName, completed, userId: 1 });
    res.status(201).json(newTodo);
  } catch (error) {
    console.error("Error creating todo:", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/todo", async (req, res) => {
  try {
    const todos = await db.Todo.findAll();
    res.json(todos);
  } catch (error) {
    console.error("error fetching todos", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.delete("/todos/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await db.Todo.destroy({ where: { id } });
    if (deleted) {
      res.status(200).json({ message: "Todo deleted successfully" });
    } else {
      res.status(404).json({ error: "Todo not found" });
    }
  } catch (error) {
    console.error("Error deleting todo:", error);
    res.status(500).json({ error: "something went wrong" });
  }
});

const PORT = process.env.PORT || 5000;
db.sequelize.sync().then(() => {
  app.listen(PORT, () => console.log(`server running on port ${PORT}`));
});
