// action buttons
// const taskCardInfo = document.querySelectorAll(".info-warper");
const newTaskBtn = document.querySelector(".new-task");
const addTaskBtn = document.querySelector(".add-task");
const modalDeleteBtn = document.querySelector(".task-delete");

/* modals */
// modal new task
const modalNewTask = document.querySelector(".modal-new-task");
const modalNewTaskClose = document.querySelector(".close");
const modalNewTaskBack = document.querySelector(".back");

// modal delete all tasks
const modalCancel = document.querySelector(".delete-cancel");
const modalDeleteYes = document.querySelector(".yes-delete");
const modalDeleteBack = document.querySelector(".choice-back");
const modalDelete = document.querySelector(".delete-all-modal");

// add new task variables
const inputTaskTitle = document.querySelector(".input-task");
const textareaDiscription = document.querySelector(".input-discription");
const emptyError = document.querySelector(".error-empty");
const selectPriority = document.querySelector(".select");
const taskAddedNoti = document.querySelector(".task-added");
const taskAddedTitle = document.querySelector(".added-title");
const addedCheck = document.querySelector(".added");

// display task variables and localstorage releted variables
const displayContent = document.querySelector(".task-content");

/* Helper functions */
// priority identifire
const identifyPriority = function (priority) {
  if (priority === 1) return `<span class="high">HIGH</span>`;
  if (priority === 2) return `<span class="medium">MEDIUM</span>`;
  if (priority === 3) return `<span class="low">LOW</span>`;
};

// display the given data in task card
const displayTasks = function (valueArr) {
  const html = `<a href="#${valueArr[0]}">
            <div class="task-card" data-hash="${valueArr[0]}">
              <input type="checkbox" name="check" id="task" class="checkbox" />
              <div class="info-warper" data-hash="${valueArr[0]}">
                <label class="task-title">
                  ${valueArr[2]}
                ${identifyPriority(+valueArr[4])}  
                </label>
                <div class="info">
                  <div class="date">${valueArr[1]}</div>
                </div>
              </div>
              <i class="fa-solid fa-trash delete"></i>
            </div>
          </a>`;
  displayContent.insertAdjacentHTML("afterbegin", html);
};

// determines the priority when task card modal is active.
const determineOptionPriority = function (priority) {
  if (priority === 1) {
    return `
              <option value="3">Low</option>
              <option value="2">Medium</option>
              <option selected value="1">High</option>
      `;
  } else if (priority === 2) {
    return `
              <option value="3">Low</option>
              <option selected value="2">Medium</option>
              <option value="1">High</option>
      `;
  } else if (priority === 3) {
    return `
              <option selected value="3">Low</option>
              <option value="2">Medium</option>
              <option value="1">High</option>
      `;
  }
};
// modals open/close

// modal New Task
newTaskBtn.addEventListener("click", function () {
  modalNewTask.classList.toggle("display-none");
  taskAddedNoti.style.display = "none";
});

modalNewTaskClose.addEventListener("click", function () {
  modalNewTask.classList.toggle("display-none");
  window.location.reload();
});
modalNewTaskBack.addEventListener("click", function () {
  modalNewTask.classList.toggle("display-none");
  window.location.reload();
});

// modal delete all
modalDeleteBtn.addEventListener("click", function () {
  modalDelete.classList.toggle("display-none");
});

modalDeleteBack.addEventListener("click", function () {
  modalDelete.classList.toggle("display-none");
});

modalCancel.addEventListener("click", function () {
  modalDelete.classList.toggle("display-none");
});

modalDeleteYes.addEventListener("click", function () {
  modalDelete.classList.toggle("display-none");
  localStorage.clear();
  window.location.reload();
});

