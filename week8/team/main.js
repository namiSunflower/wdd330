BASE_URL = 'https://swapi.dev/api';
API_URL = BASE_URL + '/people/'
const main = document.querySelector('main')

function getPeople(url){
    fetch(url).then(res => res.json().then(data =>{
        console.log(data);
        showPeople(data.results);
        NextPage(data);
        previousPage(data);
    } ))
}
getPeople(API_URL);

function showPeople(data){
    main.innerHTML = " "

    data.forEach(people => {
        const {name, height, mass, gender,skin_color, hair_color} = people;
        const peoplePop = document.createElement('div');
        peoplePop.classList.add('people');
        peoplePop.innerHTML = `
        <h3>Name:</h3>
        <p>${name}</p>
        <h3>height:</h3>
        <p>${height}</p>
        <h3>Mass:</h3>
        <p>${mass}</p>
        <h3 class="extraInfo">Gender:</h3>
        <p class="extraInfo">${gender}</p>
        <h3 class="extraInfo">Skin color:</h3>
        <p class="extraInfo">${skin_color}</p>
        <h3 class="extraInfo">Hair Color</h3>
        <p class="extraInfo">${hair_color}</p>
    `
    main.appendChild(peoplePop)    
    });
}

function NextPage(data){
    const nextBtn = document.createElement("button");
    nextBtn.innerText = 'Next Page';
    nextBtn.classList.add('next')
    main.appendChild(nextBtn);
    nextBtn.addEventListener('click', () =>{
        getPeople(data.next);
    })
}

function previousPage(data){
    const previousBtn = document.createElement("button");
    previousBtn.innerText = 'Previous Page';
    previousBtn.classList.add('next')
    main.appendChild(previousBtn);
    previousBtn.addEventListener('click', () =>{
        getPeople(data.previous);
    })
}

console.log(document.querySelector('main'));

// for (let item of document.querySelector('main')){
    
//     item.addEventListener("mouseover", () =>{
//         document.getElementsByClassName('extraInfo').style.display = "block";
//     });
    

// }

// Array.from(main.children).forEach((child, index) => {
//     // Do stuff
//     document.getElementsByClassName('extraInfo').style.display = "block";
//   });
  

