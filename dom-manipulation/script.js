let quotes = [
  { text: "Success is not final; failure is not fatal.", category: "Motivation" },
  { text: "In the middle of difficulty lies opportunity.", category: "Inspiration" },
  { text: "The secret of getting ahead is getting started.", category: "Productivity" }
];


const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteButton = document.getElementById("newQuote");


const textInput = document.getElementById("newQuoteText");
const categoryInput = document.getElementById("newQuoteCategory");
const addQuoteButton = document.getElementById("addQuoteBtn");


function showRandomQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const randomQuote = quotes[randomIndex];

  
  quoteDisplay.innerHTML = `
    <p><strong>"${randomQuote.text}"</strong></p>
    <p>— Category: <em>${randomQuote.category}</em></p>
  `;
}


newQuoteButton.addEventListener("click", showRandomQuote);


function addQuote() {
  const newText = textInput.value.trim();
  const newCategory = categoryInput.value.trim();

  
  if (newText === "" || newCategory === "") {
    alert("Please enter BOTH the quote text and category.");
    return;
  }

  
  quotes.push({
    text: newText,
    category: newCategory
  });

  
  quoteDisplay.innerHTML = `
    <p style="color: green;">New quote added successfully!</p>
  `;

  
  textInput.value = "";
  categoryInput.value = "";
}


addQuoteButton.addEventListener("click", addQuote);