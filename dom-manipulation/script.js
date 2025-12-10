console.log("Checking requisite files exist...");


let quotes = [
  { text: "Success is not final; failure is not fatal.", category: "Motivation" },
  { text: "In the middle of difficulty lies opportunity.", category: "Inspiration" },
  { text: "The secret of getting ahead is getting started.", category: "Productivity" }
];

if (Array.isArray(quotes) && quotes.every(q => q.text && q.category)) {
  console.log("Quotes array exists and has proper structure.");
} else {
  console.error("Quotes array is missing or has wrong structure!");
}


const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteButton = document.getElementById("newQuote");
const addQuoteButton = document.getElementById("addQuoteBtn");
const textInput = document.getElementById("newQuoteText");
const categoryInput = document.getElementById("newQuoteCategory");


function displayRandomQuote() {
  if (quotes.length === 0) {
    quoteDisplay.innerHTML = "<p>No quotes available.</p>";
    return;
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  
  quoteDisplay.innerHTML = `
    <p><strong>"${randomQuote.text}"</strong></p>
    <p>— Category: <em>${randomQuote.category}</em></p>
  `;
}

console.log("displayRandomQuote function exists.");


function addQuote() {
  const newText = textInput.value.trim();
  const newCategory = categoryInput.value.trim();

  if (!newText || !newCategory) {
    alert("Please enter both a quote and a category.");
    return;
  }

 
  const newQuote = { text: newText, category: newCategory };
  quotes.push(newQuote);
  console.log("New quote added to array:", newQuote);

 
  quoteDisplay.innerHTML = `
    <p style="color: green;">New quote added successfully!</p>
    <p><strong>"${newText}"</strong> — Category: <em>${newCategory}</em></p>
  `;

  
  textInput.value = "";
  categoryInput.value = "";
}

console.log("addQuote function exists.");


newQuoteButton.addEventListener("click", displayRandomQuote);
addQuoteButton.addEventListener("click", addQuote);

console.log("Event listener on 'Show New Quote' button is set.");
