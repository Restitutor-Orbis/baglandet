
const DOMPARSER = new DOMParser().parseFromString.bind(new DOMParser())

/* Fetch the feed from given url. Only x number of items fetched
*  Designed to work by the XML provided by Jyllandsposten.s
*/
function generateFeed_jyllandsposten(url, min, high) {
    var i = 0; //index in total number of elements;
    var j = 0; //number of inserted elements;

    fetch(url).then((res) => {
        res.text().then((xmlTxt) => {
          var domParser = new DOMParser();
          let feed = domParser.parseFromString(xmlTxt, 'text/xml');
          feed.querySelectorAll('item').forEach((item) => {
            i++;
            if(i < min) return;
            if(i > high) return;

            j++;

            let container = document.createElement('div');
            container.classList.add('article-container');

            if(j % 2 === 0) container.style.float = "right";
            else            container.style.float = "left";

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

            timeToContent.set(date, container);

            document.getElementById('news-section-1').appendChild(container);

            addToGlobalMap();

          }).catch((Error) => {
            console.error('Hit max value');
          })
        });
    }).catch(() => console.error('Error in fetching the feed'));
}


/* Fetch the feed from given url. Only x number of items fetched
*  Designed to work by the XML provided by Berlingske.
*/
function generateFeed_berlingske(url, min, high) {
  var i = 0; //index in total number of elements;
  var j = 0; //number of inserted elements;

  fetch(url).then((res) => {
      res.text().then((xmlTxt) => {
        var domParser = new DOMParser()
        let feed = domParser.parseFromString(xmlTxt, 'text/xml')
        feed.querySelectorAll('item').forEach((item) => {
          i++;
          if(i < min) return;
          if(i > high) return;

          j++;

          let container = document.createElement('div');
          container.classList.add('article-container');

          if(j % 2 === 0) container.style.float = "right";
          else            container.style.float = "left";

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

          document.getElementById('news-section-1').appendChild(container);
        }).catch(() => console.error('Hit max value'))
      });
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