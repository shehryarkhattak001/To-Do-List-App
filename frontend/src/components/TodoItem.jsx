import React, { useState } from "react";
import moment from "moment";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faPen,
  faCheck,
  faSave,
} from "@fortawesome/free-solid-svg-icons";
import "./TodoItem.css";

const TodoItem = ({ todo, fetchTodos }) => {
  const [update, setUpdate] = useState(false);
  const [newName, setNewName] = useState(todo.name);
  const [newDueDate, setNewDueDate] = useState(
    todo.dueDate ? moment(todo.dueDate).format("YYYY-MM-DD") : ""
  );
  const [deleteLoading, setDeleteLoading] = useState(false);
  const [updateLoading, setUpdateLoading] = useState(false);
  const [error, setError] = useState(null);

  const updateHandler = async (todoId, newName, todoCompleted) => {
    setUpdateLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:3000/auth/todos/${todoId}`,
        {
          method: "PUT",
          body: JSON.stringify({
            name: newName,
            dueDate: newDueDate,
            completed: todoCompleted,
          }),
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage?.getItem("token"),
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        await fetchTodos();
        setUpdate(false);
      } else {
        setError(data.message || "Error updating todo.");
      }
    } catch (error) {
      setError("An error occurred while updating the todo.");
    } finally {
      setUpdateLoading(false);
    }
  };

  const deleteHandler = async (todo) => {
    setDeleteLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `http://localhost:3000/auth/todos/${todo.id}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + localStorage?.getItem("token"),
          },
        }
      );
      const data = await response.json();
      if (response.ok) {
        await fetchTodos();
      } else {
        setError(data.message || "Error deleting todo.");
      }
    } catch (error) {
      setError("An error occurred while deleting the todo.");
    } finally {
      setDeleteLoading(false);
    }
  };

  const toggleCompletionHandler = async () => {
    const updatedCompleted = !todo.completed;
    await updateHandler(todo.id, todo.name, updatedCompleted);
  };

  return (
    <div className="todo-item">
      <input
        type="checkbox"
        checked={todo.completed}
        onChange={toggleCompletionHandler}
        className="todo-checkbox"
      />

      <span className={`todo-text ${todo.completed ? "completed" : ""}`}>
        {update ? (
          <>
            <input
              type="text"
              className="todo-input"
              value={newName}
              onChange={(e) => setNewName(e.target.value)}
              placeholder="Update Todo"
            />
            <input
              type="date"
              className="todo-input"
              value={newDueDate}
              onChange={(e) => setNewDueDate(e.target.value)}
              min={moment().format("YYYY-MM-DD")}
            />
          </>
        ) : (
          <>
            <strong>{todo.name}</strong>
            <div className="todo-due-date">
              Due:
              {todo.dueDate
                ? moment(todo.dueDate).format("MMM D, YYYY")
                : "No due date"}
            </div>
          </>
        )}
      </span>

      <div className="todo-buttons">
        <button
          onClick={() =>
            update
              ? updateHandler(todo.id, newName, todo.completed)
              : setUpdate(true)
          }
          className={`todo-button update-btn`}
          disabled={todo.completed || updateLoading}
        >
          {updateLoading ? (
            "..."
          ) : update ? (
            <FontAwesomeIcon icon={faSave} />
          ) : (
            <FontAwesomeIcon icon={faPen} />
          )}
        </button>

        <button
          onClick={() => deleteHandler(todo)}
          className="todo-button delete-btn"
          disabled={deleteLoading}
        >
          {deleteLoading ? "..." : <FontAwesomeIcon icon={faTrash} />}
        </button>

        {!todo.completed && (
          <button
            onClick={toggleCompletionHandler}
            className="todo-button complete-btn"
          >
            <FontAwesomeIcon icon={faCheck} />
          </button>
        )}
      </div>

      {error && <div className="error-message">{error}</div>}
    </div>
  );
};

export default TodoItem;
