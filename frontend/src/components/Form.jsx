import React, { useEffect, useState } from "react";

const Form = ({ addTodo, isEditTodo, updatedTodos }) => {
  const [todoName, setTodoName] = useState("");

  useEffect(() => {
    if (isEditTodo) {
      setTodoName(isEditTodo.todoName);
    }
  }, [isEditTodo]);
  function submitHandler(e) {
    e.preventDefault();
    if (!todoName) {
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
        placeholder={isEditTodo ? "Update a todo" : "Add a new todo"}
        onChange={(e) => {
          setTodoName(e.target.value);
        }}
        value={todoName}
      />
      <button type="submit">{isEditTodo ? "Update Todo" : "Add Todo"}</button>
    </form>
  );
};

export default Form;
