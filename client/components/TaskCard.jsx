import styles from "./TaskCard.module.css";
import axios from "axios";

const TaskCard = ({ task, onEdit, onDelete }) => {
  const token = localStorage.getItem("token");

  const handleDelete = async () => {
    try {
      await axios.delete(`/api/tasks/${task._id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      onDelete();
    } catch (err) {
      console.error(err);
    }
  };

  const handleToggleComplete = async () => {
    try {
      await axios.put(
        `/api/tasks/${task._id}`,
        {
          completed: !task.completed,
        },
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      onDelete();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className={`${styles.card} ${task.completed ? styles.done : ""}`}>
      <div>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
      </div>
      <div className={styles.actions}>
        <button onClick={handleToggleComplete}>
          {task.completed ? "Undo" : "Done"}
        </button>
        <button onClick={onEdit}>Edit</button>
        <button onClick={handleDelete} className={styles.deleteBtn}>
          Delete
        </button>
      </div>
    </div>
  );
};

export default TaskCard;
