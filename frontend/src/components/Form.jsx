import React, { useState } from "react";

const Form = ({ addTodo }) => {
  const [todoName, setTodoName] = useState("");

  function submitHandler(e) {
    e.preventDefault();
    if (!todoName) {
      return;
    }
    addTodo({
      id: Math.random(),
      todoName: todoName,
      completed: false,
    });
    setTodoName("");
  }
  return (
    <form className="form-todo" onSubmit={submitHandler}>
      <input
        type="text"
        placeholder="Add a new todo"
        onChange={(e) => {
          setTodoName(e.target.value);
        }}
        value={todoName}
      />
      <button type="submit">Add Todo</button>
    </form>
  );
};

export default Form;
