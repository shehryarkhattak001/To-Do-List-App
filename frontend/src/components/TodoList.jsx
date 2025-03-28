import React from "react";
import { FaCheck, FaTrash } from "react-icons/fa";

const TodoList = ({ todos, deleteTodo, toggleCheckBox, setIsEditTodo }) => {
  console.log("Todos", todos);
  if (todos.length === 0) {
    return (
      <div className="empty-state">
        <h3>No todos yet! 💫</h3>
      </div>
    );
  }

  async function handleDelete(id) {
    try {
      const response = await fetch(`http://localhost:5000/todos/${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        deleteTodo(id);
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    }
  }
  return (
    <div className="todo-container">
      {todos.map((todo) => (
        <div key={todo.id} className="todo">
          <input
            type="checkbox"
            checked={todo.completed}
            onChange={() => toggleCheckBox(todo.id)}
            className="todo-checkbox"
          />

          <span className={`todo-text ${todo.completed ? "completed" : ""}`}>
            {todo.todoName}
          </span>

          <button className="update-btn" onClick={() => setIsEditTodo(todo)}>
            <FaCheck />
          </button>

          <button className="trash-btn" onClick={() => handleDelete(todo.id)}>
            <FaTrash />
          </button>
        </div>
      ))}
    </div>
  );
};

export default TodoList;
