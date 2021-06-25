
displayArticles();

function showCategory(category) {
    resetFeed();
    activeLinks = [];   

    switch(category) {
        case "domestic":
            console.log("Showing domestic news");

            activeLinks.push("jylland_politik_url");
            activeLinks.push("berlingske_politik_url");
            activeLinks.push("dr_politik_url");
            break;

        case "international":
            activeLinks.push("jylland_udenrigs_url");
            activeLinks.push("berlingske_udenrig_url");
            activeLinks.push("dr_udenrigs_url");
            break;

        case "entertainment":
            activeLinks.push("berlingske_sport_url");
            activeLinks.push("berlingske_godeliv_url");
            activeLinks.push("dr_sport_url");
            activeLinks.push("dr_viden_url");
            break;

        case "culture":
            activeLinks.push();
            activeLinks.push();
            activeLinks.push();
            break;

        default:
            break;
    }

    displayArticles();
}

function displayArticles() {
    //delay necesarry to allow feeds to load in first
    for(const value of activeLinks) {
        generateFeed(value);
    }

    setTimeout(function () {
        sortKeysInMapAndDisplay();
    }, 500);
}

function resetFeed() {
    var node = document.getElementById("news-section-1");
    timeToContent   = new Map();
    mapOfAllContent = new Map();

    while(node.firstChild) 
        node.removeChild(node.lastChild);
}


function addToGlobalMap() {
    var mapIter = timeToContent.keys();

    var value = mapIter.next().value;

    while(value !== undefined) {
        mapOfAllContent.set(value, timeToContent.get(value));
        value = mapIter.next().value;
    }
}

//display most recent articles at the top
function sortKeysInMapAndDisplay() {
    var unsortedArray = [];
    var newMap        = new Map();
    var mapIter = mapOfAllContent.keys();
    var container = document.getElementById('news-section-1');

    var value = mapIter.next().value;

    while(value !== undefined) {
        unsortedArray.push(value);
        value = mapIter.next().value;
    }

    //sort
    var sortedArray = unsortedArray.sort().reverse();

    var i = 0;

    for(const value of sortedArray) {
        var element = mapOfAllContent.get(value);

        if(i % 2 === 0) element.style.float = "left";
        else            element.style.float = "right";

        i++;

        newMap.set(value, mapOfAllContent.get(value));
        container.appendChild(mapOfAllContent.get(value));
    }

    mapOfAllContent = newMap;
}



//for debugging
function printMap() {
    var mapIter = mapOfAllContent.keys();
    var value = mapIter.next().value;

    while(value !== undefined) {
        value = mapIter.next().value;
    }
}


//different tag colors. you need to know the tags in the xml to edit these
function setTagColor(tag_type) {
    switch(tag_type) {
      case "Politik":
        return "blue";
      case "Politiske morgenpost":
          return "blue";  
      case "Tæt på":
        return "#191970";
      case "Europa":
        return "#191970";
      case "Indland":
          return "blue";
      case "Politi og retsvæsen":
          return "teal";

      case "Kultur":
        return "purple";
      case "Film og serier":
        return "purple";
      case "Litteratur":
        return "purple";

      case "Samfund":
          return "darkgreen";
      case "JP Forside":
          return "#009e60";

      case "Internationalt":
          return "red";
      case "International":
          return "red";
      case "Udland":
          return "red";
      case "EM2020":
          return "red";
      case "Alt":
          return "red";

      case "Sport":
          return "orange";
      case "Cykling":
          return "orange";
          
      default:
        return "black";
    }
  }