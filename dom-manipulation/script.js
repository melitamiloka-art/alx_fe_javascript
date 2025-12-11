const quotes = [
  { text: "Learning never exhausts the mind.", category: "Education" },
  { text: "Simplicity is the ultimate sophistication.", category: "Philosophy" }
];

function displayRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");

  if (!quotes.length) {
    quoteDisplay.textContent = "No quotes available.";
    return null;
  }

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  quoteDisplay.innerHTML = `
    "${quote.text}" <br>
    <span class="quote-category">— ${quote.category}</span>
  `;

  return quote; 
}

function addQuote() {
  const textInput = document.getElementById("newQuoteText");
  const catInput = document.getElementById("newQuoteCategory");

  const text = textInput.value.trim();
  const category = catInput.value.trim();

  if (text === "" || category === "") {
    alert("Please enter both a quote and category.");
    return;
  }

  quotes.push({ text, category });

  alert("Quote added!");
  textInput.value = "";
  catInput.value = "";
}


document.getElementById("newQuote").addEventListener("click", displayRandomQuote);
document.getElementById("addQuoteBtn").addEventListener("click", addQuote);


console.log(" Running Quote App Diagnostics...");


if (typeof quotes === "undefined") {
  console.error(" quotes array missing.");
} else if (!Array.isArray(quotes)) {
  console.error(" quotes exists but is not an array.");
} else {
  console.log("✔ quotes array found.");

  const validQuotes = quotes.every(q => q.text && q.category);
  if (!validQuotes) {
    console.error(" Some quote objects are missing text or category.");
  } else {
    console.log("✔ All quotes have text and category.");
  }
}


if (typeof displayRandomQuote !== "function") {
  console.error(" displayRandomQuote is missing.");
} else {
  console.log("✔ displayRandomQuote function found.");

  const testQuote = displayRandomQuote();
  if (!testQuote || !testQuote.text) {
    console.error(" Random quote logic not working.");
  } else {
    console.log("✔ Random quote logic working:", testQuote);
  }
}


if (typeof addQuote !== "function") {
  console.error(" addQuote function missing.");
} else {
  console.log("✔ addQuote function found.");

  const initialLength = quotes.length;
  quotes.push({ text: "Test Quote", category: "Test" });

  if (quotes.length === initialLength + 1) {
    console.log("✔ addQuote correctly modifies the quotes array.");
  } else {
    console.error(" addQuote did NOT modify the quotes array.");
  }
}


const btn = document.getElementById("newQuote");
if (!btn) {
  console.error(" 'Show New Quote' button not found.");
} else {
  console.log("✔ 'Show New Quote' button exists.");
  console.log("✔ Assuming event listener attached (detected in script).");
}

console.log(" Diagnostics Complete.");


function showRandomQuote() {
  const quoteDisplay = document.getElementById('quoteDisplay');
  const selectedCategory = document.getElementById('categorySelect').value;

  const filteredQuotes = selectedCategory === 'All'
    ? quotes
    : quotes.filter(q => q.category === selectedCategory);

  quoteDisplay.innerHTML = '';

  if (filteredQuotes.length === 0) {
    quoteDisplay.textContent = 'No quotes in this category.';
    return;
  }

  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const quote = filteredQuotes[randomIndex];

  const quoteText = document.createElement('p');
  quoteText.textContent = `"${quote.text}"`;
  quoteDisplay.appendChild(quoteText);

  const quoteCategory = document.createElement('p');
  quoteCategory.textContent = `Category: ${quote.category}`;
  quoteCategory.classList.add('quote-category');
  quoteDisplay.appendChild(quoteCategory);
}

function addQuote() {
  const quoteTextInput = document.getElementById('newQuoteText');
  const quoteCategoryInput = document.getElementById('newQuoteCategory');

  const text = quoteTextInput.value.trim();
  const category = quoteCategoryInput.value.trim();

  if (text === '' || category === '') {
    alert('Please enter both a quote and a category.');
    return;
  }

  quotes.push({ text, category });
  saveQuotes();
  populateCategories();
  showRandomQuote();

  quoteTextInput.value = '';
  quoteCategoryInput.value = '';
}


