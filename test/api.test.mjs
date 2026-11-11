// Exercises the to-do API against an in-memory MongoDB.
// Run with: npm test (downloads a MongoDB binary on first run)
import { MongoMemoryServer } from "mongodb-memory-server";
import { createRequire } from "node:module";
import path from "node:path";
import { fileURLToPath } from "node:url";

const apiDir = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const mongo = await MongoMemoryServer.create();
process.env.MONGODB_URI = mongo.getUri("todo");
process.env.CORS_ORIGIN = "https://organizelist.netlify.app";

const require = createRequire(path.join(apiDir, "package.json"));
const app = require("./src/app.js");
const mongoose = require("mongoose");
const server = app.listen(0);
const base = `http://localhost:${server.address().port}`;

let failures = 0;
async function check(name, method, url, body, expectStatus, extra) {
  const res = await fetch(base + url, {
    method,
    headers: { "Content-Type": "application/json", Origin: "https://organizelist.netlify.app" },
    body: body === undefined ? undefined : typeof body === "string" ? body : JSON.stringify(body),
  });
  const text = await res.text();
  const json = text ? JSON.parse(text) : null;
  const ok = res.status === expectStatus && (!extra || extra(json, res));
  if (!ok) failures++;
  console.log(`${ok ? "PASS" : "FAIL"}  ${name}: ${method} ${url} -> ${res.status} ${text.slice(0, 120)}`);
  return json;
}

await check("health", "GET", "/health", undefined, 200);
await check("empty list", "GET", "/tasks", undefined, 200, (j) => Array.isArray(j) && j.length === 0);
await check("blank title", "POST", "/tasks", { title: "   " }, 400);
await check("missing body", "POST", "/tasks", undefined, 400);
await check("bad json", "POST", "/tasks", "{bad", 400);
await check("too long", "POST", "/tasks", { title: "x".repeat(201) }, 400);
const a = await check("create", "POST", "/tasks", { title: "  Estudar Node  " }, 201, (j) => j.title === "Estudar Node" && j.completed === false);
await check("create 2", "POST", "/tasks", { title: "Segunda" }, 201);
await check("list order", "GET", "/tasks", undefined, 200, (j) => j.length === 2 && j[0].title === "Estudar Node");
await check("toggle", "PATCH", `/tasks/${a._id}`, { completed: true }, 200, (j) => j.completed === true);
await check("rename", "PATCH", `/tasks/${a._id}`, { title: "Estudar Express" }, 200, (j) => j.title === "Estudar Express" && j.completed === true);
await check("bad completed", "PATCH", `/tasks/${a._id}`, { completed: "sim" }, 400);
await check("empty patch", "PATCH", `/tasks/${a._id}`, {}, 400);
await check("invalid id", "PATCH", "/tasks/123", { completed: true }, 400);
await check("missing id", "PATCH", "/tasks/64b7f0000000000000000000", { completed: true }, 404);
await check("delete", "DELETE", `/tasks/${a._id}`, undefined, 204);
await check("delete again", "DELETE", `/tasks/${a._id}`, undefined, 404);
await check("unknown route", "GET", "/nada", undefined, 404);
await check("cors header", "GET", "/tasks", undefined, 200, (_j, res) => res.headers.get("access-control-allow-origin") === "https://organizelist.netlify.app");

server.close();
await mongoose.disconnect();
await mongo.stop();
console.log(failures ? `\n${failures} FAILED` : "\nALL PASSED");
process.exit(failures ? 1 : 0);
