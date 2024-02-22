import { useEffect, useState } from "react";
import useTodoStore from "../stores/todoStore";
import { ToDo } from "../stores/todoStore";
import "./todoList.css";

export default function ToDoList() {
  const [title, setTitle] = useState("");

  const { todos, setTodos, toggleComplete, removeTodo, addTodo } = useTodoStore();

  useEffect(() => {
    fetch("https://jsonplaceholder.typicode.com/todos?userId=1")
      .then((response) => response.json())
      .then((json) => setTodos(json));
  }, []);

  function handleToggleComplete(todo: ToDo) {
    toggleComplete(todo);
  }

  const handleAddTodo = () => {
    const todo: ToDo = {
      title,
      completed: false,
      id: Math.random() * 100,
      userId: 1
    };

    setTitle("");
    addTodo(todo);
  };

  return (
    <div>
      <h3>To do </h3>
      {todos.length === 0 && <p>Fetching data</ p >}
      <div>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          placeholder="Add a new todo"
        />
        <button onClick={handleAddTodo} disabled={!title}>
          Add todo
        </button>
      </div>
      <ul>
        {
          todos.map((todo) => (
            <div key={todo.id} className="todos-container" >
              <li
                className={`todo ${todo.completed && "completed"}`}
                onClick={() => handleToggleComplete(todo)}
              >
                {todo.title}
              </li>
              < button className="remove-todo" onClick={() => removeTodo(todo)}>
                Remove
              </button>
            </div>
          ))}
      </ul>
    </div>
  );
}