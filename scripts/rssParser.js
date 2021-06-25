
const DOMPARSER = new DOMParser().parseFromString.bind(new DOMParser())


function generateFeed(feed) {
  var newspaper_tag;
  
  var firstIndex  = feed.indexOf("_");
  var secondIndex = feed.indexOf("_", firstIndex + 1);
  var category    = feed.substring(firstIndex + 1, secondIndex);
      category    = capitalizeFirstLetter(category);

  var url = varToLink.get(feed);

  if(url.includes("berlingske")) {
    newspaper_tag = "BERLINGSKE";

  } else if(url.includes("jyllands-posten")) {
    newspaper_tag = "JYLLANDSPOSTEN";

  } else if(url.includes("dr.dk")) {
    newspaper_tag = "DANMARKS RADIO";

  }

  //using feednami
  //https://toolkit.sekando.com/docs/en/feednami
  feednami.load(url)
  .then(feed => {
      var i = 0;
      for(let entry of feed.entries){
          if(i == 5) break;
          i++;

          //console.log(entry);

          var container = document.createElement("div");
              container.classList.add('article-container');

          var date = entry.pubDate.substring(11, 16);
              date = convertToTimezone(date, "CET");

          addTag(category, date, newspaper_tag, container);
          addTitle(entry.title, entry.link, container);
          addDescription(entry.description, container);

          timeToContent.set(date, container);
          addToGlobalMap();
      }
  });
}



function addImage(image_url, container) {
  let img = document.createElement('img');
  img.src = image_url;
  container.appendChild(img);
}

function addTag(tag_type, date, newspaper, container) {
  let tag = document.createElement('p');
  tag.textContent = tag_type;
  tag.classList.add('tag');
  tag.style.color = setTagColor(tag_type);
  container.appendChild(tag);

  addTime(date, container, tag);
  addNewspaper(newspaper, tag);
}

function addTime(date, container, tag) {
  let time = document.createElement('span');
  time.textContent = date;
  tag.appendChild(time);
}

function addTitle(title, redirect, container) {
  let h1 = document.createElement('h1');
  h1.textContent = title;
  h1.addEventListener("click", function e() {
    window.open(redirect, "_self");
  });
  container.appendChild(h1);
}

function addDescription(description, container) {
  if(description.length >200) description = description.substring(0,200) + "...";
  
  let desc = document.createElement('p');
  desc.textContent = description;
  container.appendChild(desc);
}

function addNewspaper(newspaper, tag) {
  let newspaper_element = document.createElement('p');
  newspaper_element.classList.add('newspaper-tag');
  newspaper_element.textContent = newspaper;
  tag.appendChild(newspaper_element);
}

/** Capitalizes first letter 
 * Taken from Steve Harrison
*/ https://stackoverflow.com/a/1026087
function capitalizeFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function convertToTimezone(string, timezone) {
  var hours = string.substring(0,2);
      hours = parseInt(hours, 10);
  var difference = 0;

  switch(timezone) {
    case "CET":
      difference = 2;
      break;
  }

  hours += difference;

  if(hours > 24) {
    hours = hours - 24;
  }
  if(hours < 10) {
    hours.toString();
    hours = "0" + hours;
  }
  


  return hours + string.substring(2, string.length);
}