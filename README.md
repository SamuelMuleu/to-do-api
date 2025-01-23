# To-Do List API

Este é um sistema simples de gerenciamento de tarefas (To-Do List), desenvolvido em Node.js e Express. A API permite a criação, listagem, exclusão e atualização de tarefas, com persistência de dados em memória (em um array de objetos).

## Tecnologias Utilizadas

- Node.js
- Express

  
## Instalação

1. Clone o repositório:
   ```bash
   git clone https://github.com/SamuelMuleu/to-do-api.git
   cd todoapi
Instale as dependências:

```bash

npm install
```
Inicie o servidor:

```bash
npm start
O servidor estará rodando em http://localhost:3000.
```

Endpoints
Adicionar Tarefa
```bash
URL: /todos
Método: POST
Corpo da Requisição:
{
    "title": "Nome da Tarefa",
    "completed": false
}
```



Atualizar Tarefa
```bash
URL: /todos/:id
Método: PUT
Corpo da Requisição:
{
    "title": "Título Atualizado",
    "completed": true
}
```

Excluir Tarefa
```bash

URL: /todos/:id
Método: DELETE
```
Estrutura do Projeto
```bash
src
├── controllers
│   └── todoController.js
├── routes
│   └── todoRoutes.js
├── app.js
├── package.json
└── server.js
```
Explicação dos Endpoints:

Adicionar Tarefa (POST /todos): Cria uma nova tarefa com um título e um status de conclusão (opcional). Caso o status não seja informado, será definido como false por padrão.

Listar Tarefas (GET /todos): Retorna todas as tarefas cadastradas.

Excluir Tarefa (DELETE /todos/:id): Remove a tarefa identificada pelo id.

Exemplo de Uso com o Postman
Adicionar Tarefa:

Método: POST
URL: http://localhost:3000/todos
Body (JSON):
```bash
{
  "title": "Nova tarefa",
  "completed": false
}
```
