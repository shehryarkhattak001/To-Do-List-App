import React, { useEffect, useState } from "react";
import { FaPlus, FaEdit } from "react-icons/fa";

const Form = ({ addTodo, isEditTodo, updatedTodos }) => {
  const [todoName, setTodoName] = useState("");

  useEffect(() => {
    if (isEditTodo) {
      setTodoName(isEditTodo.todoName);
    }
  }, [isEditTodo]);

  async function submitHandler(e) {
    e.preventDefault();
    if (!todoName.trim()) {
      return;
    }

    if (isEditTodo) {
      try {
        const response = await fetch(
          `http://localhost:5000/todos/${isEditTodo.id}`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ todoName }),
          }
        );

        if (response.ok) {
          const updatedTodo = await response.json();
          updatedTodos(updatedTodo);
        }
      } catch (error) {
        console.log("error updating todo", error);
      }
    } else {
      addTodo({ id: Math.random(), todoName, completed: false });
    }
    setTodoName("");
  }
  return (
    <form className="form-todo" onSubmit={submitHandler}>
      <input
        type="text"
        className="todo-input"
        placeholder={isEditTodo ? "Update a todo..." : "Add a new todo..."}
        onChange={(e) => {
          setTodoName(e.target.value);
        }}
        value={todoName}
      />
      <button type="submit" className="todo-btn">
        {isEditTodo ? <FaEdit /> : <FaPlus />}
      </button>
    </form>
  );
};

export default Form;
