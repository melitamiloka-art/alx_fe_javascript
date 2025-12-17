let quotes = [
  { text: "The best way to get started is to quit talking and begin doing.", category: "Motivation" },
  { text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { text: "Do not take life too seriously. You will never get out of it alive.", category: "Humor" },
  { text: "Learning never exhausts the mind.", category: "Education" },
  { text: "Simplicity is the ultimate sophistication.", category: "Philosophy" }
];

function displayRandomQuote() {
  const quoteDisplay = document.getElementById("quoteDisplay");

  const randomIndex = Math.floor(Math.random() * quotes.length);
  const quote = quotes[randomIndex];

  quoteDisplay.innerHTML = `
    "${quote.text}" <br>
    <span class="quote-category">— ${quote.category}</span>
  `;

  return quote;
}

function addQuote() {
  const text = document.getElementById("newQuoteText").value.trim();
  const category = document.getElementById("newQuoteCategory").value.trim();

  if (!text || !category) {
    alert("Both fields are required.");
    return;
  }

  quotes.push({ text, category });
  alert("Quote added!");
}


const btn = document.getElementById("newQuote");
btn.addEventListener("click", displayRandomQuote);

document.getElementById("addQuoteBtn").addEventListener("click", addQuote);



console.log(" Running Diagnostics...");


if (!Array.isArray(quotes)) {
  console.error(" quotes array missing or invalid");
} else if (!quotes.every(q => q.text && q.category)) {
  console.error(" some quotes missing text or category");
} else {
  console.log("✔ quotes array valid");
}


if (typeof displayRandomQuote !== "function") {
  console.error(" displayRandomQuote missing");
} else {
  console.log("✔ displayRandomQuote function found");
}
if (!listenersWorking) {
  console.error(" Show New Quote button missing");
} else {
  console.log("✔ 'Show New Quote' button found and listener registered");
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
    container.textContent = quote.text || quote;
    quoteDisplay.appendChild(container);
  });
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
    const selectedCategory = document.getElementById('categoryFilter').value;
    const filtered = selectedCategory === 'all' 
        ? quotes 
        : quotes.filter(q => q.category === selectedCategory);
    localStorage.setItem('selectedCategory', selectedCategory);
}

function saveLocalQuotes(quotes) {
    localStorage.setItem("quotes", JSON.stringify(quotes));
}

function notify(message) {
    const box = document.getElementById("notification");
    if (!box) {
        console.warn("UI notification element (#notification) missing.");
        return;
    }

    box.innerText = message;
    box.style.display = "block";

    setTimeout(() => box.style.display = "none", 3000);
}


async function fetchQuotesFromServer() {
    try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts");
        const data = await res.json();
        return data;
    } catch (err) {
        notify("Error fetching quotes from server.");
        console.error(err);
        return [];
    }
}


async function postQuoteToServer(quote) {
    try {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(quote)
        });

        return await res.json(); 
    } catch (err) {
        notify("Error posting quote to server.");
        console.error(err);
        return null;
    }
}

function resolveConflict(serverQuote, localQuote) {
    const userAcceptsServer = confirm(
        "Conflict detected!\n\n" +
        "OK = Use server version\n" +
        "Cancel = Keep local version"
    );

    return userAcceptsServer ? serverQuote : localQuote;
}

async function syncQuotes() {
    const serverQuotes = await fetchQuotesFromServer();
    const localQuotes = getLocalQuotes();

    const merged = serverQuotes.map(serverQuote => {
        const match = localQuotes.find(q => q.id === serverQuote.id);

        if (!match) return serverQuote;

        const isDifferent =
            JSON.stringify(match) !== JSON.stringify(serverQuote);

        if (isDifferent) {
            return resolveConflict(serverQuote, match);
        }

        return serverQuote;
    });

    saveLocalQuotes(merged);
    notify("Quotes synced with server.");
}

setInterval(syncQuotes, 30000); 


async function addQuoteToServer(text) {
    const newQuote = {
        title: "User Quote",
        body: text,
        userId: 1
    };

    const serverSaved = await postQuoteToServer(newQuote);
    if (!serverSaved) return;

    const localQuotes = getLocalQuotes();
    localQuotes.push(serverSaved);

    saveLocalQuotes(localQuotes);
    notify("New quote added and synced!");
}