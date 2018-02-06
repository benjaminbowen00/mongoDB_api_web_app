const TaskView = require('./views/taskView');
const Request = require('./services/request.js');

const taskView = new TaskView();
const request = new Request("http://localhost:3000/api/tasks")

const getTasksRequestComplete = function(allTasks)  {
  allTasks.forEach(function(task) {
      taskView.addTask(task);
    });
}
const createRequestComplete = function(task) {
   taskView.addTask(task);
}

const createButtonClicked = function(e) {
  e.preventDefault();
  console.log('form submit clicked');

  const taskInputValue = document.querySelector('#task').value;
  const dateInputValue = document.querySelector('#date').value;

  const body = {
    task: taskInputValue,
    date: dateInputValue
  };
  request.post(createRequestComplete, body);

}
const deleteButtonClicked = function(evt) {
  request.delete(deleteRequestComplete);
}

const deleteRequestComplete = function() {
  taskView.clear();
}

const app = function(){
  const deleteButton = document.querySelector('#deleteButton');
  deleteButton.addEventListener('click', deleteButtonClicked);

  const createQuoteButton = document.querySelector('#submit-task');
  createQuoteButton.addEventListener('click', createButtonClicked);

  request.get(getTasksRequestComplete);
}

document.addEventListener('DOMContentLoaded', app);
