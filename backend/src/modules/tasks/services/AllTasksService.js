module.exports = class AllTasksService {
  #taskRepository;
  constructor({ taskRepository }) {
    this.#taskRepository = taskRepository;
  }
  async execute() {
    const tasks = await this.#taskRepository.all();
    return tasks;
  }
};
