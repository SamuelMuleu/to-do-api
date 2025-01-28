const { v4: uuidv4 } = require("uuid");

const mongoose = require("mongoose");
require("dotenv").config();

async function main() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    return mongoose.connection;
  } catch (error) {
    console.error("Error connecting to MongoDB:", error);
  }
}

main();

const Tasks = mongoose.model("task", {
  title: String,
  completed: Boolean,
});

const CreateServices = async (req, res) => {
  const { title, completed } = req.body;
  try {
    if (!title) {
      return res
        .status(400)
        .json({ error: "O título da tarefa é obrigatório!" });
    }
    const newTask = new Tasks({
      id: uuidv4(),
      title: title,
      completed: completed,
    });
    await newTask.save();
    return res.status(201).json(newTask);

  } catch {
    res.status(500).json({ error: "Erro ao Criar tarefa" });
  }

};

const getServices = async (req, res) => {
  try {
    const tasks = await Tasks.find();
    return res.json(tasks);
  } catch {
    res.status(500).json({ error: "Erro ao Procurar tarefas" });
  }
};

const deleteServices = async (req, res) => {
  const { id } = req.params;

  try {
    const task = await Tasks.findByIdAndDelete({
      _id:id
    });

    if (!task) {
      return res.status(404).json({ message: "Produto não encontrado" });
    }

    res.status(200).json({ message: "Produto excluído com sucesso" });
  } catch {
    res.status(500).json({ error: "Erro ao excluir tarefa" });
  }
};

module.exports = { CreateServices, getServices, deleteServices };