// get the data and store it to newTaskValue, display the value dynamically and handle error.
addTaskBtn.addEventListener("click", function () {
  const nowDate = new Date();
  const local = navigator.language;
  const options = {
    hour: "numeric",
    minute: "numeric",
    day: "numeric",
    month: "long",
    year: "numeric",
    weekday: "long",
  };
  const dateIntl = new Intl.DateTimeFormat(local, options).format(nowDate);

  if (inputTaskTitle.value.trim() !== "" && Number(selectPriority.value) > 0) {
    localStorage.setItem(
      `${Date.now()}`,
      JSON.stringify([
        `${Date.now()}`,
        `${dateIntl}`,
        `${inputTaskTitle.value}`,
        `${textareaDiscription.value}`,
        `${selectPriority.value}`,
      ])
    );

    displayTasks([
      `${Date.now()}`,
      `${dateIntl}`,
      `${inputTaskTitle.value}`,
      `${textareaDiscription.value}`,
      `${selectPriority.value}`,
    ]);

    taskAddedNoti.style.display = "block";
    addedCheck.innerHTML = '<i class="fa-regular fa-circle-check"></i>';
    taskAddedNoti.style.backgroundColor = "#4bb543";
    taskAddedTitle.innerHTML = "Your Task is Been Added to Daily ToDo";
    inputTaskTitle.value = "";
    textareaDiscription.value = "";
    selectPriority.value = "null";
  } else {
    taskAddedNoti.style.display = "block";
    addedCheck.innerHTML = '<i class="fa-regular fa-circle-xmark"></i>';
    taskAddedNoti.style.backgroundColor = "red";
    taskAddedTitle.innerHTML = "Please add Title and a Priority!";
  }
});

// Loading task card from local storage
for (let i = 0; i < localStorage.length; i++) {
  const localStorageKey = localStorage.key(i);
  const arrValue = JSON.parse(localStorage.getItem(localStorageKey));
  displayTasks(arrValue);
}

// // task card logics
const taskCardInfo = document.querySelectorAll(".info-warper");
const modalViewTask = document.querySelector(".modal-task-view");
const modalViewBack = document.querySelector(".view-back");
const modalViewClose = document.querySelector(".view-close");
// const taskCard = document.querySelectorAll(".task-card");

// modal view items
const modalViewTitle = document.querySelector(".task-view-title");
const modalViewDiscription = document.querySelector(".view-discription");
// const modalViewPriority = document.querySelector(".priority");
const modalViewPriority = document.querySelector(".default-priority");
const modalViewPrioritySelect = document.querySelector(".priority-select");
// const deleteIcon = document.querySelector(".delete");

taskCardInfo.forEach((e) => {
  const taskId = e.dataset.hash;

  // view task card modal with content inside.
  e.addEventListener("click", function () {
    const data = JSON.parse(localStorage.getItem(taskId));
    console.log(data);
    modalViewTask.classList.toggle("display-none");
    modalViewTitle.value = `${data[2]}`;
    modalViewDiscription.innerHTML = `${data[3]}`;
    modalViewPrioritySelect.insertAdjacentHTML(
      "afterbegin",
      determineOptionPriority(+data[4])
    );
  });
});

// view task card modal remove logics
modalViewClose.addEventListener("click", function () {
  modalViewTask.classList.toggle("display-none");
});
modalViewBack.addEventListener("click", function () {
  modalViewTask.classList.toggle("display-none");
});

// edit the task
const saveEdit = document.querySelector(".save-edit");

saveEdit.addEventListener("click", function () {
  if (modalViewTitle.value.trim() !== "") {
    const taskId1 = window.location.hash.slice(1);
    const nowDate = new Date();
    const local = navigator.language;
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    };
    const dateIntl = new Intl.DateTimeFormat(local, options).format(nowDate);
    localStorage.removeItem(taskId1);
    localStorage.setItem(
      `${Date.now()}`,
      JSON.stringify([
        `${Date.now()}`,
        `${dateIntl} (Edited)`,
        `${modalViewTitle.value}`,
        `${modalViewDiscription.value}`,
        `${modalViewPrioritySelect.value}`,
      ])
    );
    window.location.reload();
  } else {
    taskAddedNoti.style.display = "block";
  }
});

/* Checked Logic */
// upon checked, delete the current keypair from browser storage, create a new one with an extra value of true.
const taskCard = document.querySelectorAll(".task-card");

/* Count the completed task, display checked and unchecked. */

let count = 0;

