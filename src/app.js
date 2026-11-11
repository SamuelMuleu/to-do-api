const express = require("express");
const cors = require("cors");
const tasksRoutes = require("./routes/tasks");
const { connectDB } = require("./db");

const app = express();

// CORS_ORIGIN: comma-separated list of allowed front-end origins (default: any)
const origins = process.env.CORS_ORIGIN?.split(",").map((o) => o.trim()).filter(Boolean);
app.use(cors({ origin: origins?.length ? origins : "*" }));
app.use(express.json({ limit: "10kb" }));

app.get("/health", (_req, res) => res.json({ status: "ok" }));

// Make sure the database is connected before handling task requests
app.use("/tasks", async (_req, _res, next) => {
  try {
    await connectDB();
    next();
  } catch (error) {
    next(error);
  }
}, tasksRoutes);

app.use((_req, res) => res.status(404).json({ error: "Rota não encontrada." }));

// eslint-disable-next-line no-unused-vars
app.use((error, _req, res, _next) => {
  if (error.type === "entity.parse.failed") {
    return res.status(400).json({ error: "JSON inválido no corpo da requisição." });
  }
  console.error(error);
  res.status(500).json({ error: "Erro interno no servidor." });
});

module.exports = app;
