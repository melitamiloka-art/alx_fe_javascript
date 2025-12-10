let quotes = [
  { text: "Success is not final; failure is not fatal.", category: "Motivation" },
  { text: "In the middle of difficulty lies opportunity.", category: "Inspiration" },
  { text: "The secret of getting ahead is getting started.", category: "Productivity" }
];


const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteButton = document.getElementById("newQuote");
const addQuoteButton = document.getElementById("addQuoteBtn");
const textInput = document.getElementById("newQuoteText");
const categoryInput = document.getElementById("newQuoteCategory");


function showRandomQuote() {
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


function addQuote() {
  const newText = textInput.value.trim();
  const newCategory = categoryInput.value.trim();

  
  if (newText === "" || newCategory === "") {
    alert("Please enter both a quote and a category.");
    return;
  }

  
  const newQuote = { text: newText, category: newCategory };
  quotes.push(newQuote);

  
  quoteDisplay.innerHTML = `
    <p style="color: green;">New quote added successfully!</p>
    <p><strong>"${newQuote.text}"</strong> — Category: <em>${newQuote.category}</em></p>
  `;

  textInput.value = "";
  categoryInput.value = "";
}


newQuoteButton.addEventListener("click", showRandomQuote);
addQuoteButton.addEventListener("click", addQuote);
