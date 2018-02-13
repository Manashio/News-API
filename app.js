const apiKey = '36c64372d0aa470d81360c574cef839f';
const main = document.querySelector('main');
window.addEventListener( 'load', e =>{
	updateNews();
});

if('serviceWorker' in navigator){
	try{
		navigator.serviceWorker.register('sw.js');
		console.log(`SW registered`);
	}catch(error){

	}
}


async function updateNews() {
	const res = await fetch(`https://newsapi.org/v2/top-headlines?sources=techcrunch&apiKey=${apiKey}
`);
	const json = await res.json();
	main.innerHTML = json.articles.map(createArticle).join('<br>');
}
function createArticle(article) {
	return `
		<div class="article">
			<h2>${article.title}</h2>
			<img src="${article.urlToImage}">
			<p>${article.description}</p>
			<a class="btn" href="${article.url}">Read more</a>
		</div>
		`;
}


let item = document.getElementById('status');

function clientMsg(){
		if(navigator.onLine){
		}else{
			let target = document.getElementById('status').innerHTML = "<div class = 'status'>OFFLINE</div>";

			setTimeout(function(){
				item.style.display = 'none';
			}, 3000);
		}
}
window.addEventListener('online', clientMsg);
clientMsg();