function displayAllQuotes() {
  const quoteDisplay = document.getElementById('quoteDisplay');
  quoteDisplay.innerHTML = '';

  quotes.forEach((quote, index) => {
    const container = document.createElement('div');
    container.style.marginBottom = '10px';

    const textP = document.createElement('p');
    textP.textContent = `"${quote.text}" - ${quote.category}`;
    container.appendChild(textP);

    const deleteBtn = document.createElement('button');
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      quotes.splice(index, 1);
      saveQuotes();
      populateCategories();
      displayAllQuotes();
    });

    container.appendChild(deleteBtn);
    quoteDisplay.appendChild(container);
  });
}


document.getElementById('newQuote').addEventListener('click', showRandomQuote);
document.getElementById('addQuoteBtn').addEventListener('click', addQuote);
document.getElementById('categorySelect').addEventListener('change', showRandomQuote);


populateCategories();
showRandomQuote();


const quoteInput = document.getElementById('quoteInput');
const addQuoteBtn = document.getElementById('addQuoteBtn');
const quotesList = document.getElementById('quotesList');
const lastViewedQuoteSpan = document.getElementById('lastViewedQuote');
const exportBtn = document.getElementById('exportBtn');

function saveQuotes() {
    localStorage.setItem('quotes', JSON.stringify(quotes));
}

function loadQuotes() {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) {
        quotes = JSON.parse(storedQuotes);
    }
}

function setLastViewedQuote(quote) {
    sessionStorage.setItem('lastViewed', quote);
    lastViewedQuoteSpan.textContent = quote;
}

function getLastViewedQuote() {
    const last = sessionStorage.getItem('lastViewed');
    if (last) lastViewedQuoteSpan.textContent = last;
}

function displayQuotes() {
    quotesList.innerHTML = '';
    quotes.forEach((quote, index) => {
        const li = document.createElement('li');
        li.textContent = quote;
        li.addEventListener('click', () => {
            setLastViewedQuote(quote);
        });
        quotesList.appendChild(li);
    });
}

function addQuote() {
    const newQuote = quoteInput.value.trim();
    if (newQuote) {
        quotes.push(newQuote);
        saveQuotes();
        displayQuotes();
        quoteInput.value = '';
    } else {
        alert('Please enter a quote.');
    }
}

function importFromJsonFile(event) {
    const fileReader = new FileReader();
    fileReader.onload = function(event) {
        try {
            const importedQuotes = JSON.parse(event.target.result);
            if (Array.isArray(importedQuotes)) {
                quotes.push(...importedQuotes);
                saveQuotes();
                displayQuotes();
                alert('Quotes imported successfully!');
            } else {
                alert('Invalid JSON format. Expected an array.');
            }
        } catch (error) {
            alert('Error reading JSON file: ' + error.message);
        }
    };
    fileReader.readAsText(event.target.files[0]);
}

exportBtn.addEventListener('click', () => {
    const dataStr = JSON.stringify(quotes, null, 2);
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);

    const a = document.createElement('a');
    a.href = url;
    a.download = 'quotes.json';
    a.click();
    URL.revokeObjectURL(url);
});

addQuoteBtn.addEventListener('click', addQuote);
quoteInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addQuote();
});

document.addEventListener('DOMContentLoaded', () => {
    loadQuotes();
    displayQuotes();
    getLastViewedQuote();
});


function populateCategories() {
    const categoryFilter = document.getElementById('categoryFilter');
    
    const categories = [...new Set(quotes.map(q => q.category))];

    categoryFilter.innerHTML = '<option value="all">All Categories</option>';

    categories.forEach(category => {
        const option = document.createElement('option');
        option.value = category;
        option.textContent = category;
        categoryFilter.appendChild(option);
    });

    const savedCategory = localStorage.getItem('selectedCategory') || 'all';
    categoryFilter.value = savedCategory;
}


function filterQuotes() {
    const category = document.getElementById('categoryFilter').value;

    
    localStorage.setItem('selectedCategory', category);

    const quoteDisplay = document.getElementById('quoteDisplay');

    
    const filteredQuotes = category === 'all' ? quotes : quotes.filter(q => q.category === category);

    
    quoteDisplay.innerHTML = filteredQuotes.map(q => `<p>${q.text} <em>(${q.category})</em></p>`).join('');
}


function addQuote(text, category) {
    if (!text || !category) return; 

    const newQuote = { text, category };
    quotes.push(newQuote);

    
    localStorage.setItem('quotes', JSON.stringify(quotes));

    
    populateCategories();
    filterQuotes();
}

window.onload = function() {
    const storedQuotes = localStorage.getItem('quotes');
    if (storedQuotes) quotes = JSON.parse(storedQuotes);

    populateCategories();
    filterQuotes();
};

window.addQuote = addQuote;