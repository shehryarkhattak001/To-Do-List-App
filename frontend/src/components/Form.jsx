import React, { useState } from "react";

const Form = () => {
  const [todoName, setTodoName] = useState("");

  function submitHandler(e) {
    e.preventDefault();
    if (!todoName) {
      return;
    }
    console.log("The name of todo is:", todoName);
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
