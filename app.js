const apiKey = '36c64372d0aa470d81360c574cef839f';

const main = document.querySelector('main');
const heading = document.querySelector('heading');


if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/sw.js').then(function(registration) {
    console.log('Service worker registration succeeded:', registration);
  }).catch(function(error) {
    console.log('Service worker registration failed:', error);
  });
} else {
  console.log('Service workers are not supported.');
}


window.addEventListener( 'load', e =>{
	updateNews();
});

async function updateNews() {
	const res = await fetch(`https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=${apiKey}`);
	const json = await res.json();
	main.innerHTML = json.articles.map(createArticle).join('<br>');
	heading.innerHTML = json.articles.map(getTitle).join('');
}
function createArticle(article) {
	return `
		<div class="article" id="${article.author}">
			<img src="${article.urlToImage}">
			<h4 class="h4 ml-3 pt-3 mt-3">${article.title}</h4>
			<p>${article.description}</p>
			<a class="btn" href="${article.url}">Read more</a>
		</div>
		`;
}
function getTitle(article){
		return `<a class="ico" href="#${article.author}">${article.author}</a>`;
}

let item = document.getElementById('status');
function clientMsg(){
		if(navigator.onLine){
		}else{
			let target = document.getElementById('status').innerHTML = "Connection error";
			item.style.backgroundColor = "#5f30ea";    
			item.style.border = "2px solid #fff";
			setTimeout(function(){item.style.display = 'none';},5000);
		}
}
window.addEventListener('online', clientMsg);
clientMsg();

