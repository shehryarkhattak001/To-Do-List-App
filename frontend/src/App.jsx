import React, { useState } from "react";
import Form from "./components/Form";
import TodoList from "./components/TodoList";
import TodoFilter from "./components/TodoFilter";

const App = () => {
  const [todos, setTodos] = useState([]);
  const [filter, setFilter] = useState("all");
  const [isEditTodo, setIsEditTodo] = useState(null);

  useEffect(() => {
    async function fetchTodos() {
      try {
        const response = await fetch("http://localhost:5000/todos");
        const data = await response.json();
        setTodos(data);
      } catch (error) {
        console.error("error fetching todos", error);
      }
    }
    fetchTodos();
  }, []);

  function addTodo(todo) {
    setTodos([...todos, todo]);
  }

  function deleteTodo(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function toggleCheckBox(id) {
    setTodos(
      todos.map((todo) =>
        todo.id === id ? { ...todo, completed: !todo.completed } : todo
      )
    );
  }

  const filteredTodos = todos.filter((todo) => {
    if (filter === "completed") {
      return todo.completed;
    }
    if (filter === "pending") {
      return !todo.completed;
    }
    return true;
  });

  return (
    <header className="main-header">
      <div className="card">
        <h2 className="title">To-Do List App</h2>
        <Form
          addTodo={addTodo}
          isEditTodo={isEditTodo}
          updatedTodos={(updatedTodo) => {
            setTodos(
              todos.map((todo) =>
                todo.id === updatedTodo.id ? updatedTodo : todo
              )
            );
            setIsEditTodo(null);
          }}
        />
        <TodoFilter setFilter={setFilter} filter={filter} />

        <TodoList
          todos={filteredTodos}
          deleteTodo={deleteTodo}
          toggleCheckBox={toggleCheckBox}
          setIsEditTodo={setIsEditTodo}
        />
      </div>
    </header>
  );
};

export default App;
