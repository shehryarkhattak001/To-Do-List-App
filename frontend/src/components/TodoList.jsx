import React from "react";

const TodoList = ({ todos, deleteTodo, toggleCheckBox }) => {
  console.log("Todos", todos);
  if (todos.length === 0) {
    return (
      <div>
        <h3>No todos</h3>
      </div>
    );
  }
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {todos.map((todo) => {
        return (
          <div key={todo.id} className="todo-list">
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => toggleCheckBox(todo.id)}
            />
            <h4 className={`${todo.completed && "todoName"}`}>
              {todo.todoName}
            </h4>
            <button onClick={() => setUpdate(true)}>Update </button>
            <button onClick={() => deleteTodo(todo.id)} className="list-btn">
              Delete
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default TodoList;
