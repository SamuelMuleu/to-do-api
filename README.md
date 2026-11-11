# To-Do API

API REST de tarefas em **Node.js + Express + MongoDB (Mongoose)**, usada pelo front-end [toDo](https://github.com/SamuelMuleu/toDo).

## Endpoints

| Método | Rota | Corpo | Resposta |
| --- | --- | --- | --- |
| `GET` | `/health` | — | `200 { "status": "ok" }` |
| `GET` | `/tasks` | — | `200` lista de tarefas (mais antigas primeiro) |
| `POST` | `/tasks` | `{ "title": "Estudar", "completed": false }` | `201` tarefa criada |
| `PATCH` | `/tasks/:id` | `{ "completed": true }` e/ou `{ "title": "..." }` | `200` tarefa atualizada |
| `DELETE` | `/tasks/:id` | — | `204` |

Tarefa: `{ "_id", "title", "completed", "createdAt", "updatedAt" }`

Erros retornam `{ "error": "mensagem" }` com o status adequado: `400` (título vazio ou com mais de 200 caracteres, `completed` não booleano, ID inválido, JSON malformado), `404` (tarefa ou rota inexistente) e `500`.

## Rodando localmente

```bash
cp .env.example .env   # preencha MONGODB_URI
npm install
npm run dev            # http://localhost:3001
npm test               # testes de integração com MongoDB em memória
```

### Variáveis de ambiente

| Variável | Obrigatória | Descrição |
| --- | --- | --- |
| `MONGODB_URI` | sim | String de conexão do MongoDB Atlas |
| `PORT` | não | Porta local (padrão `3001`) |
| `CORS_ORIGIN` | não | Origens permitidas, separadas por vírgula (padrão: todas) |

## Deploy

- **Vercel**: importe o repositório; `vercel.json` encaminha todas as rotas para `api/index.js` (função serverless). Defina `MONGODB_URI` e `CORS_ORIGIN` nas variáveis de ambiente.
- **Render / Railway / VPS**: comando de start `npm start`.

## Estrutura

```
api/index.js                  # entrada serverless (Vercel)
src/app.js                    # app Express (CORS, JSON, rotas, erros)
src/server.js                 # entrada local / servidor tradicional
src/db.js                     # conexão reaproveitada com o MongoDB
src/models/Task.js            # schema com validação
src/controllers/tasksController.js
src/routes/tasks.js
test/api.test.mjs
```
