
//TODO
    // NEW FEATURES
        // add your own feed for the default list. corresponding tag with corresponding color.
        // customize the different sections to own liking. Uses same system as previous requirement.
        // italize text in quotes
        // visual re-design
            //make cards more card-like
            //not uniform background
            //dark mode? customize colors.
    //BUGS
        // sorting articles should also account for the day, not just the time.
        // article card height is sometimes too small, sometimes too large. Dynamic way of assigning height?    
        // make article link into <a> node, to be transparent with link


displayArticles();

function showCategory(category) {
    resetFeed();
    activeLinks = [];   

    switch(category) {
        case "domestic":
            activeLinks.push("jylland_politik_url");
            activeLinks.push("berlingske_politik_url");
            activeLinks.push("dr_politik_url");
            break;

        case "international":
            activeLinks.push("jylland_udenrigs_url");
            activeLinks.push("berlingske_udenrigs_url");
            activeLinks.push("dr_udenrigs_url");
            break;

        case "entertainment":
            activeLinks.push("berlingske_sport_url");
            activeLinks.push("berlingske_lev_url");
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
        generateFeed(value, 5);
    }

    setTimeout(function () {
        sortKeysInMapAndDisplay();
    }, 1000);
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


function getTagColor(tag) {
    tag = "tag_" + tag;

    if(tagToColor.get(tag) === undefined) return "black";
    else return tagToColor.get(tag);
} 

//for debugging
function printMap() {
    var mapIter = mapOfAllContent.keys();
    var value = mapIter.next().value;

    while(value !== undefined) {
        value = mapIter.next().value;
    }
}