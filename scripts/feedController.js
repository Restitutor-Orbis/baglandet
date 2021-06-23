var podcast_politics_url   = "https://rss.acast.com/altingetpolitik";
var podcast_EU_url         = "https://rss.acast.com/altingeteu";

var politikken_debat_url   = "http://politiken.dk/rss/senestenyt";

var jylland_politik_url    = "https://jyllands-posten.dk/politik/?service=rssfeed";
var jylland_kultur_url     = "https://jyllands-posten.dk/politik/?service=rssfeed";

var dr_politik_url         = "https://www.dr.dk/nyheder/service/feeds/politik";

var berlingske_politik_url = "https://www.berlingske.dk/content/23/rss";

generateFeed_jyllandsposten(jylland_politik_url, 1,2);
//generateTwitterFeed();
generateFeed_berlingske(berlingske_politik_url, 1,29299);


//different tag colors. you need to know the tags in the xml to edit these
function setTagColor(tag_type) {
    switch(tag_type) {
      case "Politik":
        return "blue";
        break;
      case "Kultur":
        return "purple";
        break;
      default:
        return "black";
        break;
    }
  }