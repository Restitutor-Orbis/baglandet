
const DOMPARSER = new DOMParser().parseFromString.bind(new DOMParser())

var url = "https://rss.acast.com/altingetpolitik";

/* Fetch URLs from JSON */
fetch(url).then((res) => {
    res.text().then((xmlTxt) => {
      var domParser = new DOMParser()
      let doc = domParser.parseFromString(xmlTxt, 'text/xml')
      doc.querySelectorAll('item').forEach((item) => {
         let h1 = document.createElement('h1')
          h1.textContent = item.querySelector('title').textContent
           document.getElementById('output').appendChild(h1)
         })
       })
}).catch(() => console.error('Error in fetching the feed'))