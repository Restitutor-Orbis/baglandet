var timeToContent   = new Map();
var mapOfAllContent = new Map();
var varToLink       = new Map();

var activeLinks     = ["dr_alt_url",
                       "berlingske_politik_url",
                       "berlingske_sport_url",
                       "jylland_politik_url"];

var noOfElements  = 0;

varToLink.set("podcast_politics_url",    "https://rss.acast.com/altingetpolitik");
varToLink.set("podcast_EU_url",          "https://rss.acast.com/altingeteu");

varToLink.set("jylland_politik_url",     "https://jyllands-posten.dk/politik/?service=rssfeed");
varToLink.set("jylland_udenrigs_url",    "https://jyllands-posten.dk/international/?service=rssfeed");
varToLink.set("jylland_kultur_url",      "https://jyllands-posten.dk/kultur/?service=rssfeed");
varToLink.set("jylland_seneste_url",     "https://jyllands-posten.dk/?service=rssfeed&mode=area&areaNames=level0,topflow");
varToLink.set("jylland_viden_url",       "https://jyllands-posten.dk/nyviden/?service=rssfeed");

varToLink.set("dr_alt_url",              "https://www.dr.dk/nyheder/service/feeds/allenyheder");
varToLink.set("dr_politik_url",          "https://www.dr.dk/nyheder/service/feeds/politik");
varToLink.set("dr_udenrigs_url",         "https://www.dr.dk/nyheder/service/feeds/udland");
varToLink.set("dr_sport_url",            "https://www.dr.dk/nyheder/service/feeds/sporten");
varToLink.set("dr_viden_url",            "https://www.dr.dk/nyheder/service/feeds/viden");

varToLink.set("berlingske_politik_url",  "https://www.berlingske.dk/content/23/rss");
varToLink.set("berlingske_seneste_url",  "https://www.berlingske.dk/content/3/rss");
varToLink.set("berlingske_sport_url",    "https://www.berlingske.dk/content/21803/rss");
varToLink.set("berlingske_fodbold_url",  "https://www.berlingske.dk/content/176/rss");
varToLink.set("berlingske_udenrigs_url", "https://www.berlingske.dk/content/2/rss");
varToLink.set("berlingske_godeliv_url",  "https://www.berlingske.dk/content/1110/rss");

