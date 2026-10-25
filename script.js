const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");

// Load saved tasks from the browser, or start with an empty list.
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
// getItem("tasks") reads the saved text.
// JSON.parse turns that text back into a real list.
// || [] means "if nothing is saved yet, use an empty list".

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  // JSON.stringify turns the list into text, because
  // localStorage can only store text.
}

function renderTasks() {
  taskList.innerHTML = "";
  // Clear the list on screen, then rebuild it from the tasks array.

  tasks.forEach(function (task, index) {
    // Runs once for every task. "index" is its position (0, 1, 2...).

    const li = document.createElement("li");
    if (task.done) li.classList.add("done");

    const span = document.createElement("span");
    span.textContent = task.text;
    span.addEventListener("click", function () {
      tasks[index].done = !tasks[index].done; // flip true/false
      saveTasks();
      renderTasks();
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.addEventListener("click", function () {
      tasks.splice(index, 1); // remove 1 item at this position
      saveTasks();
      renderTasks();
    });

    li.appendChild(span);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });
}

function addTask() {
  const text = taskInput.value.trim();
  if (text === "") return;

  tasks.push({ text: text, done: false });
  // Add a new task object to the list.

  saveTasks();
  renderTasks();
  taskInput.value = "";
}

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keydown", function (e) {
  if (e.key === "Enter") addTask();
});

renderTasks();
// Runs once when the page opens, to show any saved tasks.