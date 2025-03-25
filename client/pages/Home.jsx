import { useEffect, useState } from "react";
import styles from "./Home.module.css";
import TaskCard from "../components/TaskCard";
import TaskForm from "../components/TaskForm";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Home = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [showForm, setShowForm] = useState(false);
  const [editTask, setEditTask] = useState(null);
  const user = JSON.parse(localStorage.getItem("user")); // ✅ Get user

  const fetchTasks = async () => {
    try {
      const res = await axios.get("/api/tasks", {
        headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
      });
      setTasks(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  useEffect(() => {
    fetchTasks();
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.topbar}>
        <button className={styles.logoutBtn} onClick={handleLogout}>
          Logout
        </button>
        <span className={styles.userText}>Welcome, {user?.name || "User"}</span>
      </div>

      <button
        className={styles.addBtn}
        onClick={() => {
          setEditTask(null);
          setShowForm(true);
        }}
      >
        + Add Task
      </button>

      <div className={styles.taskList}>
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            onEdit={() => {
              setEditTask(task);
              setShowForm(true);
            }}
            onDelete={fetchTasks}
          />
        ))}
      </div>

      {showForm && (
        <TaskForm
          fetchTasks={fetchTasks}
          onClose={() => setShowForm(false)}
          existingTask={editTask}
        />
      )}
    </div>
  );
};

export default Home;
