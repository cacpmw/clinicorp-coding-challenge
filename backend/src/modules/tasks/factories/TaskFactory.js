const TaskRepository = require("#modules/tasks/repositories/TaskRepository.js");
const AllTasksService = require("#modules/tasks/services/AllTasksService.js");
const StoreTaskService = require("#modules/tasks/services/StoreTaskService.js");

class TaskFactory {
  #taskRepository;
  constructor({ db }) {
    this.#taskRepository = new TaskRepository({ db });
  }

  buildAllTaskService() {
    const allTasksService = new AllTasksService({
      taskRepository: this.#taskRepository,
    });
    return allTasksService;
  }
  buildStoreTaskService() {
    const storeTaskService = new StoreTaskService({
      taskRepository: this.#taskRepository,
    });

    return storeTaskService;
  }
}
module.exports = TaskFactory;
