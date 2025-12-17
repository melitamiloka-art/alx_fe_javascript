let quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Don't let yesterday take up too much of today.", category: "Inspiration" },
  { text: "It's not whether you get knocked down, it's whether you get up.", category: "Perseverance" }
];


function displayRandomQuote() {
  
  if (quotes.length === 0) {
    document.getElementById('quoteDisplay').innerText = "No quotes available!";
    return;
  }
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  document.getElementById('quoteDisplay').innerText = `"${quote.text}" - ${quote.category}`;
}


function addQuote() {
  
  const textInput = document.getElementById('newQuoteText');
  const categoryInput = document.getElementById('newQuoteCategory');

  const newQuoteText = textInput.value.trim();
  const newQuoteCategory = categoryInput.value.trim();

  if (newQuoteText && newQuoteCategory) {
    quotes.push({ text: newQuoteText, category: newQuoteCategory });
    textInput.value = "";
    categoryInput.value = "";
    displayRandomQuote(); 
  } else {
    alert("Please enter both a quote and a category.");
  }
}


document.getElementById('newQuote').addEventListener('click', displayRandomQuote);
document.getElementById('addQuoteBtn').addEventListener('click', addQuote);