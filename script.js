function loadTasks() {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  const taskList = document.getElementById('task-list');
  taskList.innerHTML = '';

  tasks.forEach((task, index) => {
    const div = document.createElement('div');
    div.className = 'task-item';

    div.innerHTML = `
      <div class="task-info">
        <strong>${task.title}</strong>
        <div class="task-category">${task.category}</div>
        <div class="task-time">${new Date(task.reminder).toLocaleString()}</div>
      </div>
      <button onclick="deleteTask(${index})">Excluir</button>
    `;

    taskList.appendChild(div);
  });
}

function addTask() {
  const title = document.getElementById('task-title').value;
  const category = document.getElementById('task-category').value;
  const reminder = document.getElementById('task-reminder').value;

  if (!title || !reminder) {
    alert('Preencha o título e o lembrete!');
    return;
  }

  const newTask = { title, category, reminder };
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.push(newTask);
  localStorage.setItem('tasks', JSON.stringify(tasks));

  document.getElementById('task-title').value = '';
  document.getElementById('task-reminder').value = '';

  loadTasks();
}

function deleteTask(index) {
  const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
  tasks.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasks));
  loadTasks();
}

window.onload = loadTasks;
