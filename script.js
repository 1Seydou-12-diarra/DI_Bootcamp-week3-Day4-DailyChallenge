const tasks = [];
let taskId = 0;

function addTask() {
  if (document.getElementById('task').value === '') {
    return;
  }

  tasks.push({
    task_id: taskId,
    text: document.getElementById('task').value,
    done: false
  });
  taskId++;


  const listTasks = document.querySelector('.listTasks');
  const task = document.createElement('div');
  task.innerHTML = `
  <hr data-task-id="${taskId - 1}">
    <input type="checkbox"  class ="checkbox" data-task-id="${taskId - 1}"> ${document.getElementById('task').value}
    <button class="delete-button">X</button>
  `;
  listTasks.appendChild(task);

  
  document.getElementById('task').value = '';
}

document.getElementById('form').addEventListener('submit', (event) => {
  event.preventDefault();
  addTask();
});

function doneTask(event) {
  
  const taskId = event.target.dataset.taskId;

  
  const task = tasks.find((task) => task.task_id == taskId);
  task.done = !task.done;


  if (task.done) {
    event.target.parentElement.style.textDecoration = 'line-through';
    event.target.parentElement.style.color = 'red';
  } else {
    event.target.parentElement.style.textDecoration = 'none';
    event.target.parentElement.style.color = 'black';
  }
}

document.querySelector('.listTasks').addEventListener('click', (event) => {
  if (event.target.matches('input[type="checkbox"]')) {
    doneTask(event);
  }
});

function deleteTask(event) {
  
  const taskId = event.target.parentElement.querySelector('checkbox').dataset.taskId;
  const taskIndex = tasks.findIndex((task) => task.task_id == taskId);
  tasks.splice(taskIndex, 1);

  event.target.parentElement.remove();
}
