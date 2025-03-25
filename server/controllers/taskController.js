import Task from '../models/Task.js';

export const getTasks = async (req, res) => {
  const tasks = await Task.find({ user: req.user._id }).sort('-createdAt');
  res.json(tasks);
};

export const getTask = async (req, res) => {
  const task = await Task.findOne({ _id: req.params.id, user: req.user._id });
  if (!task) return res.status(404).json({ message: 'Task not found' });
  res.json(task);
};

export const createTask = async (req, res) => {
  const { title, description } = req.body;
  const task = await Task.create({ title, description, user: req.user._id });
  res.status(201).json(task);
};

export const updateTask = async (req, res) => {
  const task = await Task.findOneAndUpdate(
    { _id: req.params.id, user: req.user._id },
    req.body,
    { new: true }
  );
  if (!task) return res.status(404).json({ message: 'Task not found or unauthorized' });
  res.json(task);
};

export const deleteTask = async (req, res) => {
  const task = await Task.findOneAndDelete({ _id: req.params.id, user: req.user._id });
  if (!task) return res.status(404).json({ message: 'Task not found or unauthorized' });
  res.json({ message: 'Task deleted' });
};
