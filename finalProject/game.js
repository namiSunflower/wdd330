const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}
//let rand = Math.floor(Math.random(9) * 1) 
let battleText = [
  "You have won the battle!", "Success! You've won!", "You have lost the battle!", "Unfortunately, you have lost the battle.."
];
//Encountered Pokemon
let pokeArray = [];
//Caught Pokemon
let caughtPokemon = []

let getIt =  async url =>{
  const result = await fetch(url);
  const data = result.json();
  data.then(elem =>{
      getName(elem);
      getType(elem);
      getImg(elem);
  })
}

function randomNum(){
  let num = Math.floor(Math.random() * 898) + 1;
  return num;
}

function getImg(elem){
  let imgPath;
  let percent = Math.random();
  if (percent < 0.25)
      //Shiny Pokemon
      imgPath = elem.sprites.front_shiny;
  else {
      //Regular Pokemon
      imgPath = elem.sprites.front_default;
  }
}

function getName(elem){
  let pokeName = {};
  let name = elem.name;
  // let name2 = name1.charAt(0).toUpperCase() + name1.slice(1);
  if(!pokeArray.find(element => element[name] == true)){
      pokeName[`${elem.name}`] = true;
      pokeArray.push(name);
      pokeArray.push(pokeName);
  }
}

function getType(elem){
  let type = {};
  if(elem.types.length > 1){
          let type0 = elem.types[0].type.name
          let type1 = elem.types[1].type.name
          console.log(type0)
          console.log(type1)
          if(!pokeArray.find(element => element[type0] == true) && !pokeArray.find(element => element[type1] == true)){
              type[`${elem.types[0].type.name}`] = true;
              type[`${elem.types[1].type.name}`] = true;
              pokeArray.push(type);
          }
          else if (!pokeArray.find(element => element[type0] == true) && pokeArray.find(element => element[type1] == true)) 
          {
              type[`${elem.types[0].type.name}`] = true;
              pokeArray.push(type)
          }
          else if (!pokeArray.find(element => element[type1] == true) && pokeArray.find(element => element[type0] == true)) 
          {
              type[`${elem.types[1].type.name}`] = true;
              pokeArray.push(type)
          }
      }
      else{
          let type0 = elem.types[0].type.name
          if(!pokeArray.find(element => element[type0] == true)){
              type[`${elem.types[0].type.name}`] = true;
              pokeArray.push(type);
          }
      }
      localStorage.setItem("pokemonList", JSON.stringify(pokeArray));    
}

function catchPokemon(index){
  let percent = Math.random();
  if (percent < 0.25){
      //Did not catch Pokemon
      return `After throwing a Pokeball... Oh no! The pokemon broke free and ran away!`;
  }
  else {
      //Caught Pokemon
      for(let i=index; i<3; i++){
        caughtPokemon.push(JSON.parse(localStorage.getItem("pokemonList"))[i]);
      }
      return `You have successfully caught the Pokemon!`;
  }
}

function displayImg(imgPath){
  const img = document.createElement('img');
  img.src = imgPath;
  const div = document.getElementById('placeholder');
  div.append(img);
}
function startGame() {
  // pokeArray = JSON.parse(localStorage.getItem("e"));
   state = {}
   localStorage.setItem("story", JSON.stringify(textNodes));
  //  if(parseInt(localStorage.getItem("currentText")) < 1){
     showTextNode(65);
  //  }
  //  else{
  //   showTextNode(parseInt(localStorage.getItem("currentText")));
  //  }
}

function showTextNode(textNodeIndex) {
  const textNode = textNodes.find(textNode => textNode.id === textNodeIndex);
  textElement.innerText = textNode.text;
  while (optionButtonsElement.firstChild) {
    optionButtonsElement.removeChild(optionButtonsElement.firstChild);
  }

  console.log(textNode);
  textNode.options.forEach(option => {
    if (showOption(option)) {
      const button = document.createElement('button');
      console.log(option.requiredState);
      button.innerText = option.text;
      button.classList.add('btn');
      button.addEventListener('click', () => selectOption(option));
      optionButtonsElement.appendChild(button);
    }
  })
}

function showOption(option) {
  return option.requiredState == null || option.requiredState(JSON.parse(localStorage.getItem("state")));
}

