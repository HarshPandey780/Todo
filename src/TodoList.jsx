import React, { useState } from "react";
import './TodoList.css'; // Import the CSS file

const TodoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editId, setEditId] = useState(null);
  const [editTask, setEditTask] = useState("");

  // Add a new task
  const addTask = () => {
    if (newTask.trim() !== "") {
      setTasks([...tasks, { id: Date.now(), text: newTask }]);
      setNewTask("");
    }
  };

  // Delete a task
  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Start editing a task
  const startEdit = (id, text) => {
    setEditId(id);
    setEditTask(text);
  };

  // Save the edited task
  const saveTask = () => {
    setTasks(
      tasks.map((task) => (task.id === editId ? { ...task, text: editTask } : task))
    );
    setEditId(null);
    setEditTask("");
  };

  return (
    <div className="todo-container">
      <h2>TODO List</h2>

      <div className="todo-input">
        <input
          type="text"
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
          placeholder="Add a new task"
        />
        <button onClick={addTask}>Add</button>
      </div>

      <ul>
        {tasks.map((task) => (
          <li key={task.id}>
            {editId === task.id ? (
              <>
                <input
                  type="text"
                  value={editTask}
                  onChange={(e) => setEditTask(e.target.value)}
                />
                <button onClick={saveTask}>Save</button>
              </>
            ) : (
              <>
                <span>{task.text}</span>
                <button className="edit-btn" onClick={() => startEdit(task.id, task.text)}>Edit</button>
                <button className="delete-btn" onClick={() => deleteTask(task.id)}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TodoList;
