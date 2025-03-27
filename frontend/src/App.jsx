import React, { useState } from "react";
import Form from "./components/Form";
import TodoList from "./components/TodoList";

const App = () => {
  const [todos, setTodos] = useState([]);
  function addTodo(todo) {
    setTodos([...todos, todo]);
  }

  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function toggleCheckBox(id) {
    setTodos(
      todos.filter((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }
  return (
    <header className="main-header">
      <div className="card">
        <h2 className="title">To-Do List App</h2>
        <Form addTodo={addTodo} />
        <TodoList
          todos={todos}
          deleteTodo={deleteTodo}
          toggleCheckBox={toggleCheckBox}
        />
      </div>
    </header>
  );
};

export default App;
