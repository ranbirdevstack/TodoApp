import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addTodo, deleteTodo, markasDone } from "../feature/todo/todoSlice";
import "./Todo.css";

export default function Todo() {
  const [task, setTask] = useState("");
  const todos = useSelector((state) => state.todo?.todos || []);
  const dispatch = useDispatch();

  const handleAdd = () => {
    const trimmed = task.trim();
    if (!trimmed) return;
    dispatch(addTodo(trimmed));
    setTask("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleAdd();
    }
  };

  return (
    <div className="todo-container">
      <h3>Todo List</h3>

      <div className="todo-input">
        <input
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Enter a new todo"
        />
        <button onClick={handleAdd} disabled={!task.trim()}>
          Add
        </button>
      </div>

      {todos.length === 0 ? (
        <p>No todos found</p>
      ) : (
        <ul className="todo-list">
          {todos.map((todo) => (
            <li key={todo.id} className="todo-item">
              <span className={todo.isDone ? "done" : ""}>{todo.task}</span>

              <div>
                {!todo.isDone && (
                  <button onClick={() => dispatch(markasDone(todo.id))}>
                    Done
                  </button>
                )}
                <button
                  className="delete"
                  onClick={() => dispatch(deleteTodo(todo.id))}
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}