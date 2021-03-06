 // Quake View handler
 export class QuakesView {
  renderQuakeList(quakeList, listElement) {
    //build a list of the quakes...include the title and time of each quake then append the list to listElement. You should also add the id of the quake record as a data- property to the li. ie. <li data-id="">
    if(quakeList.features.length === 0){
      listElement.innerHTML = `No quakes found within this radius.`;
    } else {
      listElement.innerHTML = '';
      quakeList.features.forEach(element => {
        const item = document.createElement('li');
        //console.log(element);
        item.setAttribute('data-id',element.id);
        item.innerHTML = `${element.properties.title}
        <p>${new Date(element.properties.time)}</p>`;
        listElement.appendChild(item);
      })
    }
  }
    renderQuake(quake, element) {
      const quakeProperties = Object.entries(quake.properties);
      // for the provided quake make a list of each of the properties associated with it. Then append the list to the provided element. Notice the first line of this method. Object.entries() is a slick way to turn an object into an array so that we can iterate over it easier! 
      element.innerHTML = quakeProperties;
    }
  }