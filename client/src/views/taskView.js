var TaskView = function(){
  this.tasks = [];
}

TaskView.prototype.addTask = function(task) {
  this.tasks.push(task);
  this.render(task);
}

TaskView.prototype.clear = function(task) {
  this.tasks = [];
  const ul = document.querySelector('#tasks');
  ul.innerHTML = '';
}

TaskView.prototype.render = function(task){
    const ul = document.querySelector('#tasks');
    const li = document.createElement('li');
    const text = document.createElement('p');
    text.innerText = `${task.task}\nDue: ${task.date}`;
    li.appendChild(text);
    ul.appendChild(li);
}

 module.exports = TaskView;
