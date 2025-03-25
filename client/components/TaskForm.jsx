import { useState, useEffect } from "react";
import styles from "./TaskForm.module.css";
import axios from "axios";

const TaskForm = ({ onClose, fetchTasks, existingTask }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
  });

  const token = localStorage.getItem("token");

  useEffect(() => {
    if (existingTask) {
      setForm({
        title: existingTask.title,
        description: existingTask.description,
      });
    }
  }, [existingTask]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (existingTask) {
        await axios.put(`/api/tasks/${existingTask._id}`, form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      } else {
        await axios.post("/api/tasks", form, {
          headers: { Authorization: `Bearer ${token}` },
        });
      }
      fetchTasks();
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.formWrapper}>
        <h2>{existingTask ? "Edit Task" : "Add Task"}</h2>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="text"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            required
          />
          <textarea
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
          />
          <div className={styles.actions}>
            <button type="submit">{existingTask ? "Update" : "Add"}</button>
            <button
              type="button"
              onClick={onClose}
              className={styles.cancelBtn}
            >
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
