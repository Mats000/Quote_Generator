const quoteContainer = document.getElementById("quoteContainer");
const quoteText = document.getElementById("quote");
const authorText = document.getElementById("author");
const twitterBtn = document.getElementById("twitter");
const newQuoteBtn = document.getElementById("new-quote");
const loader = document.getElementById("loader");

let apiQuotes = [];

//Show loading

function loading() {
  loader.hidden = false;
  quoteContainer.hidden = true;
}
//Hide Loading

function complete() {
  quoteContainer.hidden = false;
  loader.hidden = true;
}
// Show ne Quote
function newQuote() {
  loading();
  //Pick a random quote from API
  const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
  complete();
  //Check if Author is blank and replace with Unknown
  if (!quote.author) {
    authorText.textContent = "Unknown";
  } else {
    authorText.textContent = quote.author;
  }
  // Check quote length to change styling if needed
  if (quote.text.length > 100) {
    quoteText.classList.add("long-quote");
  } else {
    quoteText.classList.remove("long-quote");
  }
  authorText.textContent = quote.author;
  quoteText.textContent = quote.text;
}
//Ste Quote, Hide Loader

quoteText.textContent = quote.text;

// Get Quotes from an API
async function getQuotes() {
  loading();
  const apiUrl = "https://jacintodesign.github.io/quotes-api/data/quotes.json";
  try {
    const response = await fetch(apiUrl);
    apiQuotes = await response.json();
    newQuote();
  } catch (error) {
    alert(error);
    //catch error here
    complete();
  }
}
// Tweet a quote
function tweetQuote() {
  const twitterUrl = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${authorText.textContent}`;
  window.open(twitterUrl, "_blank");
}

// Event Listeners
newQuoteBtn.addEventListener("click", newQuote);
twitterBtn.addEventListener("click", tweetQuote);

// On LOAD
getQuotes();
