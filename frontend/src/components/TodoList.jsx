import React from "react";

const TodoList = ({ todos, deleteTodo, toggleCheckBox, setIsEditTodo }) => {
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
            <div style={{ display: "flex", flexDirection: "row", gap: "20px" }}>
              <button onClick={() => setIsEditTodo(todo)}>Update </button>
              <button onClick={() => deleteTodo(todo.id)} className="list-btn">
                Delete
              </button>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default TodoList;
