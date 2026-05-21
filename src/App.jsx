import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [task, setTask] = useState("");
  const [category, setCategory] = useState("Personal");

  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem("tasks");
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (e) => {
    e.preventDefault();
    if (!task.trim()) return;

    const newTask = {
      id: Date.now(),
      text: task,
      category,
      completed: false,
      createdAt: new Date().toLocaleString(),
    };

    setTasks([newTask, ...tasks]);
    setTask("");
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((item) =>
        item.id === id ? { ...item, completed: !item.completed } : item
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((item) => item.id !== id));
  };

  const completedCount = tasks.filter((task) => task.completed).length;
  const progress = tasks.length === 0 ? 0 : (completedCount / tasks.length) * 100;

  return (
    <main className="page">
      <section className="card">
        <div className="top-bar">
          <div>
            <p className="eyebrow">Productivity Dashboard</p>
            <h1>Task Tracker</h1>
            <p className="subtitle">Plan your day, track progress, and stay focused.</p>
          </div>

          <div className="stats">
            <strong>{completedCount}</strong>
            <span>/ {tasks.length} done</span>
          </div>
        </div>

        <form onSubmit={addTask} className="form">
          <input
            type="text"
            placeholder="Enter a task..."
            value={task}
            onChange={(e) => setTask(e.target.value)}
          />

          <select value={category} onChange={(e) => setCategory(e.target.value)}>
            <option>Personal</option>
            <option>Study</option>
            <option>Work</option>
            <option>Urgent</option>
          </select>

          <button type="submit">Add Task</button>
        </form>

        <div className="progress-info">
          <span>Progress</span>
          <span>{Math.round(progress)}%</span>
        </div>

        <div className="progress">
          <div className="progress-bar" style={{ width: `${progress}%` }}></div>
        </div>

        <div className="list">
          {tasks.length === 0 ? (
            <div className="empty">
              <div className="empty-icon">✓</div>
              <h2>No tasks yet</h2>
              <p>Add your first task and start building momentum today.</p>
            </div>
          ) : (
            tasks.map((item) => (
              <div className={`task ${item.completed ? "done" : ""}`} key={item.id}>
                <button className="check" onClick={() => toggleTask(item.id)}>
                  {item.completed ? "✓" : ""}
                </button>

                <div className="task-content">
                  <span>{item.text}</span>
                  <small>{item.createdAt}</small>
                </div>

                <span className={`badge ${item.category.toLowerCase()}`}>
                  {item.category}
                </span>

                <button className="delete" onClick={() => deleteTask(item.id)}>
                  ×
                </button>
              </div>
            ))
          )}
        </div>
      </section>
    </main>
  );
}

export default App;