var podcast_politics_url   = "https://rss.acast.com/altingetpolitik";
var podcast_EU_url         = "https://rss.acast.com/altingeteu";

var politikken_debat_url   = "http://politiken.dk/rss/senestenyt";

var jylland_politik_url    = "https://jyllands-posten.dk/politik/?service=rssfeed";
var jylland_kultur_url     = "https://jyllands-posten.dk/kultur/?service=rssfeed";
var jylland_seneste_url    = "https://jyllands-posten.dk/?service=rssfeed&mode=area&areaNames=level0,topflow";

var dr_politik_url         = "https://www.dr.dk/nyheder/service/feeds/politik";

var berlingske_politik_url = "https://www.berlingske.dk/content/23/rss";
var berlingske_seneste_url = "https://www.berlingske.dk/content/3/rss";

var mapOfAllContent = new Map();



generateFeed_jyllandsposten(jylland_seneste_url, 1,4);
generateFeed_berlingske(berlingske_seneste_url, 1,4);


printMap();


function addToGlobalMap() {
    var mapIter = timeToContent.keys();

    var value = mapIter.next().value;

    while(value !== undefined) {
        mapOfAllContent.set(value, timeToContent.get(value));
        value = mapIter.next().value;
    }
}

function printMap() {
    var mapIter = mapOfAllContent.keys();

    var value = mapIter.next().value;

    console.log(mapOfAllContent.size);

    while(value !== undefined) {
        console.log(value);
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
      case "Kultur":
        return "purple";
      case "Samfund":
          return "green";
      case "Internationalt":
          return "red";
      case "JP Forsde":
          return "darkgreen";
      case "Indland":
          return "goldenrod";
      case "Politi og retsvæsen":
          return "teal";
      default:
        return "black";
    }
  }