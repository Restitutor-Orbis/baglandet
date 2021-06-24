var podcast_politics_url   = "https://rss.acast.com/altingetpolitik";
var podcast_EU_url         = "https://rss.acast.com/altingeteu";

var politikken_debat_url   = "http://politiken.dk/rss/senestenyt";

var jylland_politik_url    = "https://jyllands-posten.dk/politik/?service=rssfeed";
var jylland_kultur_url     = "https://jyllands-posten.dk/kultur/?service=rssfeed";
var jylland_seneste_url    = "https://jyllands-posten.dk/?service=rssfeed&mode=area&areaNames=level0,topflow";

var dr_politik_url         = "https://www.dr.dk/nyheder/service/feeds/allenyheder";

var berlingske_politik_url = "https://www.berlingske.dk/content/23/rss";
var berlingske_seneste_url = "https://www.berlingske.dk/content/3/rss";
var berlingske_sport_url   = "https://www.berlingske.dk/content/21803/rss";
var berlingske_fodbold_url = "https://www.berlingske.dk/content/176/rss";

var mapOfAllContent = new Map();



generateFeed_jyllandsposten(jylland_politik_url, 1,2);
generateFeed_jyllandsposten(jylland_kultur_url, 1,2);
generateFeed_berlingske(berlingske_politik_url, 1, 2);
generateFeed_berlingske(berlingske_sport_url, 1, 1);
generateFeed_berlingske(berlingske_fodbold_url, 1, 2);

generateFeed_DR(dr_politik_url, 1, 5);

setTimeout(function () {
    displayArticles();
}, 1000);





function addToGlobalMap() {
    var mapIter = timeToContent.keys();

    var value = mapIter.next().value;

    while(value !== undefined) {
        mapOfAllContent.set(value, timeToContent.get(value));
        value = mapIter.next().value;
    }
}


function displayArticles() {
    sortKeysInMap();

    printMap();

    var mapIter = mapOfAllContent.keys();
    var value = mapIter.next().value;
    var container = document.getElementById('news-section-1');

}

//display most recent articles at the top
function sortKeysInMap() {
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
      case "Kultur":
        return "purple";
      case "Film og serier":
        return "purple";
      case "Samfund":
          return "darkgreen";
      case "Internationalt":
          return "red";
      case "International":
          return "red";
      case "Udland":
          return "red";
      case "JP Forside":
          return "#009e60";
      case "Indland":
          return "goldenrod";
      case "Politi og retsvæsen":
          return "teal";
      case "EM2020":
          return "red";
      case "Sport":
          return "orange";
      default:
        return "black";
    }
  }