import Todos from './Todos.js';
let toDo= new Todos('tdList','todoList');
//Load event listeners
window.addEventListener('load', () => {
    toDo.listTodos();
    toDo.addFilterListeners();
  });
document.getElementById('add').addEventListener("click", toDo.addTodo.bind(toDo), false);


console.table(localStorage['todoList']);