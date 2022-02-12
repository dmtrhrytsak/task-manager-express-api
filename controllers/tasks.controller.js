const Task = require('../models/Task.model');
const asyncWrapper = require('../middlewares/async.middleware');
const { createCustomError } = require('../errors/custom-error');

const getAllTasks = asyncWrapper(async (req, res) => {
  const allTasks = await Task.find({});

  res.status(200).json({ tasks: allTasks });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const { id: taskId } = req.params;
  const task = await Task.findById(taskId);

  if (!task) {
    return next(
      createCustomError(`Task with id: ${taskId} doesn't exist`, 404)
    );
  }

  res.status(200).json({ task });
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);

  res.status(201).json({ task });
});

const updateTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;
  const data = req.body;

  const task = await Task.findByIdAndUpdate(taskId, data, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return next(
      createCustomError(`Task with id: ${taskId} doesn't exist`, 404)
    );
  }

  res.status(200).json({ task });
});

const deleteTask = asyncWrapper(async (req, res) => {
  const { id: taskId } = req.params;
  const deletedTask = await Task.findByIdAndDelete(taskId);

  if (!deletedTask) {
    return next(
      createCustomError(`Task with id: ${taskId} doesn't exist`, 404)
    );
  }

  res.status(200).json({ task: deletedTask });
});

module.exports = {
  getAllTasks,
  getTask,
  createTask,
  updateTask,
  deleteTask,
};
