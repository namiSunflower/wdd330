const textElement = document.getElementById('text')
const optionButtonsElement = document.getElementById('option-buttons')

let state = {}
//Encountered Pokemon
let pokeArray = [];
//Caught Pokemon
let caughtPokemon = [];



let getIt =  async url =>{
  const result = await fetch(url);
  const data = result.json();
  data.then(elem =>{
      getName(elem);
      // getImg(elem);
  })
}

const baseURl = "https://pokeapi.co/api/v2/pokemon-form/";
const completeURL = baseURl + randomNum() + "/";
// randomNum();

function randomNum(){
  let num = Math.floor(Math.random() * 898) + 1;
  return num;
}

// function getImg(elem){
//   let imgPath;
//   let percent = Math.random();
//   if (percent < 0.25)
//       //Shiny Pokemon
//       imgPath = elem.sprites.front_shiny;
//   else {
//       //Regular Pokemon
//       imgPath = elem.sprites.front_default;
//   }
// }
getIt(completeURL);

function getName(elem){
  let pokeName = {};
  let name = elem.name;
  // let name2 = name1.charAt(0).toUpperCase() + name1.slice(1);
  if(!pokeArray.find(element => element[name] == true)){
      pokeName[`${elem.name}`] = true;
      pokeArray.push(name);
      pokeArray.push(pokeName);
  }
  localStorage.setItem("pokemonList", JSON.stringify(pokeArray));
}

function catchPokemon(/*index*/){
  let percent = Math.random();
  if (percent < 0.25){
      //Did not catch Pokemon
      return `After throwing a Pokeball... Oh no! The pokemon broke free and ran away!`;
  }
  else {
      // //Caught Pokemon
      // caughtPokemon.push(JSON.parse(localStorage.getItem("pokemonList"))[index]);
      
      return `You have successfully caught the Pokemon!`;
  }
}

