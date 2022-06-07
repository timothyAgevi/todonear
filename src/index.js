if (window.location.pathname === '/auth.html') {
  // Check if wallet is linked
  if (isLoggedIn()) {
    window.location.href = '/index.html';
  } else {
    // Access login button DOM element
    const loginBtn = document.querySelector('#login-btn');
    loginBtn.onclick = (event) => {
      login();
    };
  }
} else if (
  window.location.pathname === '/index.html' ||
  window.location.pathname === '/'
) {
  if (!isLoggedIn()) {
    window.location.href = '/auth.html';
  }
  document.querySelector('#app-name').textContent = APP_NAME;
  document.querySelector('#wallet-id').textContent = getAccount();
  const newTaskForm = document.querySelector('#new-task');
  const logoutBtn = document.querySelector('#logout');

  /**
   * =====================================================
   * Smart Contract Calls
   * =====================================================
   */

  // Logout User
  logoutBtn.onclick = () => {
    logout();
    window.location.reload();
  };

  // Adds submitted task
  newTaskForm.onsubmit = async (event) => {
    event.preventDefault();
    const taskTitle = event.target.newTaskTitle.value;
    const createdTask = await newTask(taskTitle);
    const pendingTaskView = document.querySelector('#pending-tasks');
    pendingTaskView.innerHTML += `<li
                        class="list-group-item d-flex align-items-center justify-content-between border-0 mb-2 rounded"
                        style="background-color: #f4f6f7"
                      >
                        <div class="d-flex align-items-center">
                          ${createdTask.title}
                        </div>
                        <button onclick="eventWrap(${createdTask.id}, ${startTask})" class="btn btn-sm btn-secondary m-2 text-light">
                          Start
                        </button>
                      </li>`;
    newTaskForm.reset();
  };

  // Displays tasks
  displayTasks();
}

async function displayTasks() {
  // Retreive all tasks from smart contract
  const allTasks = await getAllTasks();

  let pending = '';
  let active = '';
  let complete = '';

  // Loop through the list of tasks if any and wrap them in relevant HTML elemnts
  for (let i = 0; i < allTasks.length; i++) {
    const task = allTasks[i];
    if (task.status === 0) {
      pending += taskElement(i, task.status, task.title);
    } else if (task.status === 1) {
      active += taskElement(i, task.status, task.title);
    } else {
      complete += taskElement(i, task.status, task.title);
    }
  }

  // Reflect the change in DOM
  updateTaskViews(pending, active, complete);
}

function taskElement(id, status, title) {
  switch (status) {
    case 0:
      return `<li
                        class="list-group-item d-flex align-items-center justify-content-between border-0 mb-2 rounded"
                        style="background-color: #f4f6f7"
                      >
                        <div class="d-flex align-items-center">
                          ${title}
                        </div>
                        <button onclick="eventWrap(${id}, ${startTask})" class="btn btn-sm btn-secondary m-2 text-light">
                          Start
                        </button>
                      </li>`;
    case 1:
      return `<li
                        class="list-group-item d-flex align-items-center justify-content-between border-0 mb-2 rounded"
                        style="background-color: #f4f6f7"
                      >
                        <div class="d-flex align-items-center">
                          ${title}
                        </div>
                        <button onclick="eventWrap(${id}, ${completeTask})" class="btn btn-sm btn-secondary m-2 text-light">
                          Complete
                        </button>
                      </li>`;
    case 2:
      return `<li
                        class="list-group-item d-flex align-items-center justify-content-between border-0 mb-2 rounded"
                        style="background-color: #f4f6f7"
                      >
                        <div class="d-flex align-items-center">
                          ${title}
                        </div>
                        <button onclick="eventWrap(${id}, ${removeTask})" class="btn btn-sm btn-danger m-2 text-light">
                          Delete
                        </button>
                      </li>`;

    default:
      '';
  }
}

function updateTaskViews(pending, active, completed) {
  const pendingTaskView = document.querySelector('#pending-tasks');
  const activeTaskView = document.querySelector('#active-tasks');
  const completedTaskView = document.querySelector('#completed-tasks');

  pendingTaskView.innerHTML = pending;
  activeTaskView.innerHTML = active;
  completedTaskView.innerHTML = completed;
}

async function eventWrap(id, callback) {
  const res = await callback(id);
  if (res) {
    window.location.reload();
  } else {
    alert(`Operation as not successful!`);
  }
}