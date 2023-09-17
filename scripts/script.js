const taskArr = [
  { value: "The first task", active: 0 },
  { value: "The second task", active: 1 },
];

const inputTask = document.querySelector("#add-task__input");
const addTaskBtn = document.querySelector("#add-task__btn");
const taskList = document.querySelector("#task-list");
const modalWindow = document.querySelector("#modal-edit");
const editInput = document.querySelector("#edit-task__input");
const applyBtn = document.querySelector("#apply-task__btn");
const exitBtn = document.querySelector("#exit");
const dateNumber = document.querySelector("#date-number");
const dateMounth = document.querySelector("#date-mounth");
const dateYear = document.querySelector("#date-year");
const dateDay = document.querySelector("#date-day");

//first render
window.addEventListener("DOMContentLoaded", renderTaskList());

//date block
let today = new Date();
dateNumber.innerHTML = today.toLocaleString("en-US", { day: "numeric" });
dateMounth.innerHTML = today.toLocaleString("en-US", { month: "long" });
dateYear.innerHTML = today.toLocaleString("en-US", { year: "numeric" });
dateDay.innerHTML = today.toLocaleString("en-US", { weekday: "long" });

//add task event
addTaskBtn.addEventListener("click", () => {
  addTask(inputTask.value);
});
inputTask.addEventListener("keypress", (e) => {
  if (e.key === 'Enter') {
    addTask(inputTask.value);
  }
});

//add task funck
function addTask(value) {
  isEmpty(value)
    ? alert("no task message")
    : taskArr.push({ value: value, active: 1 }),
    (inputTask.value = ""),
    renderTaskList(),
    console.log(taskArr);
}

function renderTaskList() {
  // to render task list
  taskArr.length == 0
    ? (taskList.innerHTML = "No tasks")
    : (taskList.innerHTML = ""),
    taskArr.map((el, ind) => {
      taskList.append(createBox(el.value, ind));
    });
}
function createBox(el, ind) {
  // to draw the task line
  const div = document.createElement("div");
  div.classList.add("task-list__item");
  const par = document.createElement("p");
  par.classList.add("task-list__item-text");
  par.setAttribute("id", `task${ind}`);
  par.classList.add(taskArr[ind].active ? null : "disabled");
  par.innerText = el;
  div.appendChild(par);

  //create wrapper div for function btn
  const secDiv = document.createElement("div");
  secDiv.classList.add("task-list__btn-container");

  // create remove btn
  const remImg = document.createElement("img");
  remImg.classList.add("task-list__item-btn");
  remImg.setAttribute("src", `img/remove.png`);
  remImg.setAttribute("alt", `delete icon`);
  remImg.addEventListener("click", () => {
    taskArr.splice(ind, 1);
    renderTaskList();
  });
  secDiv.appendChild(remImg);

  // create disable btn
  const disImg = document.createElement("div");
  disImg.classList.add("task-list__item-done");
  disImg.classList.add(taskArr[ind].active ? null : "done");
  disImg.addEventListener("click", () => {
    taskArr[ind].active ? (taskArr[ind].active = 0) : (taskArr[ind].active = 1);
    document.querySelector(`#task${ind}`).classList.toggle("disabled");
    disImg.classList.toggle("done");
  });
  secDiv.appendChild(disImg);

  // create edit task btn
  const editImg = document.createElement("img");
  editImg.classList.add("task-list__item-btn");
  editImg.setAttribute("src", `img/edit.png`);
  editImg.setAttribute("alt", `edit icon`);
  editImg.addEventListener("click", () => {
    editTask(ind);
    console.log(ind);
  });
  secDiv.appendChild(editImg);

  div.appendChild(secDiv);

  return div;
}

// edit task function
function editTask(ind) {
  modalWindow.style.display = "flex";
  editInput.value = taskArr[ind].value;
  applyBtn.addEventListener("click", apply);
  exitBtn.addEventListener("click", () => {
    modalWindow.style.display = "none";
    applyBtn.removeEventListener("click", apply, false);
  });
  function apply() {
    taskArr[ind].value = editInput.value;
    renderTaskList();
    modalWindow.style.display = "none";
    applyBtn.removeEventListener("click", apply, false);
  }
}

// checking if the field is empty
function isEmpty(str) {
  if (str.trim() == "") return true;
  return false;
}
