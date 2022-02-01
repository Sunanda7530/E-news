
const urlSearchParams = new URLSearchParams(window.location.search);
const params = Object.fromEntries(urlSearchParams.entries());
let queryCategory = params.cat;
let pageSize = 4;

function getNews(category) {
    let x = fetch("https://newsapi.org/v2/top-headlines?country=in&category=" + category + "&apiKey=3f9d2bafb05f45eba55b2dcc485e25a8&pageSize="+pageSize+"")
    x.then(res => res.json()).then(jSonData => {
        // console.log(jSonData);
        bindData(jSonData.articles, category);
    })
}

function bindData(news, heading) {
    let html = `
    <div class="row">
    <div class="col">
      <h1 class="bg-dark text-light">${heading.toUpperCase()}</h1>
    </div>
  </div>
  <div class="row">
    ${createCard(news)}
  </div>
    `
    document.getElementById('newBox').innerHTML += html;
}

// props 
function createCard(news) {
    return news.map(element => `
          <div class="col-3">
              <div class="card">
              <img src="${element.urlToImage}" class="card-img-top" alt="...">
              <div class="card-body">
                <h5 class="card-title">${element.title}</h5>
                <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p>
                <a href="${element.url}" class="btn btn-primary">Read More</a>
              </div>
            </div>
        </div>
        `).join('')
}

let newsCategory = ['general', 'business', 'entertainment', 'technology'];

if(queryCategory != undefined){
    // newsCategory = newsCategory.filter(x => x == queryCategory);
    newsCategory = [queryCategory]
    pageSize = 12;
    
}

newsCategory.forEach(cat => getNews(cat));