// copied from chatGPT
taskCard.forEach((e) => {
  const inputCheck = e.querySelector('input[type="checkbox"]'); // Assuming each task card has a checkbox

  inputCheck.addEventListener("change", function () {
    const taskId1 = e.dataset.hash; // Get the task ID from the dataset
    const nowDate = new Date();
    const local = navigator.language;
    const options = {
      hour: "numeric",
      minute: "numeric",
      day: "numeric",
      month: "long",
      year: "numeric",
      weekday: "long",
    };
    const dateIntl = new Intl.DateTimeFormat(local, options).format(nowDate);
    const arrValue = JSON.parse(localStorage.getItem(taskId1));

    if (inputCheck.checked) {
      localStorage.setItem(
        `${Date.now()}`,
        JSON.stringify([
          `${Date.now()}`,
          `${dateIntl}`,
          `${arrValue[2]}`,
          `${arrValue[3]}`,
          `${arrValue[4]}`,
          "true",
        ])
      );
      localStorage.removeItem(taskId1);
      window.location.reload();
    } else {
      localStorage.setItem(
        `${Date.now()}`,
        JSON.stringify([
          `${Date.now()}`,
          `${dateIntl}`,
          `${arrValue[2]}`,
          `${arrValue[3]}`,
          `${arrValue[4]}`,
          "false",
        ])
      );
      localStorage.removeItem(taskId1);
      window.location.reload();
    }
  });
});

// Check the state of all checkboxes in localStorage
for (let i = 0; i < localStorage.length; i++) {
  let key = localStorage.key(i);
  let value = JSON.parse(localStorage.getItem(key));
  const taskCardElementToSelect = document.querySelector(
    `[data-hash="${key}"]`
  );
  // deletion logic
  const deleteIcon = taskCardElementToSelect.querySelector(".delete");
  deleteIcon.addEventListener("click", function () {
    localStorage.removeItem(key);
    window.location.reload();
  });

  // Check if the specific condition for "true" is met
  if (value && value.includes("true")) {
    count++;
    // I mistook here.
    const taskCardElement = document.querySelector(`[data-hash="${key}"]`); // Get the corresponding task card
    const inputCheck = taskCardElement.querySelector('input[type="checkbox"]'); // Get the checkbox for this task card
    const taskTitle = taskCardElement.querySelector(".task-title");
    if (inputCheck) {
      inputCheck.checked = true; // Mark it as checked
      taskTitle.style.color = "gray";
    }
  } else {
    // Get the corresponding task card
    const taskCardElement = document.querySelector(`[data-hash="${key}"]`);
    // Get the checkbox for this task card
    const inputCheck = taskCardElement.querySelector('input[type="checkbox"]');
    // Get the current title
    const taskTitle = taskCardElement.querySelector(".task-title");

    if (inputCheck) {
      inputCheck.checked = false; // Mark it as checked
      taskTitle.style.color = "white";
    }
  }
}

// side panel task status variables
const taskCount = document.querySelector(".task-count");
const taskCompletedCount = document.querySelector(".task-completed-count ");
const taskLeftCount = document.querySelector(".task-left-count");

// side panel content displaying
taskCount.innerHTML = localStorage.length;

taskCompletedCount.innerHTML = count;

taskLeftCount.innerHTML = localStorage.length - count;

// status logic: all
const shortAll = document.querySelector(".all");
const shortCompleted = document.querySelector(".completed");
const shortPriorityLow = document.querySelector(".priority-low");
const shortPriorityMedium = document.querySelector(".priority-medium");
const shortPriorityHigh = document.querySelector(".priority-high");
const shortUnCompleted = document.querySelector(".uncompleted");
const statusAll = document.querySelector(".common-js");

const removeActive = function (shortBtn) {
  shortBtn.classList.remove("active");
};

const taskShortAll = document.querySelector(".task-short-all");
const taskShortCompleted = document.querySelector(".task-short-completed");
const taskShortUnCompleted = document.querySelector(".task-short-uncompleted");

const taskShortHigh = document.querySelector(".task-short-high");
const taskShortMedium = document.querySelector(".task-short-medium");
const taskShortLow = document.querySelector(".task-short-low");
// helper function
const displayShortedTask = function (valueArr, element) {
  const html = `<a href="#${valueArr[0]}">
            <div class="task-card" data-hash="${valueArr[0]}">
              <input type="checkbox" name="check" id="task" class="checkbox" />
              <div class="info-warper" data-hash="${valueArr[0]}">
                <label class="task-title">
                  ${valueArr[2]}
                ${identifyPriority(+valueArr[4])}  
                </label>
                <div class="info">
                  <div class="date">${valueArr[1]}</div>
                </div>
              </div>
              <i class="fa-solid fa-trash delete"></i>
            </div>
          </a>`;
  element.insertAdjacentHTML("afterbegin", html);
};

shortAll.addEventListener("click", function () {
  window.location.reload();
});

