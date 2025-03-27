import React from "react";

const TodoFilter = ({ setFilter, filter }) => {
  const baseStyle = {
    padding: "10px",
    border: "none",
    borderRadius: "5px",
    background: "yellow",
    cursor: "pointer",
    margin: "5px",
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
      }}
    >
      <button
        onClick={() => setFilter("all")}
        style={{
          ...baseStyle,
          background: filter === "all" ? "red" : "yellow",
        }}
      >
        All
      </button>
      <button
        onClick={() => setFilter("pending")}
        style={{
          ...baseStyle,
          background: filter === "pending" ? "red" : "yellow",
        }}
      >
        Pending
      </button>
      <button
        onClick={() => setFilter("completed")}
        style={{
          ...baseStyle,
          background: filter === "completed" ? "red" : "yellow",
        }}
      >
        Completed
      </button>
    </div>
  );
};

export default TodoFilter;
