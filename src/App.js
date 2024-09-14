import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [tasks, setTasks] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState({});

  useEffect(() => {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(savedTasks);
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task) {
      const newTask = { id: Date.now(), name: task };
      setTasks([...tasks, newTask]);
      setTask("");
    }
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const editTask = (task) => {
    setIsEditing(true);
    setCurrentTask(task);
    setTask(task.name);
  };

  const updateTask = () => {
    setTasks(
      tasks.map((t) =>
        t.id === currentTask.id ? { ...t, name: task } : t
      )
    );
    setIsEditing(false);
    setTask("");
    setCurrentTask({});
  };

  return (
    <div className="App">
      <h1>Simple CRUD App with LocalStorage</h1>
      <div>
        <input
          type="text"
          placeholder="Add new task..."
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        {isEditing ? (
          <button onClick={updateTask}>Update Task</button>
        ) : (
          <button onClick={addTask}>Add Task</button>
        )}
      </div>
      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            <div className="content">{task.name}</div>
            <div className="actions">
              <button onClick={() => deleteTask(task.id)}>Delete</button>
              <button onClick={() => editTask(task)}>Edit</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
