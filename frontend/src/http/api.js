export async function getTasks() {
  const response = await fetch("http://localhost:3000/get-tasks");
  const data = await response.json();
  return data;
}

export async function postNewTask(payload) {
  await fetch("http://localhost:3000/insert-tasks", {
    method: "POST",
    body: JSON.stringify(payload),
    headers: {
      "Content-Type": "application/json",
    },
  });
}
