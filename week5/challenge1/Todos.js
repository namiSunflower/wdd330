class Hikes{
    constructor(elem,key){
        this.parentElement = document.getElementById(elem);
        this.key = key;
    }
    addTodo(){
        let task = document.querySelectorAll("input").value;
        let key = "key";
        return task, key;
    }
}

let todoList = null;
function saveStory(){
    var storyName = document.getElementById("name_input").value;
    var storyHTML = document.getElementById("story_editor").value;
    localStorage.setItem(storyName, storyHTML);
}