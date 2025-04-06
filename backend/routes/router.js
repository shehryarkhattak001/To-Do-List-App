const express = require("express");
const router = express();
const AuthenticationController = require("../controllers/authenticationController");
const TodoController = require("../controllers/todoController");
const { authenticate } = require("../middleware/authmiddleware");

router.post("/signup", AuthenticationController.registerUser);
router.post("/login", AuthenticationController.loginUser);
router.put(
  "/change-password",
  authenticate,
  AuthenticationController.changePassword
); // 👈 Added this route

router.post("/todos", authenticate, TodoController.createTodo);
router.get("/todos", authenticate, TodoController.getTodos);
router.put("/todos/:id", authenticate, TodoController.updateTodo);
router.delete("/todos/:id", authenticate, TodoController.deleteTodo);

module.exports = { router };
