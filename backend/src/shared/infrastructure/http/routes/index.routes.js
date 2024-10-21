const { Router } = require("express");
const TaskController = require("#modules/tasks/infraestructure/http/controllers/TaskController.js");
const {
  zodNewTaskValidatorMiddleware,
} = require("#modules/tasks/middlewares/zodMiddleware.js");

const router = Router();

const taskController = new TaskController();

router.get("/", (req, res) => {
  return res.status(200).json({
    message: "Hello World",
  });
});

router.get("/get-tasks", taskController.index);

router.post(
  "/insert-tasks",
  zodNewTaskValidatorMiddleware(),
  taskController.store,
);

module.exports = router;
