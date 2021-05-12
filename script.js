const quoteContainer = document.getElementById('quote-container')
const quote = document.getElementById('quote')
const author = document.getElementById('author')
const twitterBtn = document.getElementById('twitter')
const newQuoteBtn = document.getElementById('new-quote')
const loader = document.getElementById('loader')

function showLoadingSpinner() {
	loader.hidden = false
	quoteContainer.hidden = true
}

function hideLoaderSpinner() {
	if(!loader.hidden) {
		quoteContainer.hidden = false
		loader.hidden = true
	}
}

//GET QUOTE FROM API
async function getQuote() {
	showLoadingSpinner();

	const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
	const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';

	try {
		const response = await fetch(proxyUrl + apiUrl);
		const data = await response.json();

		//CHECKING FOR NO AUHTOR 
		if (data.quoteAuthor === '') {
			author.innerText = 'Unknown'
		}

		//CHECKING FOR LONG QUOTE
		if (data.quoteText.length > 120) {
			quote.classList.add('long-quote')
		} else {
			quote.classList.remove('long-quote')
		}

		quote.innerText = data.quoteText;
		author.innerText = data.quoteAuthor;
		hideLoaderSpinner();
	} 
	catch(error) {
		getQuote();
	}
}

//FUNCTION FOR TWITTER BTN
function tweetQuote() {
	const quotee = quote.innerText;
	const authorr = author.innerText;
	const twitterUrl = `https://twitter.com/intent/tweet?text=${quotee} - ${authorr}`;
	window.open(twitterUrl, '_blank')
}

//EVENT LISTENERS
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click', tweetQuote);

//ON LOAD
getQuote();