let tasks = [];
let completedTasks = [];
let filteredTasks = 'all';

function loadTasks() {
  const taskList = document.getElementById('task-list');
  const completedList = document.getElementById('completed-list');
  taskList.innerHTML = '';
  completedList.innerHTML = '';

  const tasksToDisplay = filteredTasks === 'all' ? tasks : tasks.filter(task => task.today === true);

  tasksToDisplay.forEach((task, index) => {
    const div = document.createElement('div');
    div.className = 'task-item';

    div.innerHTML = `
      <div class="task-info">
        <strong>${task.title}</strong>
        <div class="task-category">${task.category}</div>
        <div class="task-time">${new Date(task.reminder).toLocaleString()}</div>
      </div>
      <label>
        <input type="checkbox" onchange="markComplete(${index})" ${task.completed ? 'checked' : ''}>
        Concluída
      </label>
    `;

    taskList.appendChild(div);
  });

  completedTasks.forEach((task, index) => {
    const div = document.createElement('div');
    div.className = 'task-item';

    div.innerHTML = `
      <div class="task-info">
        <strong>${task.title}</strong>
        <div class="task-category">${task.category}</div>
        <div class="task-time">${new Date(task.reminder).toLocaleString()}</div>
      </div>
    `;

    completedList.appendChild(div);
  });
}

function addTask() {
  const title = document.getElementById('task-title').value;
  const category = document.getElementById('task-category').value;
  const reminder = document.getElementById('task-reminder').value;
  const today = document.getElementById('task-today').checked;

  if (!title || !reminder) {
    alert('Preencha o título e o lembrete!');
    return;
  }

  const newTask = { title, category, reminder, completed: false, today };
  tasks.push(newTask);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  document.getElementById('task-title').value = '';
  document.getElementById('task-reminder').value = '';
  document.getElementById('task-today').checked = false;

  loadTasks();
}

function markComplete(index) {
  tasks[index].completed = true;
  completedTasks.push(tasks[index]);
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  localStorage.setItem('completedTasks', JSON.stringify(completedTasks));
  loadTasks();
}

function filterTasks(type) {
  filteredTasks = type;
  loadTasks();
}

window.onload = function() {
  tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];
  loadTasks();
};