function startGame() {
  // pokeArray = JSON.parse(localStorage.getItem("e"));
   state = {}
   localStorage.setItem("story", JSON.stringify(textNodes));
   if(parseInt(localStorage.getItem("currentText")) < 1){
     showTextNode(1);
   }
   else{
    showTextNode(parseInt(localStorage.getItem("currentText")));
   }
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

  console.log(currentOne);
  localStorage.setItem("currentState", JSON.stringify(option.setState));
  if(JSON.parse(localStorage.getItem("currentState") != "undefined")){
    state = Object.assign(state, JSON.parse(localStorage.getItem("currentState")))
  }
  localStorage.setItem("state", JSON.stringify(state));
  showTextNode(parseInt(localStorage.getItem("currentText")));
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
        setState: {Bulbasaur: true, Squirtle: false, Charmander: false},
        nextText: 28,
      },
      {
        text: `Squirtle!`,
        setState: {Bulbasaur: false, Squirtle: true, Charmander: false},
        nextText: 29,
      },
      {
        text: `Charmander!`,
        setState: {Bulbasaur: true, Squirtle: false, Charmander: false},
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
    text: `You first head to your home and find that your mom is already readily waiting for your arrival with the key in her hand by the door. It turns out she has already been informed by your dad about your mission. You take the key and your mom tells you to be careful of the wild Pokemon in Viridian Forest. She also gives a final reminder of leaving your bicycle at home instead since you wouldn't be able to go through any of tall towering leaf blades in the forest.`, 
    options: [
      {
        text: `Leave bicycle at home and head to Viridian Forest`,
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
    text: `You spend a moment envisioning being inside one of the gyms and winning a badge. But you realize now's not the time to get carried away! You are on an important mission to save missing Pokemon!`, 
    options: [
      {
        text: `Stop daydreaming and visit your dad's office.`,
        nextText: 73,
      },

    ]
  },
  {
    id: 73,
    text: `It takes a bit of time for you to recall the directions your dad's office, but you eventually find it. It's just a white building with a standard small office design next to the Pokemart.`, 
    options: [
      {
        text: `Open office door`,
        nextText: 74,
      },
    ]
  },
  {
    id: 74,
    text: `Wow! You're impressed by how clean the office is even if your dad stays works there with other investigators for the most part. You open your dad's private quarters and open every cabinet to look for the Mew's DNA. It doesn't take that long until you see a small with purple liquid inside. You grab the vial carefully and place it inside your left jeans pocket. You always use that pocket whenever you find something small and valuable because it also has a zipper to keep things very secure.`, 
    options: [
      {
        text: `Leave`,
        nextText: 75,
      },
    ]
  },
  {
    id: 75,
    text: `You head outside the office and make your way to a shortcut to Pallet Town, where you don't have to traverse back through the forest again. However, on your way there, you are stopped by an old man while lying down on a reclining chair.`, 
    options: [
      {
        text: `Explain situation to the old man`,
        nextText: 76,
      },
    ]
  },
  {
    id: 75,
    text: `You get the impression that the old man never really heard anything you said. "Unfortunately young'un, I would love to let you pass this way to travel in the cave back to Pallet Town again and reunite with your friends. However.." He stoppped miday through his sentence and starts falling asleep! You try waking him up again, and thankfully he does! "Oh sorry about that! Now where was I again? Oh right, right! You can't pass this way since the caves are very damp, and there's no use in putting torches inside. It's dark and you'll just lose your way inside."`, 
    options: [
      {
        text: `Maybe there's another way?`,
        nextText: 76,
      },
    ]
  },
  {
    id: 76,
    text: `"There is no other way", the old man says with a more serious tone. "I've also heard some of the members in Team Rocket are inside! It's better if you come prepared by teaching your Pokemon how to use flash!"`, 
    options: [
      {
        text: `How can I get flash?`,
        nextText: 77,
      },
      {
        text: `What is flash?`,
        nextText: 77,
      },
    ]
  },
  {
    id: 77,
    text: `"Flash is a Pokemon move that can blind a target. It can also be used to illuminate caves such as the dark cave I'm guarding", explain the old man as his tone shifts to a less serious one. "You can get flash by defeating Pewter City's gym leader, Brock!"`, 
    options: [
      {
        text: `Continue`,
        nextText: 78,
      }
    ]
  },
  {
    id: 78,
    text: `You've heard of Brock ever since you were in first-grade. He's a tough gym leader in charge of Pewter City's gym and likes to use rock type Pokemon.`, 
    options: [
      {
        text: `If there's truly no other way around it, then I'll do my best to beat his Pokemon!`,
        nextText: 79,
      }
    ]
  },
  {
    id: 79,
    text: `"That's the spirit! Say, I remembered something highly important about Brock as well." But before you get to hear the rest of what the old man says, he starts dozing off again and snoring. Better leave him be and let him rest, but now you absolutely need to hurry and go to Pewter Gym.`, 
    options: [
      {
        text: `Head to Pewter Gym.`,
        nextText: 80,
      }
    ]
  },
  {
    id: 80,
    text: `You retrace your steps from where you started and travel to the other way where Pewter Gym is located. You're surprised it's still open and how there are no people panicking about the recent disappearances. However, you realize that only researchers like Prof. Oak, the police, or important government officials are probably the only ones who know about it. As you make your way inside of Pewter Gym, you debate with yourself whether it's better to know or not know what's really going on.`, 
    options: [
      {
        text: `Enter gym`,
        nextText: 81,
      }
    ]
  },
  {
    id: 81,
    text: `After you enter the gym, you're surprised to see only the gym leader there! Normally, other trainers are also there you need to battle with. But you could only see Brock standing on a white stony platform at the center of the gym. "Welcome, new challenger!", Brock greets.`, 
    options: [
      {
        text: `Where's everybody else?`,
        nextText: 82,
      },
      {
        text: `Tell Brock how urgent it is for him to teach you the Pokemon move, flash`,
        nextText: 83,
      }
    ]
  },
  {
    id: 82,
    text: `"Well since I'm the gym leader, I'm also in charge of the other trainers here", Brock explains. "I sent them home in the meantime to keep an eye on their Pokemon since I heard that some people from Team Rocket are currently exploring the caves. I don't exactly know what they're up to but Team Rocket always spells trouble no matter where they are, and they always want to steal people's Pokemon."`, 
    options: [
      {
        text: `You're a good leader Brock`,
        nextText: 83,
      },
      {
        text: `Tell Brock how urgent it is for him to teach you the Pokemon move, flash`,
        nextText: 83,
      }
    ]
  },
  {
    id: 83,
    text: `Before you have the chance to explain how urgent you need to learn flash, Brock's stony Pokemon companion lets out a roar letting you know that it's up for battle! You blurt out the incident of Pokemon disappearning, but it doesn't look like Brock is actively trying to listen to you as, he too, is pumped up for a Pokemon battle!`, 
    options: [
      {
        text: `Negotiate with Brock`,
        nextText: 84,
      },
      {
        text: `Enter battle!`,
        nextText: 85,
      },
    ]
  },
  {
    id: 84,
    text: `You do your best to negotiate with Brock and convince him how it might be better if he just teaches you flash without engaging in any battles because his Pokemon might start vanishing too! But your negotiations fall on deaf ears as Brock starts shouting an attacking command to his Onyx.`, 
    options: [
      {
        text: `Try to stop Brock and negotiate again`,
        nextText: 86,
      },
      {
        text: `Enter battle!`,
        nextText: 85,
      }
    ]
  },
  {
    id: 86,
    text: `You try negotiating with Brock once more, but it fails again. Brock's Onyx smacks down your Pokemon! Your Pokemon takes a heavy hit from the attack!`, 
    options: [
      {
        text: `Enter battle!`,
        nextText: 87,
      },
    ]
  },
  {
    id: 87,
    text: `Now, you have absolutely no choice but to engage in battle! Although your Pokemon may have been hurt, it is still fully ready to beat Brock's onyx in battle.`, 
    options: [
      {
        text: `Attack!`,
        nextText: 85,
      }
    ]
  },
  {
    id: 85,
    text: `You confidently command your Pokemon with attack-moves that favor to your advantage. Eventually, your opponent's Pokemon faints. Hurrah! You won your first gym battle!`, 
    options: [
      {
        text: `Finally, you can learn flash!`,
        nextText: 88,
      }
    ]
  },
  {
    id: 88,
    text: `"Argh! I've underestimated you!", Brock says. "But your moves and tactics are simply commendable! Since you've defeated me, you also earn the Boulder badge!" He gives you the boulder badge, which looks like a grey shiny rock. "I'll teach your Pokemon how to use flash too!"`, 
    options: [
      {
        setState: {boulder: true},
        text: `Continue`,
        nextText: 89,
      }
    ]
  },
  {
    id: 89,
    text: `You thank Brock and start travelling back to the old man guarding the cave. The old man is still sleeping in the same position from when you last saw him. He wakes up after hearing your nearing footsteps. "Well done!" he claps. "I've never underestimated you young'un, now off you go to those caves!" he mentioned before falling asleep again. You start entering the dark caves..`, 
    options: [
      {
        text: `Continue`,
        nextText: 90,
      }
    ]
  },
  {
    id: 90,
    text: `The old man was completely right, you couldn't see anything at all! You tell your Pokemon to use flash, and it proudly shows of its new learned skill and illuminates the dark cave.`, 
    options: [
      {
        text: `Continue`,
        nextText: 91,
      }
    ]
  },
  {
    id: 91,
    text: `The further you moved deeper in the cave, you are at a crosswords with two open paths to your left and right. The left path sounds like it's full of bats by the sounds you hear while the right path seems darker and you could hear the sound of streaming water.`, 
    options: [
      {
        text: `Go left`,
        nextText: 93,
      },
      {
        text: `Go right`,
        nextText: 94,
      },
    ]
  },
  {
    id: 93,
    text: `You head to the left path, and...`, 
    options: [
      {
        text: `Go left`,
        nextText: 95,
      },
    ]
  },
  {
    id: 94,
    text: `You head to the right path, and you discover that the source of the streaming water sounds were coming from a pool of water that was formed from the heavy drops of water from the stalactites covering the cave's ceiling. You avoid getting yourself wet by the water and head towards a narrow opening where a bright light is emitting from.`, 
    options: [
      {
        text: `Continue`,
        nextText: 99,
      },
    ]
  },
  {
    id: 95,
    text: `A wild Zubat has appeared out of nowhere and blocks your way outside the cave!`, 
    options: [
      {
        text: `Battle!`,
        nextText: 97,
      },
    ]
  },
  {
    id: 97,
    text: `Luckily, you managed to defeat the Pokemon`, 
    options: [
      {
        text: `Continue`,
        nextText: 99,
      },
    ]
  },
  {
    id: 99,
    text: `Finally! You've reached the end of the cave and are now back in Pallet Town!`, 
    options: [
      {
        text: `Go back to Prof. Oak's lab`,
        nextText: 100,
      }
    ]
  },
  {
    id: 100,
    text: `You enter Prof. Oak's lab where you see no familiar faces but men and women dress in all black.`, 
    options: [
      {
        text: `They're from Team Rocket!`,
        nextText: 101,
      }
    ]
  },
  {
    id: 101,
    text: `You recognize that those all-black uniforms are from Team Rocket! You start worrying for Prof. Oak, the researchers', and Gary's safety!`, 
    options: [
      {
        text: `Confront Team Rocket`,
        nextText: 102,
      }
    ]
  },
  {
    id: 102,
    text: `You demand for your friends' whereabouts to one of the members of Team Rocket standing idly while examining one of the lab machines. "Hey! Scram kid! I don't know what the heck you're talking about, but clearly I'm not getting paid enough to be bothered by a kid while I admire the works from wonderful scientific breakthroughs!" The Team Rocket grunt, then calls for his Mightyena to go outside of his Pokeball.`, 
    options: [
      {
        text: `Enter Battle!`,
        nextText: 104,
      },
    ]
  },
  {
    id: 104,
    text: `You call your Pokemon to battle the grunt's Mightyena. "Mightyena! Use Crunch!", the grunt shouts. Your Pokemon takes heavy damage from that attack. Now it's your turn to think of a move!`, 
    options: [
      {
        text: `Protect itself by evading the opponent's upcoming attack`,
        nextText: 107,
      },
      {
        text: `Use a highly aggressive attack move!`,
        nextText: 106,
      },
      {
        text: `Use a Pokemon substitute dummy to direct all upcoming opponent's attacks straight to the dummy`,
        nextText: 160,
      },
    ]
  },
  {
    id: 107,
    text: `Your Pokemon quickly evades in a speed of a flash. The Mightyena was tricked as it headbutted straight into a wall. It starts to get dizzy and confused!`, 
    options: [
      {
        text: `Continue evading`,
        nextText: 108,
      },
      {
        text: `Use most damage-dealing attack!`,
        nextText: 110,
      },
    ]
  },
  {
    id: 108,
    text: `You tell your Pokemon to keep evading, but discover it was a complete waste since the Mightyena started to attack itself because of its confused state.`, 
    options: [
      {
        text: `Use most damage-dealing attack!`,
        nextText: 110,
      },
    ]
  },
  {
    id: 110,
    text: `You shout out the most damage-dealing attack you know of, and your Pokemon emerges victorious as the opponent's Pokemon faints!`, 
    options: [
      {
        setState: {flawlessVictory: true},
        text: `Continue`,
        nextText: 115,
      },
    ]
  },
  {
    id: 106,
    text: `You tell your Pokemon to counter-attack aggressively, but your opponent is one step ahead of you! He has predicted that you'd attack offensively back and has evaded your attack! Your poor Pokemon bumps its head on the wall from leaping towards the Mightyena in a burst of fury.`, 
    options: [
      {
        text: `Continue`,
        nextText: 111,
      },
    ]
  },
  {
    id: 160,
    text: `Your Pokemon swaps places with a Pokemon dummy. Good thinking! However, you were unable to predict the impact of your opponent's upcoming attack! It destroys the dummy with its strong headbutt and hurt your Pokemon in the process! Your Pokemon has taken a lot of damage from the attack.`, 
    options: [
      {
        text: `Continue`,
        nextText: 111,
      },
    ]
  },
  {
    id: 111,
    text: `You were able to exchange some heavy damage back to your enemy, but eventually, your Pokemon gets exhausted and starts struggling to keep up with the Mightyena's stamina. One more critical hit by the Mightyena, and you're certain that your Pokemon will faint. "Stop that!" Just then, you hear someone screaming..`, 
    options: [
      {
        text: `Continue`,
        nextText: 112,
      },
    ]
  },
  {
    id: 112,
    text: `You look behind you and find Gary! He helps by sending his Pokemon to battle alongside your Pokemon against the opponent. Finally, you deal the finishing attack to the Mightyena, and the Mightyena faints. You can't believe that just a second ago, you were certain you'd lose, but the tables have turned thanks to Gary's assistance`, 
    options: [
      {
        text: `Thank Gary`,
        nextText: 113,
      },
    ]
  },
  {
    id: 113,
    text: `"Hey don't sweat it, that's just what all strong Pokemon trainers like myself do!" Gary replies. Classic Gary, but you start to remember that his Pokemon disappeared! How was he able to find a new one?`, 
    options: [
      {
        text: `Ask Gary`,
        nextText: 114,
      }
    ]
  },
  {
    id: 114,
    text: `"Ohh that's easy, I just caught a bunch of Pokemon in the forest and beat Brock at Pewter Gym."`, 
    options: [
      {
        text: `Wow, you beat Brock too?`,
        nextText: 115,
  },
  ]
},
  {
    id: 115,
    text: `"Why do you act so surprised? Of course I did! I need to earn all the badges, get famous, and I'm sure my first Pokemon will hear about me and start missing my greatness", Gary explains looking proud. You're really not interested to hear his usual bragging, but you're glad he's still really determined to look for his Pokemon.`, 
    options: [
      {
        text: `Ask him where Prof. Oak is`,
        nextText: 116,
      },
    ]
  },
  {
    id: 116,
    text: `Gary explains that some older man wearing a lab coat stormed into the lab and started demanding Prof. Oak and the rest of the scientists for a talisman. When Prof. Oak answered that he didn't have it, the men threatened him with a vial filled with bright yellow liquid. Prof. Oak was frightened from it and had no choice but to lead the men to his secret underground lab while the rest of the scientists fled away.`, 
    options: [
      {
        text: `Go with Gary to the hidden underground lab`,
        nextText: 118,
      },
    ]
  },
  {
    id: 117,
    text: `Just then, you hear the voice of someone familiar complaining behind you. You turn around and see Gary complaining how you didn't stole all his glory by beating the Team Rocket's grunt.`, 
    options: [
      {
        text: `Ask him where Prof. Oak is`,
        nextText: 116,
      },
    ]
  },
  {
    id: 118,
    text: `Gary takes the lead and you follow him to a fake wall, exposing a secret door. He opens the door, and you both descend down the stairs until you both find Prof. Oak and the suspicious men in lab coats surrounding him!`, 
    options: [
      {
        text: `Confront the man`,
        nextText: 119,
      },
    ]
  },
  {
    id: 119,
    text: `"Didn't expect there'd be more company!", an old man with rounded glasses and snowy-white curly hair responds. "This must be your nephew! We need your Gramps to tell us where the talisman is or else I'll kidnap all the Pokemon!"`, 
    options: [
      {
        text: `So you were all behind this!`,
        nextText: 120,
      },
    ]
  },
{
  id: 119,
  text: `"Leave my Gramps alone, old man! You have to go through me first!", Gary confidently shouts. The old man lets out a laugh, and explains how he is behind all of the disappearing Pokemon, so he can mutate them with the vial he was holding. It turns out the vial with yellow liquid can turn any living thing to a monster that doesn't recognize any emotion but rage!`, 
  options: [
    {
      text: `Enter battle!`,
      nextText: 120,
    },
  ]
},
{
  id: 120,
  text: `You don't even let the villain finish his speech and explanation as you and Gary double-team to stop him and rescue Prof. Oak`, 
  options: [
    {
      requiredState: (currentState) => currentState.boulder && currentState.flawlessVictory,
      text: `Win the battle! (100% success rate)`,
      nextText: 121,
    },
    {
      requiredState: (currentState) => currentState.boulder || currentState.flawlessVictory,
      text: `Start telling your Pokemon to attack him`,
      nextText: 122,
    },
    {
      text: `Struggle and lose battle`,
      nextText: 123,
    },
  ]
},
{
  id: 121,
  text: `You and Gary manage to defeat the villain and rescue Prof. Oak! Prof. Oak, swiftly takes the yellow vial out of the old man's hand and throws it away through an open window. The vial smashes and breaks down into tiny glass fragments while the grass quickly absorbs the yellow contents. You notice that the patch of grass where the vial fell withers to a greyish dull color! You and Gary are both relieved of successfully getting rid of the deadly vial before any tiny drop from inside spills on Prof. Oak.`, 
  options: [
    {
      text: `Continue`,
      nextText: 124,
    }
  ]
},
{
  id: 122,
  text: `You and Gary manage to defeat the villain and rescue Prof. Oak! Prof. Oak, swiftly takes the yellow vial out of the old man's hand and throws it away through an open window. The vial smashes and breaks down into tiny glass fragments while the grass quickly absorbs the yellow contents. You notice that the patch of grass where the vial fell withers to a greyish dull color! You and Gary are both relieved of successfully getting rid of the deadly vial before any tiny drop from inside spills on Prof. Oak.`, 
  options: [
    {
      text: `Continue`,
      nextText: 126,
    }
  ]
},
{
  id: 123,
  text: `You managed to attack the old man, but he fled away before you and Gary could catch him! Thankfully, Prof. Oak is unharmed and the police arrive after a few minutes. They were unable to locate the old man.`, 
  options: [
    {
      text: `Continue`,
      nextText: 131,
    }
  ]
},
{
  id: 122,
  text: `The old man is still knocked out on the floor since both you and Gary's Pokemon started pouncing on the man. After a couple of minutes have passed, the police also arrive in the lab, and they put the old man in handcuffs. It turns out that the old man was one of Prof. Oak's college classmates back in the day. He wanted the talisman that Prof. Oak first gave you since it had the power to dispel the yellow liquid's effects. He planned to wear the talisman and manipulate the savage Pokemon since the talisman also had the power of mind-control.`, 
  options: [
    {
      text: `Continue`,
      nextText: 126,
    }
  ]
},
{
  id: 124,
  text: `The old man is still knocked out on the floor since both you and Gary's Pokemon started pouncing on the man. After a couple of minutes have passed, the police also arrive in the lab, and they put the old man in handcuffs. It turns out that the old man was one of Prof. Oak's college classmates back in the day. He wanted the talisman that Prof. Oak first gave you since it had the power to dispel the yellow liquid's effects. He planned to wear the talisman and manipulate the savage Pokemon since the talisman also had the power of mind-control.`, 
  options: [
    {
      text: `Continue`,
      nextText: 125,
    }
  ]
},
{
  id: 126,
  text: `The old man is still knocked out on the floor since both you and Gary's Pokemon started pouncing on the man. After a couple of minutes have passed, the police also arrive in the lab, and they put the old man in handcuffs. It turns out that the old man was one of Prof. Oak's college classmates back in the day. He wanted the talisman that Prof. Oak first gave you since it had the power to dispel the yellow liquid's effects. Unfortunately, you were unable to figure out why he wanted the talisman so badly.`, 
  options: [
    {
      text: `Continue`,
      nextText: 128,
    }
  ]
},
{
  id: 128,
  text: `In the end, the stolen Pokemon were retrieved eventually and found in an abandoned island. Some of the Pokemon did turn to savages, but Prof. Oak was able to help cure them with an antidote. You discover that the antidote was Mew's DNA inside of the vial your dad asked to retrieve from his office. Just a little drop of it could help restore the Pokemon back to its original self again.`, 
  options: [
    {
      text: `Continue`,
      nextText: 130,
    }
  ]
},
{
  id: 125,
  text: `In the end, the stolen Pokemon were retrieved eventually and found in an abandoned island. Some of the Pokemon did turn to savages, but Prof. Oak was able to help cure them with an antidote. You discover that the antidote was Mew's DNA inside of the vial your dad asked to retrieve from his office. Just a little drop of it could help restore the Pokemon back to its original self again.`, 
  options: [
    {
      text: `Continue`,
      nextText: 127,
    }
  ]
},
{
  id: 127,
  text: `After the case was finally solved, you and Gary start competing in more gyms and earning badges. You find out that you have a lot more in common that you previously thought! You manage to catch many other Pokemon and become stronger. Congratulations! You got the best ending!`, 
  options: [
    {
      text: `The end! Go back to beginning of story!`,
      nextText: -1,
    }
  ]
},
{
  id: 130,
  text: `After the case was finally solved, you and Gary start competing in more gyms and earning badges. You're still not at a level where you feel very confident about your Pokemon battling skills, but you're motivated to keep trying your best. Congratulations! You got the good ending!`, 
  options: [
    {
      text: `The end! Go back to beginning of story!`,
      nextText: -1,
    }
  ]
},
{
  id: 131,
  text: `More and more Pokemon continued to disappear, and you've heard from the news that there have been savage Pokemon scaring away people in some areas. The only thing you can do is hope for someone to put a stop to it, but until then, you have nothing else to do but watch as more horrors unfold in the news`, 
  options: [
    {
      text: `The end! Go back to beginning of story!`,
      nextText: -1,
    }
  ]
},
]

startGame();
