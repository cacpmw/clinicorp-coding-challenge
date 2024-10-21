module.exports = class FakeTaskRepository {
  #database = [];
  

  async all() {
    return this.#database;
  }
  async store(documentData) {
    this.#database.push(documentData);
  }



}
