class TaskRepository {
  #database;
  constructor({ db }) {
    this.#database = db;
  }

  async all() {
    const finalData = [];
    const snapshot = await this.#database
      .collection("tasks")
      .orderBy("id")
      .get();

    snapshot.forEach((currentDocument) => {
      finalData.push(currentDocument.data());
    });

    return finalData;
  }
  async store(documentData) {
    let shouldUpdataMetadataId = false;
    const responsibleAlreadyExists = await this.#queryTaskByResponsible(
      documentData.responsible,
    );
    if (responsibleAlreadyExists) {
      documentData["id"] = responsibleAlreadyExists.id;
    } else {
      console.info("getting new id");
      const latestIdDocument = await this.#getLatestIdDocument();
      const latestId = latestIdDocument.data().id;
      documentData["id"] = latestId + 1;
      shouldUpdataMetadataId = true;
    }
    const newDocumentReference = this.#database.collection("tasks").doc();
    this.#database.runTransaction(async (transaction) => {
      transaction.set(newDocumentReference, documentData);
      if (shouldUpdataMetadataId) await this.#updateLatestId();
    });
  }

  async #getLatestIdDocument() {
    const document = await this.#database
      .collection("metadata")
      .doc("task_id")
      .get();
    return document;
  }
  async #updateLatestId() {
    const document = await this.#database
      .collection("metadata")
      .doc("task_id")
      .get();
    const documentData = document.data();

    await this.#database
      .collection("metadata")
      .doc("task_id")
      .update({
        id: documentData.id + 1,
      });
  }

  async #queryTaskByResponsible(responsible) {
    const queryTaskByResponsible = await this.#database
      .collection("tasks")
      .where("responsible", "==", responsible)
      .limit(1)
      .get();

    if (!queryTaskByResponsible.docs.length > 0) {
      return null;
    }
    const document = queryTaskByResponsible.docs[0].data();
    return document;
  }
}
module.exports = TaskRepository;
