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

document.addEventListener('DOMContentLoaded', function() {
  document.getElementById('newQuote').addEventListener('click', displayRandomQuote);
  document.getElementById('addQuoteBtn').addEventListener('click', addQuote);
  
 
  displayRandomQuote();
});


function loadQuotes() {
  const storedQuotes = localStorage.getItem("quotes");
  if (storedQuotes) {
    quotes = JSON.parse(storedQuotes);
  }
}


function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}


function displayQuote() {
  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];
  document.getElementById("quoteDisplay").innerText = quote;

  
  sessionStorage.setItem("lastQuote", quote);
}


document.getElementById("newQuoteBtn").addEventListener("click", displayQuote);


loadQuotes();
const lastQuote = sessionStorage.getItem("lastQuote");
if (lastQuote) {
  document.getElementById("quoteDisplay").innerText = lastQuote;
} else {
  displayQuote();
}


document.getElementById("exportBtn").addEventListener("click", () => {
  const dataStr = JSON.stringify(quotes, null, 2); 
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();
  URL.revokeObjectURL(url);  
});

document.getElementById("importFile").addEventListener("change", importFromJsonFile);

function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);

      if (Array.isArray(importedQuotes)) {
        quotes.push(...importedQuotes);
        saveQuotes(); 
        alert("Quotes imported successfully!");
      } else {
        alert("Invalid JSON format: Expected an array of quotes.");
      }
    } catch (err) {
      alert("Error parsing JSON file: " + err.message);
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

let quotes = [
  { text: "The journey of a thousand miles begins with one step.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Do what you can, with what you have, where you are.", category: "Motivation" },
  { text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment.", category: "Philosophy" }
];


if(localStorage.getItem('quotes')) {
  quotes = JSON.parse(localStorage.getItem('quotes'));
}

function populateCategories() {
  const categoryFilter = document.getElementById('categoryFilter');

  
  const categories = [...new Set(quotes.map(q => q.category))];

  
  categoryFilter.innerHTML = `<option value="all">All Categories</option>`;

  categories.forEach(category => {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categoryFilter.appendChild(option);
  });

  
  const lastCategory = localStorage.getItem('selectedCategory');
  if(lastCategory) {
    categoryFilter.value = lastCategory;
  }
}

function displayQuotes(filteredQuotes = quotes) {
  const container = document.getElementById('quoteContainer');
  container.innerHTML = '';

  if(filteredQuotes.length === 0) {
    container.textContent = 'No quotes available for this category.';
    return;
  }

  filteredQuotes.forEach(q => {
    const p = document.createElement('p');
    p.textContent = `"${q.text}" — ${q.category}`;
    container.appendChild(p);
  });
}

function filterQuotes() {
  const selectedCategory = document.getElementById('categoryFilter').value;
  localStorage.setItem('selectedCategory', selectedCategory); // Save last selection

  if(selectedCategory === 'all') {
    displayQuotes();
  } else {
    const filtered = quotes.filter(q => q.category === selectedCategory);
    displayQuotes(filtered);
  }
}

function addQuote() {
  const quoteText = document.getElementById('newQuote').value.trim();
  const categoryText = document.getElementById('newCategory').value.trim();

  if(!quoteText || !categoryText) {
    alert("Both quote and category are required.");
    return;
  }

  const newQuote = { text: quoteText, category: categoryText };
  quotes.push(newQuote);

  
  localStorage.setItem('quotes', JSON.stringify(quotes));

  
  populateCategories();

 
  filterQuotes();

  document.getElementById('newQuote').value = '';
  document.getElementById('newCategory').value = '';
}

populateCategories();
filterQuotes();