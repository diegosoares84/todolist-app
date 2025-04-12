let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let completedTasks = JSON.parse(localStorage.getItem('completedTasks')) || [];
let filteredTasks = 'all';

function addTask() {
  const title = document.getElementById('task-title').value;
  const category = document.getElementById('task-category').value;
  const reminder = document.getElementById('task-reminder').value;

  if (!title || !reminder) {
    alert('Preencha o título e a data/hora!');
    return;
  }

  const taskReminderDate = new Date(reminder);
  const today = new Date();
  const isToday = taskReminderDate.toDateString() === today.toDateString();

  const newTask = {
    title,
    category,
    reminder,
    completed: false,
    today: isToday
  };

  tasks.push(newTask);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  window.location.href = 'index.html';
}

function loadTasks() {
  const taskList = document.getElementById('task-list');
  const completedList = document.getElementById('completed-list');
  if (!taskList || !completedList) return;

  taskList.innerHTML = '';
  completedList.innerHTML = '';

  const tasksToShow = filteredTasks === 'today'
    ? tasks.filter(t => t.today && !t.completed)
    : tasks.filter(t => !t.completed);

  tasksToShow.forEach((task, index) => {
    const div = document.createElement('div');
    div.className = 'task-item';

    div.innerHTML = `
      <div class="task-info">
        <strong>${task.title}</strong>
        <div class="task-category">${task.category}</div>
        <div class="task-time">${new Date(task.reminder).toLocaleString()}</div>
      </div>
      <label>
        <input type="checkbox" onchange="markComplete(${index})">
        ✔
      </label>
    `;

    taskList.appendChild(div);
  });

  completedTasks.forEach(task => {
    const div = document.createElement('div');
    div.className = 'task-item completed';

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

  const chipAll = document.getElementById('chip-all');
  const chipToday = document.getElementById('chip-today');

  chipAll.classList.remove('active');
  chipToday.classList.remove('active');

  if (type === 'all') chipAll.classList.add('active');
  if (type === 'today') chipToday.classList.add('active');

  loadTasks();
}

window.onload = () => loadTasks();
