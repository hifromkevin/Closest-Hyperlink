// Set the number of links 
var numberOfLinks = 30;

//Create an array containing [elementNumber, top, left] for possible sorting
var arrayOfCoords = [];

var recentClosest = null;

//Create a list of words, give them a position, and add to HTML 
var createAnchorTags = (num) => {
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

  //adds links top HTML. sets position of links
  listOfAnchors += `<a href="#" class="link-${i}" 
  style="top: ${Math.floor(Math.random() * window.innerHeight)}px; 
  left: ${Math.floor(Math.random() * window.innerWidth)}px;"
  >${listOfStates[randomState]}</a>`;

  //Do not repeat state, unless the number of links is greater than the number of states
  if (listLength >= num) {
    listOfStates = listOfStates.slice(0, randomState).concat(listOfStates.slice(randomState + 1));
  }
}

return listOfAnchors;
};

// Prints the current coordinates of my mouse (current function call is commented out)
var coordsOfMouse = () => {
  document.addEventListener('mousemove', (e) => {
    var leftPositionOfCursor = e.clientX;
    var topPositionOfCursor = e.clientY;    
    
    console.log(leftPositionOfCursor, topPositionOfCursor);
  });
};

//Sorting coordinates
var sortingHat = (a, b) => {
  if (a === b) {
    return 0;
  } else {
    return (a < b) ? -1 : 1;
  }
}

//function that looks for the closest element to the mouse, and highlights the background
var findClosest = (num) => {
  document.addEventListener('mousemove', function(e){ 
    //reset style of previously selected
    if (recentClosest !== null) {
      document.querySelector(`.link-${recentClosest}`).style.background = 'none';
    }

    var leftPositionOfCursor = e.clientX; 
    var topPositionOfCursor = e.clientY;

    var closestToClickValue = null;
    var linkNumberOfClosest = null;

    var positionOfLink; 
    var cursorAndLinkTopDifference;
    var cursorAndLinkLeftDifference;

    var differences;

    var topLeftCoordOfLink;
    var topRightCoordOfLink;
    var bottomLeftCoordOfLink;
    var bottomRightCoordOfLink;

    document.onmouseover = function(e) {
      if (e.target.className) {
        closestToClickValue = 0;
        var linkNumberSplit = e.target.className.split('-');
        linkNumberOfClosest = Numvber(linkNumberSplit[linkNumberSplit.length - 1]);
      }
      document.querySelector(`.link-${linkNumberOfClosest}`).style.background = '#f90';
      return;
    }
    
    for (var i = 0; i < num; i++) {
      differences = [];

      topLeftCoordOfLink = [
        document.querySelector(`.link-${i}`).getBoundingClientRect().x, 
        document.querySelector(`.link-${i}`).getBoundingClientRect().y
      ];
      topRightCoordOfLink = [
        (document.querySelector(`.link-${i}`).getBoundingClientRect().x + document.querySelector(`.link-${i}`).getBoundingClientRect().width), 
        document.querySelector(`.link-${i}`).getBoundingClientRect().y
      ];
      bottomLeftCoordOfLink = [
        document.querySelector(`.link-${i}`).getBoundingClientRect().x, 
        (document.querySelector(`.link-${i}`).getBoundingClientRect().y + document.querySelector(`.link-${i}`).getBoundingClientRect().height)
      ];
      bottomRightCoordOfLink = [
        (document.querySelector(`.link-${i}`).getBoundingClientRect().x + document.querySelector(`.link-${i}`).getBoundingClientRect().width), 
        (document.querySelector(`.link-${i}`).getBoundingClientRect().y + document.querySelector(`.link-${i}`).getBoundingClientRect().height)
      ];

      differences.push(Math.abs(leftPositionOfCursor - topLeftCoordOfLink[0]) + Math.abs(topPositionOfCursor - topLeftCoordOfLink[1]));
      differences.push(Math.abs(leftPositionOfCursor - topRightCoordOfLink[0]) + Math.abs(topPositionOfCursor - topRightCoordOfLink[1]));
      differences.push(Math.abs(leftPositionOfCursor - bottomLeftCoordOfLink[0]) + Math.abs(topPositionOfCursor - bottomLeftCoordOfLink[1]));
      differences.push(Math.abs(leftPositionOfCursor - bottomRightCoordOfLink[0]) + Math.abs(topPositionOfCursor - topRightCoordOfLink[1]));

      if (closestToClickValue === null || closestToClickValue > differences.sort(sortingHat)[0]) {
        closestToClickValue = differences.sort(sortingHat)[0];
        linkNumberOfClosest = i;
      }
    }
    document.querySelector(`.link-${linkNumberOfClosest}`).style.background = '#f90';

    recentClosest = linkNumberOfClosest;
  });
}

var memoize = (fn) => {
  var cache = {};

  return function(...args) {
    if(cache[args]) { return cache[args] };
  }

  const result = fn.apply(this, args);
  cache[args] = result;

  return result;
}

document.getElementById('app').innerHTML = createAnchorTags(numberOfLinks);
//coordsOfMouse();

var findClosest = memoize(findClosest(numberOfLinks));
findClosest();