function selectOption(option) {
  const nextTextNodeId = option.nextText;
  //saveToLs("currentText", nextTextNodeId);
  localStorage.setItem("currentText", nextTextNodeId);
  const currentOne = parseInt(localStorage.getItem("currentText"));
  if (currentOne <= 0) {
    return startGame();
  }
  else if(currentOne == 65 || currentOne == 67){
    const baseURl = "https://pokeapi.co/api/v2/pokemon-form/";
    const completeURL = baseURl + randomNum() + "/";
    // randomNum();
    getIt(completeURL);
  }
  console.log(currentOne);
  localStorage.setItem("currentState", JSON.stringify(option.setState));
  if(JSON.parse(localStorage.getItem("currentState") != "undefined")){
    state = Object.assign(state, JSON.parse(localStorage.getItem("currentState")))
  }
  localStorage.setItem("state", JSON.stringify(state));
  showTextNode(parseInt(localStorage.getItem("currentText")));
}

function saveToLs(key, value){
    localStorage.setItem(key, value);
}

function retrieveFromLs(key){ 
  parseInt(localStorage.getItem(key));
}

let pokemon= JSON.parse(localStorage.getItem("pokemonList"));


const textNodes = [
  {
    id: 1,
    text: `*Alarm clock starts ringing*`,
    options: [
      {
        text: 'Stop alarm',
        nextText: 2,
      }
    ]
  },
  {
    id: 2,
    text: `You reach for your alarm clock and press the button to turn off the loud ringing. Normally, you'd snooze the alarm and sleep for a few more minutes before officially turning off the alarm clock.`,
    options: [
      {
        text: 'Continue',
        nextText: 3
      }
    ]
  },
  {
    id: 3,
    text: `But this day is different. You were surprised how you were even able to fall asleep last night since you were feeling too excited by what's to come today. All your friends will come by to join and celebrate because today is your birthday!`,
    options: [
      {
        text: 'Continue',
        nextText: 4
      }
    ]
  },
  {
    id: 4,
    text: `And it's not just any normal birthday! Today is officially your 10th birthday, the day that you've been excitedly anticipating for throughout all these years ever since you first learned about Pokemon trainers. Today marks the day when you can finally venture out into the world to become the very best Pokemon trainer!`,
    options: [
      {
        text: 'Head downstairs',
        nextText: 5
      }
    ]
  },
  {
    id: 5,
    text: `You get up without any hesitation and hurriedly run downstairs to greet your mom. After reaching the first floor, you immediately notice the scent of pancakes and buttery goodness wafting through the air. You quickly head towards the kitchen to greet your mom.`,
    options: [
      {
        text: 'Continue',
        nextText: 6
      }
    ]
  },
  {
    id: 6,
    text: `Your eyes are immediately caught by the sight of pancakes drizzled with maple syrup and stacked neatly on a plate, placed on top of the kitchen table. On your left, you see your mom busily flipping some more pancakes by the stove. You greet her, but she doesn't seem to notice.`,
    options: [
      {
        text: 'Greet her again a little louder',
        nextText: 7
      }
    ]
  },
  {
    id: 7,
    text: `She was momentarily taken aback by your greeting and turns around to face you. "Oh! I didn't know you've waken up already!", she replies. Then, she quickly turns again to turn the stove's heat to the lowest setting and faces you once more to start singing Happy Birthday!`,
    options: [
      {
        text: `"Thanks Mom! I'm really excited to start eating those pancakes!"`,
        nextText: 9
      },
      {
        text: `"Thanks Mom! I'm really excited to finally have my very first Pokemon!"`,
        nextText: 9
      },
      {
        text: `"Thanks Mom! I'm just excited for my friends to come over and celebrate!"`,
        nextText: 9
      }
    ]
  },
  {
    id: 9,
    text: `"Of course, before doing anything else, we should eat some breakfast first!", she exclaimed. "I'm sure you're very hungry right now", she continued. "Don't worry! Before long, you'll finally choose your Pokemon in Prof. Oak's lab!"`,
    options: [
      {
        text: `Eat breakfast`,
        nextText: 10
      }
    ]
  },
  {
    id: 10,
    text: `You sit beside your mom and start eating breakfast together. After a couple minutes have passed, you feel you are now ready to head straight to Prof. Oak's lab to choose your first Pokemon! You let your mom know about your plans, and she gives you the go signal to visit Prof. Oak.`,
    options: [
      {
        text: "Great! Off to the lab then!",
        nextText: 11
      }
    ]
  },
  {
    id: 11,
    text: `"You have to make sure to give your dad a call first though!", your mom tells you after preparing to head outside. Your dad is a Pokedetective who's well-known within your region! He helped solve a big case by uncovering one of TEAM ROCKET'S hidden bases and rescuing 50 SLOWPOKES.`,
    options: [
      {
        text: "What's Team Rocket?",
        nextText: 12
      },
      {
        text: "What's a Slowpoke?",
        nextText: 13
      },
      {
        text: "Continue",
        nextText: 14
      },
    ]
  },
  {
    id: 12,
    text: `Team Rocket is a notorious criminal organization whose primary objective is to steal all the Pokemon and rule the world.`,
    options: [
      {
        text: "What's a Slowpoke?",
        nextText: 13
      },
      {
        text: "Continue",
        nextText: 14
      }
    ]
  },
  {
    id: 13,
    text: `You first learned from school that a Slowpoke is a type of water and psychic Pokemon. Although Slowpokes are quite common and intellectually slow, their tails are highly valuable in black markets. Team Rocket is after their tails solely for profit to become more powerful.`,
    options: [
      {
        text: "What's Team Rocket?",
        nextText: 12
      },
      {
        text: "Continue",
        nextText: 14
      }
    ]
  },
  {
    id: 14,
    text: `If it weren't for your dad, those Slowpokes would forever become hostages in Team Rocket's secret hideout since Slowpokes have the ability to grow back their tails. Your dad was later awarded by the mayor for his heroic discovery and immediately promoted to become the Lead Pokemon Detective. Although you and your mom are extremely proud of your dad, you both also miss him a lot.`,
    options: [
      {
        text: "Continue",
        nextText: 15
      }
    ]
  },
  {
    id: 15,
    text: `As the Lead Pokemon Detective, your dad is often assigned to handle difficult and dangerous cases all across different regions and countries. Currently, your dad is temporarily staying in Australia to solve the mystery about changes in Pelippers' migration patterns.`, 
    options: [
      {
        text: "What are Pelippers?",
        nextText: 16
      },
      {
        text: "Continue",
        nextText: 17
      },
    ]
  },
  {
    id: 16,
    text: `A Pelipper is a flying and water type Pokemon that closely resembles a pelican. It is said that there are more Pelippers than the entire human population in Australia. They are so common that Australia is now considering to make Pelippers as their national Pokemon.`, 
    options: [
      {
        text: "Continue",
        nextText: 17
      },
    ]
  },
  {
    id: 17,
    text: `After stepping outside the door, you rush towards your bicycle and start pedalling to Prof. Oak's lab. His lab is only a few blocks away from your home, so you know you'll reach your destination in under five minutes. Your mind is quickly filled by thoughts of different Pokemon you could get! You don't really have a particular favorite Pokemon, so you know you'd completely love and accept any Pokemon given to you.`, 
    options: [
      {
        text: "Reach Prof. Oak's lab",
        nextText: 18,
      }
    ]
  },
  {
    id: 18,
    text: `Finally! You've reached Prof. Oak's lab! It's a pretty simple lab as it was once a barn for Mareep (sheep Pokemon). Prof. Oak and the previous property owner were very good friends until the previous owner soon had to retire from tending sheep, and he had decided to hand over the property rights to Pro. Oak because of their strong friendship. You press the doorbell for a few seconds, and the door opens to reveal Prof. Oak's grandson, Gary, standing in front of you.`, 
    options: [
      {
        text: "Greet Gary",
        nextText: 19,
      }
    ]
  },
  {
    id: 19,
    text: `"Well hey, looks like a wild loser has appeared!", Gary replies. He suddenly starts to burst in laughter. "I was just playing with you!"`, 
    options: [
      {
        text: "Very funny Gary. Ha. Ha.",
        nextText: 20,
      }
    ]
  },
  {
    id: 20,
    text: `"Oh, come on! As if I'm going to ruin the day by talking to you! Besides, we're both getting our first Pokemon at the same time as Gramps says. I've been waiting for this day for all my life to finally beat you and everyone else to be the best Pokemon trainer ever!"`, 
    options: [
      {
        text: "Ignore and hit him with the silent treatment.",
        nextText: 21,
      },
      {
        text: "You're getting it all wrong. I'll be the one beating you!",
        nextText: 22,
      }
    ]
  },
  {
    id: 21,
    text: `Just as Gary mentioned, you also can't afford to ruin your birthday by letting him get to you. You hit him with the silent treatment. He didn't like that at all and starts insulting you again. You continue ignoring him until he gives up and leaves by returning back inside his grandpa's lab.`, 
    options: [
      {
        text: "Go look for Prof. Oak",
        nextText: 23,
      }
    ]
  },
  {
    id: 22,
    text: `Gary didn't like that comment at all and starts bragging about the small Pokemon contests he has participated in. He has lost in all of those contests, but he still feels he's superior compared to other kids his age for having the guts to join in these contests without having a Pokemon. You tell him how you have no time for this non-sense, and he gives up and makes way for you to pass through the entrance door.`, 
    options: [
      {
        text: "Go look for Prof. Oak",
        nextText: 23,
      }
    ]
  },
  {
    id: 23,
    text: `You scan your surroundings and to your right, you see scientists and trainers using some of the lab's machines and apparatuses. To your left, you see several Pokemon inside some large dome-shaped machines with glass doors, while the other Pokemon are using exercise machines. Some of the bipedal Pokemon are running on treadmills, designed specifically to test their agility. "Are you ready to choose a Pokemon?"`, 
    options: [
      {
        text: `Yes Prof. Oak!!!`,
        nextText: 24,
      }
    ]
  },
  {
    id: 24,
    text: `You've been distracted by the Pokemon exercising that you didn't even hear Prof. Oak approaching you. He stands in front of you smiling and says, "Right this way please." You can't help but feel both extremely excited and nervous at the same time.`, 
    options: [
      {
        text: `Follow Prof. Oak`,
        nextText: 25,
      }
    ]
  },
  {
    id: 25,
    text: `You follow Prof. Oak and he leads you by walking straight ahead, and occassionally stopping by to be greeted by the other scientists or trainers. You reach the upper-right corner of the lab and see a large table with three Pokeballs.`, 
    options: [
      {
        text: `Continue`,
        nextText: 26,
      }
    ]
  },
  {
    id: 26,
    text: `Take a peek inside each of the Pokeballs in front of you and go ahead and start choosing one!`, 
    options: [
      {
        text: `Examine each Pokeball`,
        nextText: 27,
      }
    ]
  },
  {
    id: 27,
    text: `Inside the first Pokeball on the left is a green Bulbasaur. A Bulbasaur is a grass-type Pokemon, which means it's effective against water-type Pokemon but very weak against fire types. You also see a tiny blue Squirtle in the center Pokeball. A Squirtle is a water-type Pokemon that's powerful against fire types but weak against grass types. And finally, to your right, is an orange Charmander with its flaming tail. Charmanders are fire type in nature and are strong against grass-types and weak against water. So what will you choose?`, 
    //image: ,
    options: [
      {
        text: `Bulbasaur!`,
        setState: {Bulbasaur: true, Squirtle: false, Charmander: false, grass: true, water: false, fire: false},
        nextText: 28,
      },
      {
        text: `Squirtle!`,
        setState: {Bulbasaur: false, Squirtle: true, Charmander: false, grass: false, water: true, fire: false},
        nextText: 29,
      },
      {
        text: `Charmander!`,
        setState: {Bulbasaur: true, Squirtle: false, Charmander: false, grass: false, water: false, fire: true},
        nextText: 30,
      },
    ]
  },
  {
    id: 28,
    text: `Good choice! Your Bulbasaur leaps out of its Pokeball because of joy, and you carry it in your arms and start petting its back. "Saur!", your Bulbasaur exlaims, and you knew immediately it has taken a fond liking of you.`, 
    image: "/finalProject/bulbasaur.png",
    options: [
      {
        text: `Continue`,
        nextText: 31,
      },
    ]
  },
  {
    id: 29,
    text: `Good choice! Your Squirtle leaps out of its Pokeball because of joy, and you carry it in your arms and start rubbing its belly. "Squirtle!", your Bulbasaur exclaims, and you knew immediately it has taken a fond liking of you.`, 
    //image: "/finalProject/bulbasaur.png",
    options: [
      {
        text: `Continue`,
        nextText: 31,
      },
    ]
  },
  {
    id: 30,
    text: `Good choice! Your Charmander leaps out of its Pokeball because of joy, and you carry it in your arms and start patting its head. "Char!", your Charmander exclaims, and you knew immediately it has taken a fond liking of you.`, 
    //image: "/finalProject/bulbasaur.png",
    options: [
      {
        text: `Continue`,
        nextText: 31,
      },
    ]
  },
  {
    id: 31,
    text: `"You've made an excellent choice! And it looks like your Pokemon likes you a lot already!", Prof. Oak says. "Make sure to always take care of your Pokemon and help it get stronger by feeding it with berries it likes and letting it battle with other Pokemon too! As for the rest of the Pokeballs, I'll be handing them to the other new trainers, so they can also choose which Pokemon they like." Just then, your Pokemon disappears and goes back to its Pokeball! It looks like it got startled by something!`, 
    //image: "/finalProject/bulbasaur.png",
    options: [
      {
        text: `Continue`,
        nextText: 32,
      },
    ]
  },
  {
    id: 32,
    text: `"Stop right there!" You hear someone shouting behind you. "Gramps! I also want a Pokemon! It's not fair, and I should've been the first one to choose!", you turn around and realize it was Gary shouting. "Now, now, Gary. Be patient to wait for your turn. But, you may also start choosing now." Gary, turns to you and asks you what Pokemon you've chosen.`,
    options: [
      {
        requiredState: (currentState) => currentState.Bulbasaur,
        text: `Bulbasaur`,
        nextText: 34,
      },
      {
        requiredState: (currentState) => currentState.Squirtle,
        text: `Squirtle`,
        nextText: 35,
      },
      {
        requiredState: (currentState) => currentState.Charmander,
        text: `Charmander`,
        nextText: 36,
      },
      {
        text: `As if I should tell you..`,
        nextText: 33,
      }
    ]
  },
  {
    id: 33,
    text: `"Hmph! I was just curious, no need to be so rude!" After Gary says that, you start to feel quite bad..`,
    options: [
      {
        requiredState: (currentState) => currentState.Bulbasaur,
        text: `Bulbasaur`,
        nextText: 34,
      },
      {
        requiredState: (currentState) => currentState.Squirtle,
        text: `Squirtle`,
        nextText: 35,
      },
      {
        requiredState: (currentState) => currentState.Charmander,
        text: `Charmander`,
        nextText: 36,
      }
    ]
  },
  {
    id: 34,
    text: `"Never knew you had a great taste in strong Pokemon. Well in that case... Gramps I'll be taking the Charmander!`,
    options: [
      {
        text: `"Hey, that's not f—"`,
        nextText: 37,
      },
    ]
  },
  {
    id: 35,
    text: `"Never knew you had a great taste in strong Pokemon. Well in that case... Gramps I'll be taking the Bulbasaur!`,
    options: [
      {
        text: `"Hey, that's not f—"`,
        nextText: 38,
      },
    ]
  },
  {
    id: 36,
    text: `"Never knew you had a great taste in strong Pokemon. Well in that case... Gramps I'll be taking the Squirtle!"`,
    options: [
      {
        text: `"Hey, that's not f—"`,
        nextText: 39,
      },
    ]
  },
  {
    id: 37,
    text: `But before you could finish your sentence, he quickly grabs the Pokeball containing the Charmander. The Charmander leaps out of its Pokeball just like what you first witnessed when you claimed your Pokemon. "I don't approve what you've done Gary, but it looks like the Charmander now recognizes you as its owner", Prof. Oak explains. The Charmander spreads both of its arms open and faces Gary as if it were trying to hug him. "Dude, save the hugs for later, first we have to battle our #1 hater!"`,
    options: [
      {
        text: `"Wait.. are you talking about me?"`,
        nextText: 40,
      },
      {
        text: `"Bring it on!"`,
        nextText: 41,
      },
    ]
  },
  {
    id: 38,
    text: `But before you could finish your sentence, he quickly grabs the Pokeball containing the Bulbasaur. The Bulbasaur leaps out of its Pokeball just like what you first witnessed when you claimed your Pokemon. "I don't approve what you've done Gary, but it looks like the Bulbasaur now recognizes you as its owner", Prof. Oak explains. The Bulbasaur spreads both of its arms open and faces Gary as if it were trying to hug him. "Dude, save the hugs for later, first we have to battle our #1 hater!"`,
    options: [
      {
        text: `"Wait.. are you talking about me?"`,
        nextText: 40,
      },
      {
        text: `"Bring it on!"`,
        nextText: 41,
      },
    ]
  },
  {
    id: 39,
    text: `But before you could finish your sentence, he quickly grabs the Pokeball containing the Squirtle. The Squirtle leaps out of its Pokeball just like what you first witnessed when you claimed your Pokemon. "I don't approve what you've done Gary, but it looks like the Squirtle now recognizes you as its owner", Prof. Oak explains. The Squirtle spreads both of its arms open and faces Gary as if it were trying to hug him. "Dude, save the hugs for later, first we have to battle our #1 hater!"`,
    options: [
      {
        text: `"Wait.. are you talking about me?"`,
        nextText: 40,
      },
      {
        text: `"Bring it on!"`,
        nextText: 41,
      },
    ]
  },
  {
    id: 40,
    text: `"Obviously! Who else would I be talking about?" His Pokemon starts facing you and changes its position to a battle stance. "I may not agree with most of Gary's antics, but I think it'll be a good idea for you to practice battling with your Pokemon", you hear Prof. Oak tell you.`,
    options: [
      {
        text: `"Enter battle!"`,
        nextText: 42,
      },
    ]
  },
  {
    id: 41,
    text: `His Pokemon starts facing you and changes its position to a battle stance. "This is a great opportunity for you to practice battling with your Pokemon", you hear Prof. Oak tell you.`,
    options: [
      {
        text: `"Enter battle!"`,
        nextText: 42,
      },
    ]
  },
  {
    id: 42,
    text: `Your Pokemon comes out of its Pokeball again, looking confident and ready to face Gary's Pokemon. Since your Pokemon outspeeds Gary's you choose your first move. You start thinking of an attack, then suddenly... *Poof!* "What the—?", you think to yourself.`,
    options: [
      {
        text: `Gary's Pokemon just disappeared!`,
        nextText: 43,
      },
    ]
  },
  {
    id: 43,
    text: `You examine the room and find out you were right. Gary's Pokemon just disappeared while you were thinking of a battle move for your Pokemon to do. "Whaaaaaattt!?", Gary screams. "Where's my Pokemon!? Gramps, you must know where it went!" Gary starts to take a look inside his Pokeball, but the look of his face tells you that it's not there either. You take a look inside your own Pokeball as well, but you only see your own Pokemon that returned after hearing Gary's Pokemon disappeared.`, 
    options: [
      {
        text: `Continue`,
        nextText: 44,
      },
    ]
  },
  {
    id: 44,
    text: `Your Pokemon probably got frightened at the thought of vanishing without explanation as well. "We just received urgent news from the head researchers from the Hoenn region of five Pokemon suddenly disappearing!" you realize it's one of the scientists working alongside Prof. Oak in his lab. You start to panic after hearing the news, and you see Gary looking as if he were about to cry.`, 
    options: [
      {
        text: `Continue`,
        nextText: 45,
      },
    ]
  },
  {
    id: 45,
    text: `Prof. Oak stays completely silent but his face also seems to be full of shock as his mouth is left wide open and his eyes, fixated on the spot where Gary's Pokemon was last seen. It takes about two seconds until Prof. Oak tries gathering himself again mentally. "We've also witnessed my grandson's Pokemon disappear" he replies, looking very dejected.`, 
    options: [
      {
        text: `Continue`,
        nextText: 46,
      },
    ]
  },
  {
    id: 46,
    text: `The scientist who first brought the news gasps after hearing Prof. Oak speak. He then proceeds to explain more that the sudden disappearances have just started happening today. The strange phenomenon is also happening globally as other countries have faced the same plight.`, 
    options: [
      {
        text: `Continue`,
        nextText: 47,
      },
    ]
  },
  {
    id: 47,
    text: `"The only lead we have so far is that the disappearances are not exclusive to only one particular country. The first disappearance happened in Egypt, then in Canada, and it also happened in Australia just a minute ago. The rest of the disappearances happened in this country, but we can't seem to find a connection between all of the countries that have experienced this phenomenon."`, 
    options: [
      {
        text: `Did he say Australia too?`,
        nextText: 48,
      },
    ]
  },
  {
    id: 48,
    text: `After hearing him mention about Australia, you feel the urge to start calling your dad and asking him about this strange event. But, you decided against it since it looked like Prof. Oak was about to speak his mind, and you wanted to hear his response first.`, 
    options: [
      {
        text: `Continue`,
        nextText: 49,
      },
    ]
  },
  {
    id: 49,
    text: `"I'm certain there is a valid explanation behind all of these," Prof. Oak replied. "But we have to act quickly and find the missing Pokemon to prevent other Pokemon from disappearing. I will contact the other brilliant researchers and scientists I know from other countries to sort this problem ASAP." Prof Oak then proceeds to come closer to Gary. "Gary, it'll be all right! Your Gramps will find your Pokemon and the rest of the missing Pokemon with the help of other scientists all over the world", he reassures Gary.`, 
    options: [
      {
        text: `Continue`,
        nextText: 50,
      },
    ]
  },
  {
    id: 50,
    text: `Prof. Oak's reassurance seemed to have helped lift up Gary's mood. He now looked determined to get his Pokemon back. "I'm sure you'll find it Gramps and the other people's Pokemon too, so I can finally show off my amazing Pokemon skills!", Gary responds.`, 
    options: [
      {
        text: `Agree with Gary`,
        nextText: 51,
      },
    ]
  },
  {
    id: 51,
    text: `Although Gary has always been your long-time rival, and well, everyone else's rival, you know that he's also as passionate as you when it comes to becoming a Pokemon trainer. You can't help but feel bad about his missing Pokemon and want to help him find it too. Gary smirks and tells you to look out for your Pokemon too or else he won't be able to beat it in a Pokebattle.`, 
    options: [
      {
        text: `Continue`,
        nextText: 52,
      },
    ]
  },
  {
    id: 52,
    text: `All of a sudden, you are surprised to see your phone ringing by a call from your dad! "Is your Pokemon still with you?", you hear your dad say as you answer his call immediately. You quickly explain to your dad everything that has happened. Your dad responds that the police are already in charge of solving the mystery as well. They've only just learned the news that it has started happening in other countries too.`, 
    options: [
      {
        text: `Continue`,
        nextText: 53,
      },
    ]
  },
  {
    id: 53,
    text: `You find out that the police would love to coordinate with the brilliant scientists and researchers to help get closer to solving the case. He reveals that he also a DNA of the legendary Pokemon, Mew.`, 
    options: [
      {
        text: `Continue`,
        nextText: 54,
      },
    ]
  },
  {
    id: 54,
    text: `Once the researchers and scientists learn about this, they mention that Mew's DNA would be extremely valuable for research as it may lead to uncovering clues of Pokemon's genetic patterns that are more prone to this disappearance. "The only problem is, I've left the DNA in my office there in Kanto", your dad explains.`, 
    options: [
      {
        text: `Continue`,
        nextText: 55,
      },
    ]
  },
  {
    id: 55,
    text: `You realize that the office your dad mentions is not that far away from the lab and your home. You only have to pass Viridian Forest, which is full of wild Pokemon, and reach Pewter City where your dad's office is located.`, 
    options: [
      {
        text: `Continue`,
        nextText: 56,
      },
    ]
  },
  {
    id: 56,
    text: `"The office door is also locked, and I've left the key to it back home before I went to Australia. I would ask other colleagues in the police force to do it, but all the other detectives and investigators are not near in Kanto region at all", you hear your dad explain further.`, 
    options: [
      {
        text: `I'll unlock the office and get it then!`,
        nextText: 57,
      },
    ]
  },
  {
    id: 57,
    text: `You suddenly realize that that you could help execute this crucial task to save Pokemon! Your dad trusts you, so he doesn't even hesitate to agreeing with your suggestion. You also explain it to Prof. Oak and the scientist, and they seem to all seem to agree unanimously with your mission.`, 
    options: [
      {
        text: `Time to save the Pokemon!`,
        nextText: 58,
      },
    ]
  },
  {
    id: 57,
    text: `You end the call with your dad. "Wait, before you go I have something to give you" Prof. Oak mentions. He opens one of the drawers in his private office and seems to have grabbed a tribal necklace of some sort. You get a better view of the neclace as he hands it to you. "This is an ancient talisman said to have been crafted and worn by the legendary Pokemon, Lunala."`, 
    options: [
      {
        text: `Examine talisman`,
        nextText: 58,
      },
    ]
  },
  {
    id: 58,
    text: `You examine the talisman in your hand and notice that the pendant is made of gold and in the center is what appears to be a green gem of some sort. You figure it must be an emerald because of its color and your limited knowledge of gemstones in general. "I have enough reason to believe that, that talisman can help protect your Pokemon from vanishing as well" Prof. Oak says.`, 
    options: [
      {
        text: `Continue`,
        nextText: 59,
      },
    ]
  },
  {
    id: 59,
    text: `"That talisman is powerful and can emit an aura of protection to the wearer" Prof. Oak continues. "That's why I have kept it hidden and only to be used in special tricky situations such as this. I advise you to let your Pokemon wear it now before you start you travel."`, 
    options: [
      {
        text: `Have Pokemon wear talisman`,
        nextText: 60,
      },
    ]
  },
  {
    id: 60,
    text: `You let your Pokemon out from the Pokeball and the Pokemon appears in front of you. You place the necklace for the Pokemon to wear and it seems to feel secure in wearing it. Prof. Oak then gives you three Pokeballs, in case you want to catch wild Pokemon of your own and recruit it in your team.`, 
    options: [
      {
        text: `Continue`,
        nextText: 61,
      },
    ]
  },
  {
    id: 61,
    text: `"Your first Pokemon is already part of your team, but you may catch other Pokemon in the wild in case you find yourself in unexpected battles. There's a chance that the caught Pokemon will also disappear, but it's a risk we have no choice but to take." "Unfortunately, I don't have any other Pokeballs to spare and give you, but I believe three Pokeballs will be enough in your journey", Prof. Oak continues.`, 
    options: [
      {
        text: `Start adventure`,
        nextText: 62,
      },
    ]
  },
  {
    id: 62,
    text: `After all the explanations have been said, you tell your Pokemon to return back to its Pokeball and decide to start leaving the lab. The scientists and researchers give you a motivating message that they all believe in you before you head outside and ride your bicycle.`, 
    options: [
      {
        text: `Continue`,
        nextText: 63,
      },
    ]
  },
  {
    id: 63,
    text: `You first head to your home and find that your mom is already readily waiting for your arrival with the key in her hand by the door. It turns out she has already been informed by your dad about your mission. You take the key and your mom tells you to be careful of the wild Pokemon in Viridian Forest.`, 
    options: [
      {
        text: `Head to Viridian Forest`,
        nextText: 64,
      },
    ]
  },
  {
    id: 64,
    text: `You reach Viridian Forest and discover it's filled with very tall grass. There's no other way to reach Pewter City but to also cross the areas filled with tall grass. You've been warned many times by your teachers not to get close to the tall grass since that is where wild Pokemon can be found, and most of the wild Pokemon are territorial and can start attacking you any time. Since you have your first Pokemon with you, you feel safer knowing that it can help you while engaging in these unexpected battles with the wild Pokemon. You also think to yourself that you might even have the chance to catch new Pokemon in the process too.`, 
    options: [
      {
        text: `Trudge carefully and forward towards the tall grass`,
        nextText: 65,
      },
    ]
  },
  {
    id: 65,
    text: `You hope for the best and carefully enter the tall grass. It takes a while for you to know where you're going, but eventually you adapt to the new environment and start heading the direction to Pewter City through the grass. But all of a sudden..`, 
    options: [
      {
        text: `Trudge carefully and forward towards the tall grass`,
        nextText: 66,
      },
    ]
  },
  {
    id: 66,
    text: `A wild ${pokemon[0]} has appeared!`, 
    options: [
      {
        text: `Catch pokemon!`,
        nextText: 67,
      },
      {
        text: `Battle!`,
        nextText: 68,
      },
    ]
  },
  {
    id: 67,
    text: `${catchPokemon(0)}`, 
    options: [
      {
        text: `Continue`,
        nextText: 69,
      },

    ]
  },
  {
    id: 68,
    text: `You were able to successfully defeat the Pokemon!`, 
    options: [
      {
        text: `Continue`,
        nextText: 69,
      },

    ]
  },
  {
    id: 69,
    text: `It felt as if there was no end to your walks, but finally, you saw a clearing with a bright light ahead. You follow the path and reach Pewter City!`, 
    options: [
      {
        text: `Continue`,
        nextText: 70,
      },

    ]
  },
  {
    id: 70,
    text: `As you step foot inside the city, you remember the museum you've visited a few years ago for a school field-trip. You see the museum, and you also notice Brock's gym nearby. A Pokemon gym is where trainers have to participate in and earn badges. When you defeat the champion from a particular gym, you can earn a badge. You need to earn eight badges in order to challenge the Elite Four, the toughest group of the best regional Pokemon trainers!`, 
    options: [
      {
        text: `Continue`,
        nextText: 71,
      },

    ]
  },
  {
    id: 71,
    text: `And once you defeat the Elite Four, it's up to you if you still want to continue battling trainers, becoming a Pokemon gym leader, or catching every type of Pokemon out there!`, 
    options: [
      {
        text: `Continue`,
        nextText: 72,
      },

    ]
  },
  {
    id: 72,
    text: `You spend a moment daydreaming about being the best Pokemon trainer, but you also `, 
    options: [
      {
        text: `Continue`,
        nextText: 72,
      },

    ]
  },
]

startGame();
