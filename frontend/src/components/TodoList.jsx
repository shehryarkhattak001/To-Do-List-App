import React from "react";

const TodoList = ({ todos, deleteTodo, toggleCheckBox }) => {
  return (
    <>
      {todos.map((todo) => {
        return (
          <div key={todo.id} className="todo-list">
            <input
              type="checkbox"
              onChange={() => toggleCheckBox(todo.id)}
              value={todo.completed}
            />
            <h1>{todo.todoName}</h1>
            <button onClick={() => deleteTodo(todo.id)} className="list-btn">
              Delete
            </button>
          </div>
        );
      })}
    </>
  );
};

export default TodoList;
