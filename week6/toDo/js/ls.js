export {readFromLs, writeToLS};
//read a value from local storage and parse it as JSON @param {string} key The key under which the value is stored under in LS
function readFromLs(key, list){
    localStorage.setItem(key, JSON.stringify(list));
}
function writeToLS(key){
    JSON.parse(localStorage.getItem(key));
}