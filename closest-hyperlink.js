// Set the number of links 
var numberOfLinks = 30;

//Create an array containing [elementNumber, top, left] for possible sorting
var arrayOfCoords = [];

var recentClosest = null;

//Create a list of words, give them a position, and add to HTML 
var getAnchorTags = (num) => {
  var listOfAnchors = '';

  var listOfStates = [
  'Alabama',  'Alaska',  'Arizona',  'Arkansas',  'California',  'Colorado',  'Connecticut',  
  'Delaware',  'Florida',  'Georgia',  'Hawaii',  'Idaho',  'Illinois',  'Indiana',  'Iowa',  
  'Kansas',  'Kentucky',  'Louisiana',  'Maine',  'Maryland',  'Massachusetts',  'Michigan',  
  'Minnesota',  'Mississippi',  'Missouri',  'Montana',  'Nebraska',  'Nevada',  'NewHampshire',  
  'NewJersey',  'NewMexico',  'NewYork',  'NorthCarolina',  'NorthDakota',  'Ohio',  'Oklahoma',  
  'Oregon',  'Pennsylvania',  'RhodeIsland',  'SouthCarolina',  'SouthDakota',  'Tennessee',  
  'Texas',  'Utah',  'Vermont',  'Virginia',  'Washington',  'West Virginia',  
  'Wisconsin',  'Wyoming' 
];

var listLength = listOfStates.length;

for (var i = 0; i < num; i++) {
  var randomState = Math.floor(Math.random() * listOfStates.length);

  //set links to position top: 0px, left: 0px
  //This recalibrates the positioning of each element, rather than getting position from original position
  //(original position is based on where it would appear as pure HTML)
  listOfAnchors += `<a href="#" class="link-${i}" 
  style="top: 0px; left: 0px;"
  >${listOfStates[randomState]}</a>`;

  //Do not repeat state, unless the number of links is greater than the number of states
  if (listLength >= num) {
    listOfStates = listOfStates.slice(0, randomState).concat(listOfStates.slice(randomState + 1));
  }
}

return listOfAnchors;
};


//This randomizes link positions, after starting from (0, 0)
var setRandomCoords = (num) => {
  for (var i = 0; i < num; i++) {
    var randomNumberTop = Math.floor(Math.random() * window.innerHeight);
    var randomNumberLeft = Math.floor(Math.random() * window.innerWidth);

    document.querySelector(`.link-${i}`).style = `top: ${0 + randomNumberTop}px; left: ${0 + randomNumberLeft}px;`;
    arrayOfCoords.push([i, randomNumberTop, randomNumberLeft]);
  };
};

/* Print the  current coordinates of my mouse */
var coordsOfMouse = () => {
  document.addEventListener('mousemove', (e) => {
    var cursorX = e.clientX;
    var cursorY = e.clientY;    
    
    console.log(cursorX, cursorY);
  });
};

var findClosest = (num) => {

  //reset style of previously selected
  if (recentClosest !== null) {
    document.querySelector(`.link-${recentClosest}`).style = 'background-color: #000';
  }

  var closestToClickValue = null;
  var linkNumberOfClosest = null;
  var cursorX;
  var cursorY;
  var topDiff;
  var leftDiff;


  document.addEventListener('click', function(e){ //use mousemove for hover rather than click
    cursorX = e.clientX; //left
    cursorY = e.clientY; //top

    console.log(cursorX, cursorY);

    for (var i = 0; i < num; i++) {
      topDiff = Math.abs(cursorY - Number(document.querySelector(`.link-${i}`).style.top.slice(0, -2)));
      leftDiff = Math.abs(cursorX - Number(document.querySelector(`.link-${i}`).style.left.slice(0, -2)));
      totalDiff = topDiff + leftDiff;
      if(closestToClickValue === null || closestToClickValue > totalDiff) {
        closestToClickValue = totalDiff;
        linkNumberOfClosest = i;
      }
    }
    console.log(document.querySelector(`.link-${linkNumberOfClosest}`));
    document.querySelector(`.link-${linkNumberOfClosest}`).style.background = '#f90';

    recentClosest = linkNumberOfClosest;
  });
}



document.getElementById('app').innerHTML = getAnchorTags(numberOfLinks);
setRandomCoords(numberOfLinks);
coordsOfMouse();
findClosest(numberOfLinks);



