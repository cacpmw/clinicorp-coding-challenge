const AllTasksService = require("../src/modules/tasks/services/AllTasksService.js");
const StoreTaskService = require("../src/modules/tasks/services/StoreTaskService.js");

const FakeTaskRepository = require("./repositories/FakeTaskRepository");

let fakeTaskRepository;
let allTasksService;
let storeTaskService;

describe("AllTasksService", () => {
  beforeEach(async () => {
    fakeTaskRepository = new FakeTaskRepository();
    allTasksService = new AllTasksService({
      taskRepository: fakeTaskRepository,
    });
  });
  it("it should return non empty array of tasks", async () => {
    await fakeTaskRepository.store({
      responsible: "Carlos",
      description: "Teste",
      status: "pending",
      computer: "localhost",
    });

    await fakeTaskRepository.store({
      responsible: "Carlos",
      description: "Teste",
      status: "pending",
      computer: "localhost",
    });
    await fakeTaskRepository.store({
      responsible: "Carlos",
      description: "Teste",
      status: "pending",
      computer: "localhost",
    });
    const result = await allTasksService.execute();
    expect(result.length).toEqual(3);
  });
});

describe("StoreTaskService", () => {
  beforeEach(async () => {
    fakeTaskRepository = new FakeTaskRepository();
    storeTaskService = new StoreTaskService({
      taskRepository: fakeTaskRepository,
    });
    allTasksService = new AllTasksService({
      taskRepository: fakeTaskRepository,
    });
  });
  it("it should add a task", async () => {
    const newTask = {
      responsible: "Carlos",
      description: "Teste",
      status: "pending",
      computer: "localhost",
    };
    await storeTaskService.execute(newTask);
    const allTask = await allTasksService.execute();
    expect(allTask.length).toEqual(1);
  });
});