// status click button
const statusClickLogic = function (
  ObjValueIndex,
  includes,
  displayShortedTaskVar,
  noneLogic
) {
  /* 
  ObjValueIndex is the value that will be checked if something is included; 
  includes is the value that will be checked if includes
  displayShortedTaskVar is the value where the html templete will be added through displayShortedTask function;
  noneLogic is the string of a variable name that will be displayed as blcok and other will be none.  
  */

  let arrHigh = [];
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let valueArr = JSON.parse(localStorage.getItem(key));

    if (Object.values(valueArr)[ObjValueIndex].includes(`${includes}`)) {
      arrHigh.push(valueArr[0]);
    }
  }

  arrHigh.forEach((e) => {
    let value = JSON.parse(localStorage.getItem(e));
    if (value && value.includes("true")) {
      const taskCardElement = document.querySelector(`[data-hash="${e}"]`); // Get the corresponding task card
      const inputCheck = taskCardElement.querySelector(
        'input[type="checkbox"]'
      ); // Get the checkbox for this task card
      const taskTitle = taskCardElement.querySelector(".task-title");
      if (inputCheck) {
        inputCheck.checked = true; // Mark it as checked
        taskTitle.style.color = "gray";
      }
    } else {
      // Get the corresponding task card
      const taskCardElement = document.querySelector(`[data-hash="${e}"]`);
      // Get the checkbox for this task card
      const inputCheck = taskCardElement.querySelector(
        'input[type="checkbox"]'
      );
      // Get the current title
      const taskTitle = taskCardElement.querySelector(".task-title");

      if (inputCheck) {
        inputCheck.checked = false; // Mark it as checked
        taskTitle.style.color = "white";
      }
    }
    displayShortedTask(
      JSON.parse(localStorage.getItem(e)),
      displayShortedTaskVar
    );
    // none/blcok logic
    displayContent.style.display = `${
      noneLogic === "displayContent" ? "block" : "none"
    }`;
    taskShortMedium.style.display = `${
      noneLogic === "taskShortMedium" ? "block" : "none"
    }`;
    taskShortLow.style.display = `${
      noneLogic === "taskShortLow" ? "block" : "none"
    }`;
    taskShortHigh.style.display = `${
      noneLogic === "taskShortHigh" ? "block" : "none"
    }`;
    taskShortCompleted.style.display = `${
      noneLogic === "taskShortCompleted" ? "block" : "none"
    }`;
    taskShortUnCompleted.style.display = `${
      noneLogic === "taskShortUnCompleted" ? "block" : "none"
    }`;
    taskShortAll.style.display = `${
      noneLogic === "taskShortAll" ? "block" : "none"
    }`;
  });
  const inputCheckHid = document.querySelectorAll(".checkbox");
  inputCheckHid.forEach((e) => {
    e.style.display = "none";
  });
};

let isClickedShortCompleted = false;
shortCompleted.addEventListener("click", function () {
  if (isClickedShortCompleted) return;

  shortCompleted.classList.add("active");
  removeActive(shortAll);
  removeActive(shortPriorityHigh);
  removeActive(shortUnCompleted);
  removeActive(shortPriorityLow);
  removeActive(shortPriorityMedium);

  let arrHigh = [];
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let valueArr = JSON.parse(localStorage.getItem(key));

    if (valueArr.includes("true")) {
      arrHigh.push(valueArr[0]);
    }
  }
  arrHigh.forEach((e) => {
    let value = JSON.parse(localStorage.getItem(e));
    if (value && value.includes("true")) {
      displayShortedTask(
        JSON.parse(localStorage.getItem(e)),
        taskShortCompleted
      );
      const taskCardElement = document.querySelector(`[data-hash="${e}"]`); // Get the corresponding task card
      const inputCheck = taskCardElement.querySelector(
        'input[type="checkbox"]'
      ); // Get the checkbox for this task card
      const taskTitle = taskCardElement.querySelector(".task-title");
      if (inputCheck) {
        inputCheck.checked = true; // Mark it as checked
        taskTitle.style.color = "gray";
      }
    } else {
      // Get the corresponding task card
      const taskCardElement = document.querySelector(`[data-hash="${e}"]`);
      // Get the checkbox for this task card
      const inputCheck = taskCardElement.querySelector(
        'input[type="checkbox"]'
      );
      // Get the current title
      const taskTitle = taskCardElement.querySelector(".task-title");

      if (inputCheck) {
        inputCheck.checked = false; // Mark it as checked
        taskTitle.style.color = "white";
      }
    }
    displayContent.style.display = "none";
    taskShortMedium.style.display = "none";
    taskShortLow.style.display = "none";
    taskShortHigh.style.display = "none";
    taskShortCompleted.style.display = "block";
    taskShortUnCompleted.style.display = "none";
    taskShortAll.style.display = "none";
  });

  isClickedShortCompleted = true;
  const inputCheckHid = document.querySelectorAll(".checkbox");
  inputCheckHid.forEach((e) => {
    e.style.display = "none";
  });
});

