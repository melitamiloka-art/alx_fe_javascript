const serverURL = "https://mockapi.io/projects/quotes"; 


const quoteDisplay = document.getElementById('quoteDisplay');
const newQuoteBtn = document.getElementById('newQuote');
const addQuoteBtn = document.getElementById('addQuoteBtn');
const newQuoteText = document.getElementById('newQuoteText');
const newQuoteCategory = document.getElementById('newQuoteCategory');
const categorySelect = document.getElementById('categorySelect');
const filterBtn = document.getElementById('filterBtn');
const notifications = document.getElementById('notifications');


const STORAGE_KEY = "quotesApp";


let quotes = JSON.parse(localStorage.getItem(STORAGE_KEY)) || [
  { id: 1, text: "The journey of a thousand miles begins with one step.", category: "Motivation" },
  { id: 2, text: "Life is what happens when you're busy making other plans.", category: "Life" },
  { id: 3, text: "Do not go where the path may lead, go instead where there is no path.", category: "Inspiration" }
];


function saveToLocalStorage() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(quotes));
}


function showRandomQuote(category = 'all') {
  let filteredQuotes = quotes;
  if (category !== 'all') {
    filteredQuotes = quotes.filter(q => q.category.toLowerCase() === category.toLowerCase());
  }
  if (filteredQuotes.length === 0) {
    quoteDisplay.textContent = "No quotes available in this category.";
    return;
  }
  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const quote = filteredQuotes[randomIndex];
  quoteDisplay.textContent = `"${quote.text}" — ${quote.category}`;
}


function addQuote() {
  const text = newQuoteText.value.trim();
  const category = newQuoteCategory.value.trim();
  if (!text || !category) {
    alert("Both quote and category are required!");
    return;
  }
  const id = Date.now(); 
  const newQuoteObj = { id, text, category };
  quotes.push(newQuoteObj);
  saveToLocalStorage();
  updateCategoryDropdown(category);
  newQuoteText.value = '';
  newQuoteCategory.value = '';
  notifications.textContent = "Quote added locally. Syncing to server...";
  postQuoteToServer(newQuoteObj);
}


function populateCategories() {
  const categories = [...new Set(quotes.map(q => q.category))];
  categories.forEach(cat => updateCategoryDropdown(cat));
}

function updateCategoryDropdown(category) {
  if (![...categorySelect.options].some(option => option.value.toLowerCase() === category.toLowerCase())) {
    const option = document.createElement('option');
    option.value = category;
    option.textContent = category;
    categorySelect.appendChild(option);
  }
}


async function fetchQuotesFromServer() {
  try {
    const response = await fetch(serverURL);
    if (!response.ok) throw new Error("Failed to fetch from server");
    const serverQuotes = await response.json();
    return serverQuotes;
  } catch (error) {
    console.warn("Fetch error:", error);
    return [];
  }
}


async function postQuoteToServer(quote) {
  try {
    const response = await fetch(serverURL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(quote)
    });
    if (!response.ok) throw new Error("Failed to post quote");
    notifications.textContent = "Quote synced with server successfully!";
  } catch (error) {
    notifications.textContent = "Failed to sync with server. Will retry later.";
    console.warn("Post error:", error);
  }
}


async function syncQuotes() {
  const serverQuotes = await fetchQuotesFromServer();
  let updated = false;
  serverQuotes.forEach(sq => {
    if (!quotes.some(q => q.id === sq.id)) {
      quotes.push(sq);
      updated = true;
    }
  });
  if (updated) {
    saveToLocalStorage();
    notifications.textContent = "Quotes updated from server!";
    populateCategories();
  }
}


setInterval(syncQuotes, 10000);


newQuoteBtn.addEventListener('click', () => showRandomQuote(categorySelect.value));
addQuoteBtn.addEventListener('click', addQuote);
filterBtn.addEventListener('click', () => showRandomQuote(categorySelect.value));


populateCategories();
saveToLocalStorage();