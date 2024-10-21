module.exports = class StoreTaskService {
  #taskRepository;
  constructor({ taskRepository }) {
    this.#taskRepository = taskRepository;
  }
  async execute(payload) {
    await this.#taskRepository.store(payload);
  }
};
