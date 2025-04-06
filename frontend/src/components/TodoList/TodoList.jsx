import React from "react";
import TodoItem from "../TodoItem/TodoItem";

function TodoList({
  fetchTodos,

  todos,
}) {
  if (todos.length === 0 || !todos) {
    return <p>There is no todos...</p>;
  }
  return (
    <div className="todo-list">
      {todos.map((todo) => (
        <TodoItem key={todo.id} fetchTodos={fetchTodos} todo={todo} />
      ))}
    </div>
  );
}

export default TodoList;
