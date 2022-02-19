// Example of using Classes and modules to organize the code needed to render our list of hikes. Not using MVC here.
//Create a new comments array;
let comments = [];
export default class Comments {
    constructor(type, hikeName) {
      this.type = type;
      this.hikeName = hikeName;
    }

    //This method will allow us to add a comment form the value in the input box
  addComment(key, commentName, comment){
    //create an array of hikes
    const newComment = {
      name: commentName,
      date: new Date(),
      content: comment
    };
    comments.push(newComment); 
     localStorage.setItem(key, JSON.stringify(comments));
  }
  // why is this function necessary?  hikeList is not exported, and so it cannot be seen outside of this module. I added this in case I ever need the list of hikes outside of the module. This also sets me up nicely if my data were to move. I can just change this method to the new source and everything will still work if I only access the data through this getter.
  getAllComments() {
    return comments;
  }
  // For the first stretch we will need to get just one hike.
  getCommentByName() {
    return this.getAllHikes().find(hike => hike.name === hikeName);
  }
  //show a list of hikes in the parentElement
  showCommentList() {
    //this.type.innerHTML = '';
    // notice that we use our getter above to grab the list instead of getting it directly...this makes it easier on us if our data source changes...
    renderCommentList(this.type, this.getAllComments());
    this.addHikeListener();
    // make sure the back button is hidden
    this.backButton.classList.add('hidden');
  }
  // show one hike with full details in the parentElement
  showOneHike(hikeName) {
    const hike = this.getHikeByName(hikeName);
    this.parentElement.innerHTML = '';
    this.parentElement.appendChild(renderOneHikeFull(hike));
    // show the back button
    this.backButton.classList.remove('hidden');
  }
  // in order to show the details of a hike ontouchend we will need to attach a listener AFTER the list of hikes has been built. The function below does that.
  addHikeListener() {
    // We need to loop through the children of our list and attach a listener to each, remember though that children is a nodeList...not an array. So in order to use something like a forEach we need to convert it to an array.
    const childrenArray = Array.from(this.parentElement.children);
    childrenArray.forEach(child => {
      child.addEventListener('touch', e => {
        // why currentTarget instead of target?
        this.showOneHike(e.currentTarget.dataset.name);
      });
    });
  }

  buildBackButton() {
    const backButton = document.createElement('button');
    backButton.innerHTML = '&lt;- All Hikes';
    backButton.addEventListener('click', () => {
      this.showHikeList();
    });
    backButton.classList.add('hidden');
    this.parentElement.before(backButton);
    return backButton;
  }

  // End of Hikes class
// methods responsible for building HTML.  Why aren't these in the class?  They don't really need to be, and by moving them outside of the exported class, they cannot be called outside the module...they become private.
renderCommentList(element, comments) {
  //click event on the hike display
  const commentList = document.createElement('ul');
  commentList.classList.add('comment-list');
  element.appendChild(commentList);
  //loop through the comments array
  comments.forEach(comment => {
    const commentItem = document.createElement('li');
    commentItem.classList.add('comment-item');
    commentItem.innerHTML = `
      <div class="comment-item__name">${comment.name}</div>
      <div class="comment-item__date">${comment.date}</div>
      <div class="comment-item__content">${comment.content}</div>
    `;
    commentList.appendChild(commentItem);
    //showallbtn
    const showAllBtn = document.createElement('button');
    showAllBtn.classList.add('show-all-btn');
    showAllBtn.innerHTML = 'Submit Comment';
    showAllBtn.addEventListener('click', () => {
    this.showCommentList();
    });
  });
}
}
function renderOneHikeLight(commentObject) {

  const item = document.createElement('li');
  item.classList.add('light');
  // setting this to make getting the details for a specific hike easier later.
  item.setAttribute('data-name', commentObject.name);
  item.innerHTML = ` <h2>${commentObject.name}</h2>
  <h3>${commentObject.date}</h3>
  <h3></

  <div class="image"><img src="${imgBasePath}${hike.imgSrc}" alt="${hike.imgAlt}"></div>
<div>
        <div>
            <h3>Distance</h3>
            <p>${hike.distance}</p>
        </div>
        <div>
            <h3>Difficulty</h3>
            <p>${hike.difficulty}</p>
        </div>
</div>`;
 

  return item;
}
function renderOneHikeFull(hike) {
  const item = document.createElement('li');
  item.innerHTML = ` 
    
        <img src="${imgBasePath}${hike.imgSrc}" alt="${hike.imgAlt}">
        <h2>${hike.name}</h2>
        <div>
            <h3>Distance</h3>
            <p>${hike.distance}</p>
        </div>
        <div>
            <h3>Difficulty</h3>
            <p>${hike.difficulty}</p>
        </div>
        <div>
            <h3>Description</h3>
            <p>${hike.description}</p>
        </div>
        <div>
            <h3>How to get there</h3>
            <p>${hike.directions}</p>
        </div>
    
    `;
  return item;
}

function filter_comment_array(hikeName, commentArray){
  //returns an array of the comments of the hikeName hike. 
  let commentList = [];

  for (let comment of commentArray ){
      if (comment.name === hikeName){
          commentList.push(comment);
      }
  }
  return commentList;
}


