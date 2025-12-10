let quotes = JSON.parse(localStorage.getItem('quotes')) || [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Do what you can with all you have, wherever you are.", category: "Action" }
];

function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

function populateCategories() {
  const categorySelect = document.getElementById('categorySelect');

  
  const categories = [...new Set(quotes.map(q => q.category))];


  categorySelect.innerHTML = '<option value="All">All</option>';

  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    categorySelect.appendChild(option);
  });
}

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