const { Router } = require("express");
const { listTasks, createTask, updateTask, deleteTask } = require("../controllers/tasksController");

const router = Router();

router.get("/", listTasks);
router.post("/", createTask);
router.patch("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
