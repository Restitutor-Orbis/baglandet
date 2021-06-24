
const DOMPARSER = new DOMParser().parseFromString.bind(new DOMParser())

/* Fetch the feed from given url. Only x number of items fetched
*  Designed to work by the XML provided by Jyllandsposten.s
*  Based on the design from https://github.com/hongkiat/js-rss-reader
*/
function generateFeed_jyllandsposten(url, min, high) {
    var i = 0; //index in total number of elements;

    fetch(url).then((res) => {
        res.text().then((xmlTxt) => {
          var domParser = new DOMParser();
          let feed = domParser.parseFromString(xmlTxt, 'text/xml');
          feed.querySelectorAll('item').forEach((item) => {
            i++;
            if(i < min) return;
            if(i > high) return;

            let container = document.createElement('div');
            container.classList.add('article-container');

            //fetch basic information
            var title       = item.querySelector('title').textContent;
            var tag_type    = item.querySelector('category').textContent;
            var description = item.querySelector('description').textContent;
            var date        = item.querySelector('pubDate').textContent;
            var redirect    = item.querySelector('link').textContent;
            var newspaper   = "JYLLANDSPOSTEN";

            //format information
            date = date.substring(17, 22);

            addTag(tag_type, date, newspaper, container);
            addTitle(title, container, redirect); 
            addDescription(description, container);

            date = item.querySelector('pubDate').textContent.substring(17, 26);

            timeToContent.set(date, container);

            addToGlobalMap();

          }).catch((err) => {
            console.error('Hit max value');
          })
        }).catch(() => console.error('Error in loading the feed'));
    }).catch(() => console.error('Error in fetching the feed'));
}


function generateFeed_berlingske(url, min, high) {
  var i = 0; //index in total number of elements;

  fetch(url).then((res) => {
      res.text().then((xmlTxt) => {
        var domParser = new DOMParser()
        let feed = domParser.parseFromString(xmlTxt, 'text/xml')
        feed.querySelectorAll('item').forEach((item) => {
          i++;
          if(i < min) return;
          if(i > high) return;

          let container = document.createElement('div');
          container.classList.add('article-container');

          //fetch basic information
          var title       = item.querySelector('title').textContent;
          var tag_type    = item.querySelector('category').textContent;
          var description = item.querySelector('description').textContent;
          var date        = item.querySelector('pubDate').textContent;
          var redirect    = item.querySelector('link').textContent;
          var newspaper   = "BERLINGSKE";

          //format information
          date = date.substring(17, 22);

                     addTag(tag_type, date, newspaper, container);
          addTitle(title, container, redirect); 
          addDescription(description, container);

          date = item.querySelector('pubDate').textContent.substring(17, 26);

          timeToContent.set(date, container);

          addToGlobalMap();
        }).catch(() => console.error('Hit max value'))
      }).catch(() => console.error('Error in loading the feed'));;
  }).catch(() => console.error('Error in fething the feed'))
}


function generateFeed_DR(url, min, high) {
  var i = 0; //index in total number of elements;

  fetch(url).then((res) => {
      res.text().then((xmlTxt) => {
        var domParser = new DOMParser()
        let feed = domParser.parseFromString(xmlTxt, 'text/xml')
        feed.querySelectorAll('item').forEach((item) => {
          i++;
          if(i < min) return;
          if(i > high) return;

          let container = document.createElement('div');
          container.classList.add('article-container');

          //fetch basic information
          var title       = item.querySelector('title').textContent;
          var tag_type    = item.getElementsByTagName('DR:ChannelName')[0].firstChild.nodeValue;
          var description = item.querySelector('description').textContent;
          var date        = item.querySelector('pubDate').textContent;
          var redirect    = item.querySelector('link').textContent;
          var newspaper   = "DANMARKS RADIO";

          console.log(tag_type);

          //format information
          date = date.substring(17, 22);

          addTag(tag_type, date, newspaper, container);
          addTitle(title, container, redirect); 
          addDescription(description, container);

          date = item.querySelector('pubDate').textContent.substring(17, 26);

          timeToContent.set(date, container);

          addToGlobalMap();
        }).catch(() => console.error('Hit max value'))
      }).catch(() => console.error('Error in loading the feed'));;
  }).catch(() => console.error('Error in fething the feed'))
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

function addTitle(title, container, redirect) {
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