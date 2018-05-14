const apiKey = '36c64372d0aa470d81360c574cef839f';
const main = document.querySelector('main');
const heading = document.querySelector('heading');
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
	if(article.author == null){
		return ``;
	}else{
		return `<a class="ico" href="#${article.author}">${article.author}</a>`;
	}
}

let item = document.getElementById('status');
function clientMsg(){
		if(navigator.onLine){
		}else{
			let target = document.getElementById('status').innerHTML = "Connection error";
			item.style.backgroundColor = "#333";    
			item.style.border = "2px solid #fff";
			setTimeout(function(){item.style.display = 'none';},5000);
		}
}
window.addEventListener('online', clientMsg);
clientMsg();

