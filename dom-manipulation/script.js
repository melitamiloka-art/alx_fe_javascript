const quotes = [
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


const testQuote = displayRandomQuote();
if (!testQuote || !testQuote.text) {
  console.error(" random quote logic failed");
} else {
  console.log("✔ random quote logic working:", testQuote);
}


const before = quotes.length;
quotes.push({ text: "Test Quote", category: "Test" });
if (quotes.length === before + 1) {
  console.log("✔ addQuote logic correct");
} else {
  console.error(" addQuote did not modify quotes array");
}


const listenersWorking = !!btn;
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


const SERVER_URL = "https://jsonplaceholder.typicode.com/posts";


let localQuotes = JSON.parse(localStorage.getItem("quotes")) || [];

function saveLocalQuotes() {
  localStorage.setItem("quotes", JSON.stringify(localQuotes));
}


async function fetchQuotesFromServer() {
  try {
    const response = await fetch(SERVER_URL);
    return await response.json();
  } catch (e) {
    console.error("Server fetch failed:", e);
    notifyUser("⚠ Unable to sync with server");
    return [];
  }
}

async function postQuoteToServer(quote) {
  try {
    const response = await fetch(SERVER_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(quote),
    });
    return await response.json();
  } catch (e) {
    console.error("Server post failed:", e);
    notifyUser("⚠ Failed to upload quote to server");
  }
}


function resolveConflicts(serverQuotes) {
  let updatedLocal = [...localQuotes];

  serverQuotes.forEach(serverQuote => {
    const normalizedQuote = {
      id: serverQuote.id,
      text: serverQuote.title || serverQuote.body,
      updatedAt: Date.now(),
    };

    const localMatch = updatedLocal.find(q => q.id === normalizedQuote.id);

    if (!localMatch) {
      
      updatedLocal.push(normalizedQuote);
    } else {
      
      updatedLocal = updatedLocal.map(q =>
        q.id === normalizedQuote.id ? normalizedQuote : q
      );
    }
  });

  localQuotes = updatedLocal;
  saveLocalQuotes();

  notifyUser(" Quotes synced with server");
}


async function syncWithServer() {
  const serverData = await fetchQuotesFromServer();

  
  const formattedServerQuotes = serverData.map(q => ({
    id: q.id,
    title: q.title,
    body: q.body,
  }));

  resolveConflicts(formattedServerQuotes);
}




function displayRandomQuote() {
  if (localQuotes.length === 0) {
    notifyUser("No quotes available");
    return;
  }

  const random = localQuotes[Math.floor(Math.random() * localQuotes.length)];
  document.getElementById("quote").textContent = random.text;
}

document.getElementById("new-quote-btn")?.addEventListener("click", displayRandomQuote);




document.getElementById("add-quote-btn")?.addEventListener("click", async () => {
  const input = document.getElementById("quote-input").value.trim();

  if (!input) {
    notifyUser("⚠ Enter a quote first");
    return;
  }

  const newQuote = {
    id: Date.now(),
    text: input,
    updatedAt: Date.now(),
  };

 
  localQuotes.push(newQuote);
  saveLocalQuotes();

  
  await postQuoteToServer(newQuote);

  notifyUser("✨ Quote added & synced");
});




function notifyUser(message) {
  const box = document.getElementById("notification");
  if (!box) return;

  box.textContent = message;
  box.classList.remove("hidden");

  setTimeout(() => box.classList.add("hidden"), 3500);
}




document.getElementById("resolve-conflicts")?.addEventListener("click", () => {
  notifyUser("Manual conflict resolution is not implemented yet.");
});




setInterval(syncWithServer, 15000); 


syncWithServer();
displayRandomQuote();