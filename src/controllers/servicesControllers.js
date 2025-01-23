const { v4: uuidv4 } = require("uuid");

const mongoose = require("mongoose");

async function main() {
  await mongoose.connect(
    "mongodb+srv://samuelmuleu:Aurora2@cluster0.7fvba.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  );
}
main().catch((err) => console.log(err));
const Taks = mongoose.model("task", {
  title: String,
  completed: Boolean,
});

const CreateServices = async (req, res) => {
  const { title, completed } = req.body;

  if (!title) {
    return res.status(400).json({ error: "O título da tarefa é obrigatório!" });
  }

  const newTask = new Taks({
    id: uuidv4(),
    title: title,
    completed: completed,
  });

  await newTask.save();
  res.send(newTask);

  return res.status(201).json(newTask);
};

const getServices = async(req, res) => {
  const tasks = await Taks.find()
   return  res.json(tasks);
   
};

const deleteServices = (req, res) => {
  const { id } = req.params;

  const services = Taks;
  const servicesIndex = services.findIndex((service) => service.id === id);
  if (servicesIndex === -1) {
    return res.status(404).json({ message: "Produto não encontrado" });
  }
  services.splice(servicesIndex, 1);
  res.status(200).json({ message: "Produto excluído com sucesso" });
};

module.exports = { CreateServices, getServices, deleteServices };
