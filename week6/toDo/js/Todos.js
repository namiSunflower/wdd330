import * as ls from './ls.js'
import { qs } from './utilities.js';
export default class Todos{
    constructor(elem,key){
        this.parentElement = document.getElementById(elem);
        this.key = key;
    }
    addTodo(){
        let task = document.getElementById("task").value;
        let key = this.key;
        if(task){
            saveTodo(task, key);
            this.listTodos();
            console.table(todoList);
        }
    }

    addFilterListeners() {
        //filter tabs
        const listTabs = Array.from(qs('.filterButtons'));
        listTabs.forEach(tab => {
            tab.addEventListener('click', event => {
                for (let item in listTabs){
                    listTabs[item].classList.remove('active-button');
                }
                event.currentTarget.classList.add('active-button');
                this.filterList(event.currentTarget.id);
            })
        })

    }

    filterList(category){
        category = filterTasks(category);
        console.log(category);
        const filteredArray = todoList.filter(task => {
            if (category != 2){
                return task.completed == category;
            }
            else {
                return task;
            }
        })
        renderTodoList(filteredArray, this.parentElement);
        this.addEventListeners();
    }

    addEventListeners() {
        //Attach event listener for complete todo item 
        const itemList = Array.from(this.parentElement.children);
        console.log(itemList)
        if(itemList.length > 0 && itemList[0].children[0]){
            itemList.forEach(task => {
                task.children[0].addEventListener('click', event => {
                    completeTodo(this.key, event.currentTarget.id);
            })
                task.children[2].addEventListener('click', event => {
                    removeTodo(this.key,event.currentTarget.parentElement.children[0].id);
                    this.listTodos();
                
            })
        })}   
    }

    listTodos(){
        renderTodoList(getToDos(this.key), this.parentElement);
        if(todoList != null){
            this.addEventListeners();
        }
    }    
}

let todoList = [];

function completeTodo(key, itemId){
    //Checks if current selected task matches itemId when clicked
    let selectedTask= todoList.findIndex(task => task.id == itemId);
    //Testing purposes
    console.log(selectedTask);
    todoList[selectedTask].completed = !todoList[selectedTask].completed;
   
    ls.readFromLs(key, todoList)
    //localStorage.setItem('todoList', JSON.stringify(todoList));
    //console.table(localStorage['todoList']);
}


function saveTodo(task, key) {
    document.getElementById("tdList").innerHTML = "";
    const toDo = { 
        id : Date.now(), 
        content: task, 
        completed: false 
    };
    todoList.push(toDo); 
    ls.readFromLs(key, todoList)
    //localStorage.setItem(key, JSON.stringify(todoList));
 }

function removeTodo(key,itemId){
    let oneTask = todoList.findIndex(task => task.id == itemId);
    todoList.splice(oneTask, 1);
    ls.readFromLs(key, todoList)
    //localStorage.setItem(key, JSON.stringify(todoList));
}

function getToDos(key){
     let localList = [];
     if(!todoList.length){
         let tasks = ls.writeToLS(key);
         //let tasks = JSON.parse(localStorage.getItem(key));
         localList.push(tasks);
     }
     else{
         localList = todoList;
     }
     return localList;
 }

function renderTodoList(list, element){
     //clear list
    document.getElementById("tdList").innerHTML = "";
    if (todoList.length >0){
    list.forEach(task => {
        element.appendChild(renderTodo(task));
    });}
    else{
        const emptyList = document.createElement('li');
        emptyList.innerHTML = `Type task in the input box below.`
        element.appendChild(emptyList);
    }
    countTasks(todoList);
 }

//Go through to do list and display each task with the following format
 function renderTodo(task){
     const item = document.createElement("li");
     if(todoList.length > 0){
         task.completed ? item.classList.toggle('completed') : '';
         item.innerHTML = `<input id="${task.id}" name="${task.content}" type="checkbox" value="none"} ${task.completed ? 'checked' : ''}>
         <label for="${task.id}">${task.content}</label>
         <button id="remove">X</button>`;
         return item;
     }
}

//Filter list by pending, completed, or all
function filterTasks(category){
    switch(category){
        case 'pending':
            category = 0;
            break;
        case 'completed':
            category = 1;
            break;
        case 'all':
            category = 2;
            break;
    }
    return category;
}
function countTasks(list){
    const numOfTasks = document.getElementById('msg');
    numOfTasks.innerHTML = `${list.length} tasks left`;
}



