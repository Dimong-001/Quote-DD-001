const quoteContainer =document.getElementById('quote-container');
const quoteText =document.getElementById('quote');
const authorText =document.getElementById('author');
const twitterBtn =document.getElementById('twitter');
const newQuoteBtn =document.getElementById('new-quote');
const loader=document.getElementById('loader');
const facebookBtn = document.getElementById('facebook'); // Added Facebook button reference

// Show loading
function loading()
{
    loader.hidden=false;
    quoteContainer.hidden =true;
}
// hide loading
function complete(){
    if(!loader.hidden){
        quoteContainer.hidden=false;
        loader.hidden=true;
    }
}

// Get quote from API
async function getQuote() {
    loading();
    const proxyUrl = 'https://corsproxy.io/?';
    const apiUrl = 'http://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=json';
    try {
      const response = await fetch(proxyUrl + encodeURIComponent(apiUrl));
      const data = await response.json();
    //   If author is blak add unkown
      if (data.quoteAuthor === ''){
        authorText.innerText = 'Unknown';
      }else{
        authorText.innerText= data.quoteAuthor;
      }
      // Reduce font size for long quotes
      if(data.quoteText,length > 50){
        quoteText.classList.add('long-quote');
      }else{
        quoteText.classList.remove('long-quote');
      }
    //   authorText.innerText = data.quoteAuthor;
      quoteText.innerText = data.quoteText;
    //   const quoteObj = JSON.parse(data.contents);

    //   console.log(quoteObj);
    // stoploader,show quote
    complete();
    } catch (error) {
    //   console.log('whoops, no quote', error);
    }
  }


// Tweet Quote
  function tweetQuote(){
    const quote= quoteText.innerText;
    const author= authorText.innerText;
    const twitterUrl=`https://twitter.com/intent/tweet?text=${quote} - ${author}`;
    window.open(twitterUrl,'_blank');

  }
  // Share Quote on Facebook
  function shareQuoteOnFacebook() {
    const quote = quoteText.innerText;
    const author = authorText.innerText;
    FB.ui({
        method: 'share',
        href: window.location.href,
        quote: `${quote} - ${author}`
    }, function(response){});
}

//   event listeners
newQuoteBtn.addEventListener('click', getQuote);
twitterBtn.addEventListener('click',tweetQuote);
facebookBtn.addEventListener('click', shareQuoteOnFacebook); // Added event listener for Facebook button   
  // On Load
  getQuote();
