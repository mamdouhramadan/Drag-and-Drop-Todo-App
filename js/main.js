document.addEventListener('DOMContentLoaded', () => {
  const addTaskBtn = document.getElementById('addTaskBtn');
  const taskInput = document.getElementById('taskInput');
  const columns = document.querySelectorAll('.task-list');
  //=================================
  // Adding the tasks
  //=================================
  // 1- Add Task When Clicking the Button
  addTaskBtn.addEventListener('click', addTask);
  // 2- Add Task When Pressing the Enter Key
  taskInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTask();
  });

  function addTask() {
    // Remove the white spaces from the beginning and the end of the text
    const taskText = taskInput.value.trim();
    if (taskText === '') return;

    // Create a new task element "div.task" and append it to the "div#todoList"
    const task = document.createElement('div');
    task.className = 'task';
    task.draggable = true; // Make the task draggable by setting the "draggable" attribute to "true"
    task.textContent = taskText; // Set the text content of the task to the entered text

    // Add the drag events to the task
    task.addEventListener('dragstart', dragStart);
    // task.addEventListener('drag', drag);
    task.addEventListener('dragend', dragEnd);
    // Append the task to the "div#todoList" column
    document.getElementById('todoList').appendChild(task);
    // Clear the input field
    taskInput.value = '';
  }

  // Add the drag events to All Columns
  columns.forEach(column => {
    // Drag Over : Prevent the default behavior of the browser
    column.addEventListener('dragover', dragOver);
    // Drag Enter : Change the background color of the column
    column.addEventListener('dragenter', dragEnter);
    // Drag Leave : Change the background color of the column
    column.addEventListener('dragleave', dragLeave);
    // Drag Drop : Append the dragged task to the column
    column.addEventListener('drop', dragDrop);
  });

  // Drag Events Functions for the Tasks
  // Define a variable to store the dragged task
  let draggedTask = null;

  // Drag Start : Set the dragged task to the current task
  function dragStart() {
    draggedTask = this;
    setTimeout(() => { this.style.display = 'none'; }, 0);
  }

  function dragEnd() {
    setTimeout(() => {
      this.style.display = 'block';
      draggedTask = null;
    }, 0);
  }


  function dragOver(e) {
    e.preventDefault();
  }

  function dragEnter(e) {
    e.preventDefault();
    this.style.backgroundColor = '#f0f0f0';
  }

  function dragLeave() {
    this.style.backgroundColor = '#fff';
  }

  function dragDrop() {
    this.style.backgroundColor = '#fff';
    this.appendChild(draggedTask);
  }
});
