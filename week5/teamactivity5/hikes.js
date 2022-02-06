// Example of using Classes and modules to organize the code needed to render our list of hikes. Not using MVC here.

//create an array of hikes
const hikeList = [
    {
      name: "Bechler Falls",
      imgSrc: "falls.jpg",
      imgAlt: "Image of Bechler Falls",
      distance: "3 miles",
      difficulty: "Easy",
      description:
        "Beautiful short hike along the Bechler river to Bechler Falls",
      directions:
        "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road.Drive to the end of the Cave Falls road. There is a parking area at the trailhead."
    },
    {
      name: "Teton Canyon",
      imgSrc: "falls.jpg",
      imgAlt: "Image of Bechler Falls",
      distance: "3 miles",
      difficulty: "Easy",
      description: "Beautiful short (or long) hike through Teton Canyon.",
      directions:
        "Take Highway 33 East to Driggs. Turn left onto Teton Canyon Road. Follow that road for a few miles then turn right onto Stateline Road for a short distance, then left onto Alta Road. Veer right after Alta back onto Teton Canyon Road. There is a parking area at the trailhead."
    },
    {
      name: "Denanda Falls",
      imgSrc: "falls.jpg",
      imgAlt: "Image of Bechler Falls",
      distance: "7 miles",
      difficulty: "Moderate",
      description:
        "Beautiful hike through Bechler meadows river to Denanda Falls",
      directions:
        "Take Highway 20 north to Ashton. Turn right into the town and continue through. Follow that road for a few miles then turn left again onto the Cave Falls road. Drive to until you see the sign for Bechler Meadows on the left. Turn there. There is a parking area at the trailhead."
    }
  ];
  
  const imgBasePath = "//byui-cit.github.io/cit261/examples/";
//on load grab the array and insert it into the page

export default class Hikes {
    constructor(elementId) {
      this.parentElement = document.getElementById(elementId);
      // we need a back button to return back to the list. This will build it and hide it. When we need it we just need to remove the 'hidden' class
      
    }
     showHikeList() {
  const hikeListElement = document.getElementById("hikes");
  hikeListElement.innerHTML = "";
  renderHikeList(hikeList, hikeListElement);
}
}
function renderHikeList(hikes, parent) {
    hikes.forEach(hike => {
      parent.appendChild(renderOneHike(hike));
    });
  }
function renderOneHike(hike) {
    const item = document.createElement("li");
  
    item.innerHTML = ` <h2>${hike.name}</h2>
          <div id="flex"> 
          <div class="image"><img src="${imgBasePath}${hike.imgSrc}" alt="${hike.imgAlt}"></div>
          <div id="text">
                      <h3>Distance</h3>
                      <p>${hike.distance}</p>
                      <h3>Difficulty</h3>
                      <p>${hike.difficulty}</p>
                      <h3 class="hidden">Description</h3>
                      <p class="hidden">${hike.description}</p>
                      <h3 class="hidden">Directions</h3>
                      <p class= "hidden">${hike.directions}</p>
                  
          </div></div>`;
  
    return item;
  }
  document.querySelector("button").addEventListener("click", function(){
    //document.getElementsByClassName("hidden").style.display = "block";
    var elems = document.getElementsByClassName('hidden');
    for (var i=0;i<elems.length;i+=1){
        elems[i].style.display = 'block';
}
});
 
  function renderOneHikeFull(hike) {
    const item = document.createElement("li");
  
    return item;
  }