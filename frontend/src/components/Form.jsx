import React, { useEffect, useState } from "react";
import { FaPlus, FaEdit } from "react-icons/fa";

const Form = ({ addTodo, isEditTodo, updatedTodos }) => {
  const [todoName, setTodoName] = useState("");

  useEffect(() => {
    if (isEditTodo) {
      setTodoName(isEditTodo.todoName);
    }
  }, [isEditTodo]);

  function submitHandler(e) {
    e.preventDefault();
    if (!todoName.trim()) {
      return;
    }
    if (isEditTodo) {
      updatedTodos({
        ...isEditTodo,
        todoName: todoName,
      });
    } else {
      addTodo({
        id: Math.random(),
        todoName: todoName,
        completed: false,
      });
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
