
const DOMPARSER = new DOMParser().parseFromString.bind(new DOMParser())

/* Fetch URLs from JSON */
function generateFeed(url, noOfArticles) {
    var i = 0;

    fetch(url).then((res) => {
        res.text().then((xmlTxt) => {
          var domParser = new DOMParser()
          let feed = domParser.parseFromString(xmlTxt, 'text/xml')
          feed.querySelectorAll('item').forEach((item) => {
             i++;
             if(i > noOfArticles) throw BreakException;

             let h1 = document.createElement('h1')
              h1.textContent = item.querySelector('title').textContent
               document.getElementById('output').appendChild(h1)
             })
           }).catch((e) => {if (e !== BreakException) throw e});
    }).catch(() => console.error('Error in fetching the feed'))
}