let isClickedShortUnCompleted = false;

shortUnCompleted.addEventListener("click", function () {
  const taskLeft = document.querySelector(".task-left-count");
  if (isClickedShortUnCompleted) return;
  shortUnCompleted.classList.add("active");
  removeActive(shortAll);
  removeActive(shortCompleted);
  removeActive(shortPriorityHigh);
  removeActive(shortPriorityLow);
  removeActive(shortPriorityMedium);
  let arrHigh = [];
  for (let i = 0; i < localStorage.length; i++) {
    let key = localStorage.key(i);
    let valueArr = JSON.parse(localStorage.getItem(key));

    if (!Object.values(valueArr)[5]) {
      arrHigh.push(valueArr[0]);
    }
  }

  arrHigh.forEach((e) => {
    displayShortedTask(
      JSON.parse(localStorage.getItem(e)),
      taskShortUnCompleted
    );

    displayContent.style.display = "none";
    taskShortMedium.style.display = "none";
    taskShortLow.style.display = "none";
    taskShortHigh.style.display = "none";
    taskShortCompleted.style.display = "none";
    taskShortUnCompleted.style.display = "block";
    taskShortAll.style.display = "none";
  });
  isClickedShortUnCompleted = true;
  const inputCheckHid = document.querySelectorAll(".checkbox");
  inputCheckHid.forEach((e) => {
    e.style.display = "none";
  });
});

let isClickedShortPriorityHigh = false;

shortPriorityHigh.addEventListener("click", function () {
  if (isClickedShortPriorityHigh) return;
  shortPriorityHigh.classList.add("active");
  removeActive(shortAll);
  removeActive(shortCompleted);
  removeActive(shortUnCompleted);
  removeActive(shortPriorityLow);
  removeActive(shortPriorityMedium);
  statusClickLogic(4, 1, taskShortHigh, "taskShortHigh");

  isClickedShortPriorityHigh = true;
});

let isClickedShortPriorityMedium = false;
shortPriorityMedium.addEventListener("click", function () {
  if (isClickedShortPriorityMedium) return;
  shortPriorityMedium.classList.add("active");
  removeActive(shortAll);
  removeActive(shortCompleted);
  removeActive(shortUnCompleted);
  removeActive(shortPriorityHigh);
  removeActive(shortPriorityLow);

  statusClickLogic(4, 2, taskShortMedium, "taskShortMedium");
  isClickedShortPriorityMedium = true;
});

let isClickedShortPriorityLow = false;
shortPriorityLow.addEventListener("click", function () {
  if (isClickedShortPriorityLow) return;
  shortPriorityLow.classList.add("active");
  removeActive(shortAll);
  removeActive(shortCompleted);
  removeActive(shortUnCompleted);
  removeActive(shortPriorityHigh);
  removeActive(shortPriorityMedium);

  statusClickLogic(4, 3, taskShortLow, "taskShortLow");
  isClickedShortPriorityLow = true;
});

// side pannel translate down on click
const upDownBtn = document.querySelector(".down");
const statusSection = document.querySelector(".status-section");
const allTaskVh = document.querySelectorAll(".common-task");

upDownBtn.addEventListener("click", function () {
  statusSection.classList.toggle("translate-down");
  allTaskVh.forEach((e) => {
    e.classList.toggle("translate-down-vh");
  });
});


// initial sms 
const initialSMS = document.querySelector('.initial-sms');
if (!localStorage.length > 0) {
  initialSMS.style.display = 'block';
} else {
  initialSMS.style.display = 'none';
}


//displayContent
// the loading sms
// when there is no html content and the value of localstorage.length is greater then zero.then display the loader; 
const loader = document.querySelector('.loader');

if (!displayContent.children.length > 0 && localStorage.length > 0) {
  loader.classList.remove('display-none');
  console.log("loader was loaded");
  // console.log("has element");
} else {
  loader.classList.add('display-none');
}