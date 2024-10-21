//const StoreTasksService = require("#modules/tasks/services/StoreTasksService.js");
const StatusCode = require("#shared/infrastructure/http/statusCodes.js");
const db = require("#configs/firebase.js");
const TaskFactory = require("#modules/tasks/factories/TaskFactory.js");
module.exports = class TaskController {
  async index(_request, response) {
    let tasks;

    const allTasksService = new TaskFactory({ db }).buildAllTaskService();

    tasks = await allTasksService.execute();

    return response.status(StatusCode.Ok).json(tasks);
  }
  async store(request, response) {
    const payload = request.body;

    const storeTasksService = new TaskFactory({ db }).buildStoreTaskService();
    await storeTasksService.execute(payload);

    return response.status(StatusCode.Created).send();
  }
};
