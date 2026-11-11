const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "O título da tarefa é obrigatório."],
      trim: true,
      maxlength: [200, "O título pode ter no máximo 200 caracteres."],
    },
    completed: { type: Boolean, default: false },
  },
  { timestamps: true, versionKey: false }
);

// Keeps the existing "tasks" collection used by the deployed app
module.exports = mongoose.models.task || mongoose.model("task", taskSchema);
