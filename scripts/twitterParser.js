function generateTwitterFeed() {
    let mainContainer = document.createElement('div');
    mainContainer.classList.add("twitter-container");

    let containerTitle = document.createElement('h2');
    containerTitle.textContent = "Altinget - Podcast";
    mainContainer.appendChild(containerTitle);
    

    var i = 0; //index in total number of elements;
    var high = 3;

    fetch(podcast_politics_url).then((res) => {
        res.text().then((xmlTxt) => {
            var domParser = new DOMParser()
            let feed = domParser.parseFromString(xmlTxt, 'text/xml')
            feed.querySelectorAll('item').forEach((item) => {
                i++;
                if(i > high) throw error;

                let container = document.createElement('div');
                container.classList.add('episode-container');

                var title     = item.querySelector('title').textContent;
                var image_url = item.getElementsByTagName('itunes:image')[0].attributes[0].nodeValue; //getting image node
                var link      = item.querySelector('link').textContent;

                let image = document.createElement('img');
                image.src = image_url;
                container.appendChild(image);
                addTitle(title, container, link);

                mainContainer.appendChild(container);
            })
        });
    }).catch(() => console.error('Error in loading the twitter feed'))

    var doc = document.getElementById('news-section-1');
    doc.appendChild(mainContainer);
}