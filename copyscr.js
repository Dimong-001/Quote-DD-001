
// window.console.log('testing');
const quoteContainer    = document.getElementById('quote-container');
const quoteText    = document.getElementById('quote');
const authorText    = document.getElementById('author');
const twitterBtn    = document.getElementById('twitter');
const newQuoteBtn    = document.getElementById('new-quote');
const loader =document.getElementById('loader');


let apiQuotes = [];

// show loading
function loading(){
    loader.hidden=false;
    quoteContainer.hidden=true;
}
// hide loading
function complete(){
    quoteContainer.hidden=false;
    loader.hidden = true;
}



//show new quote
function newQuote(){    
    loading();
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    // console.log(quote);
    // authorText.textContent = quote.author;
    // Check if author filed is blank and replace  it with 'Unknown'
    if (!quote.author){
        authorText.textContent='Unkown';
    }else{
        authorText.textContent=quote.author;
    }
    // check quote length to determine styling
    if(quote.text.length > 120){
        quoteText.classList.add('long-quote');
    }else{
        quoteText.classList.remove('long-quote');
    }
    // set quote , hide loader
    quoteText.textContent = quote.text;
    complete();
}

// Get Quotes from API
async function getQuotes(){
    const apiUrl='https://jacintodesign.github.io/quotes-api/data/quotes.json';
    try{
        const response = await fetch(apiUrl);
        apiQuotes = await response.json();
        // console.log(apiQuotes[12]);
        newQuote();
    }catch(error){
        //Catch error here
    }
}
// Tweet quote
function tweetQuote(){
    const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent};`
    window.open(twitterUrl, '_blank');
}

// Event Listeners
newQuoteBtn.addEventListener('click', newQuote);
twitterBtn.addEventListener('click', tweetQuote);


// on load

getQuotes();
// loading();