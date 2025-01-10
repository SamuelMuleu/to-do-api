const { v4: uuidv4 } = require("uuid");

const todos = [];

const CreateServices = (req, res) => {
  const { title, completed } = req.body;

  if (!title) {
    return res.status(400).json({ error: "O título da tarefa é obrigatório!" });
  }

  const newTodo = {
    id: uuidv4(),
    title: title,
    completed: completed || false,
  };

  todos.push(newTodo);

  return res.status(201).json(newTodo);
};

const getServices = (req, res) => {
  return res.json(todos);
};

const deleteServices = (req, res) => {
  const { id } = req.params;

  const services = todos;
  const servicesIndex = services.findIndex(service => service.id === id );
  if(servicesIndex === -1){
    return res.status(404).json({ message: 'Produto não encontrado' });
  }
  services.splice(servicesIndex,1);
  res.status(200).json({ message: 'Produto excluído com sucesso' });

};

module.exports = { CreateServices, getServices,deleteServices };
