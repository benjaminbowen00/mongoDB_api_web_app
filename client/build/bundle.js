/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// identity function for calling harmony imports with the correct context
/******/ 	__webpack_require__.i = function(value) { return value; };
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 2);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports) {

const Request = function(url) {
  this.url = url;
}

Request.prototype.get = function(callback) {
  const request = new XMLHttpRequest();
  request.open('GET', this.url);
  request.addEventListener('load', function() {
    if(this.status!==200) {
      return;
    }

    const responseBody = JSON.parse(this.responseText);

    callback(responseBody);
  });
  request.send();
}

Request.prototype.post = function(callback, body) {
  const request = new XMLHttpRequest();
  request.open('POST', this.url);
  request.setRequestHeader('Content-Type', 'application/json');
  request.addEventListener('load', function() {
    if(this.status!==201) {
      return;
    }

    const responseBody = JSON.parse(this.responseText);

    callback(responseBody);
  });
   request.send(JSON.stringify(body));
}

Request.prototype.delete = function(callback) {
  const request = new XMLHttpRequest();
  request.open('DELETE', this.url);
  request.addEventListener('load', function() {
    if(this.status!==204) {
      return;
    }

    callback();
  });
  request.send();
}

module.exports = Request;


/***/ }),
/* 1 */,
/* 2 */
/***/ (function(module, exports, __webpack_require__) {

const TaskView = __webpack_require__(3);
const Request = __webpack_require__(0);

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


/***/ }),
/* 3 */
/***/ (function(module, exports) {

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


/***/ })
/******/ ]);
//# sourceMappingURL=bundle.js.map