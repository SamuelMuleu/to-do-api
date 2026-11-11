const mongoose = require("mongoose");
const Task = require("../models/Task");

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

function validationMessage(error) {
  return Object.values(error.errors)
    .map((e) => e.message)
    .join(" ");
}

async function listTasks(_req, res, next) {
  try {
    const tasks = await Task.find().sort({ createdAt: 1 });
    res.json(tasks);
  } catch (error) {
    next(error);
  }
}

async function createTask(req, res, next) {
  try {
    const { title, completed } = req.body ?? {};
    if (typeof title !== "string" || !title.trim()) {
      return res.status(400).json({ error: "O título da tarefa é obrigatório." });
    }
    const task = await Task.create({ title, completed: completed === true });
    res.status(201).json(task);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({ error: validationMessage(error) });
    }
    next(error);
  }
}

async function updateTask(req, res, next) {
  const { id } = req.params;
  if (!isValidId(id)) return res.status(400).json({ error: "ID de tarefa inválido." });

  const changes = {};
  const { title, completed } = req.body ?? {};
  if (title !== undefined) changes.title = title;
  if (completed !== undefined) {
    if (typeof completed !== "boolean") {
      return res.status(400).json({ error: "O campo completed deve ser true ou false." });
    }
    changes.completed = completed;
  }
  if (!Object.keys(changes).length) {
    return res.status(400).json({ error: "Informe title e/ou completed para atualizar." });
  }

  try {
    const task = await Task.findByIdAndUpdate(id, changes, { new: true, runValidators: true });
    if (!task) return res.status(404).json({ error: "Tarefa não encontrada." });
    res.json(task);
  } catch (error) {
    if (error instanceof mongoose.Error.ValidationError) {
      return res.status(400).json({ error: validationMessage(error) });
    }
    next(error);
  }
}

async function deleteTask(req, res, next) {
  const { id } = req.params;
  if (!isValidId(id)) return res.status(400).json({ error: "ID de tarefa inválido." });
  try {
    const task = await Task.findByIdAndDelete(id);
    if (!task) return res.status(404).json({ error: "Tarefa não encontrada." });
    res.status(204).end();
  } catch (error) {
    next(error);
  }
}

module.exports = { listTasks, createTask, updateTask, deleteTask };
