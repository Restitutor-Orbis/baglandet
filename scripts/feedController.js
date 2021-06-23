var podcast_politics_url  = "https://rss.acast.com/altingetpolitik";
var podcast_EU_url        = "https://rss.acast.com/altingeteu";

var politikken_debat_url  = "http://politiken.dk/rss/senestenyt";

var jylland_politik_url   = "https://jyllands-posten.dk/politik/?service=rssfeed";

generateFeed(podcast_politics_url, 5);
generateFeed(podcast_EU_url, 10);
generateFeed(jylland_politik_url, 5);