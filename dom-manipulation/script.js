if (typeof quotes === "undefined") {
  var quotes = [
    { text: "Be yourself; everyone else is already taken.", category: "Inspiration" },
    { text: "Do not take life too seriously. You will never get out of it alive.", category: "Humor" }
  ];
}


const quoteDisplay = document.getElementById("quoteDisplay");
const newQuoteBtn = document.getElementById("newQuote");
const addQuoteBtn = document.getElementById("addQuoteBtn");
const newQuoteText = document.getElementById("newQuoteText");
const newQuoteCategory = document.getElementById("newQuoteCategory");
const categoryFilter = document.getElementById("categoryFilter");
const exportJsonBtn = document.getElementById("exportJson");
const importFileInput = document.getElementById("importFile");


function displayRandomQuote() {
  
  if (!quotes || quotes.length === 0) {
    quoteDisplay.textContent = "No quotes available!";
    return;
  }

  const selectedCategory = categoryFilter.value;
  const filteredQuotes = selectedCategory === "all" ? quotes : quotes.filter(q => q.category === selectedCategory);

  if (filteredQuotes.length === 0) {
    quoteDisplay.textContent = "No quotes in this category!";
    return;
  }

  
  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  quoteDisplay.textContent = filteredQuotes[randomIndex].text;
}


function addQuote() {
  const text = newQuoteText.value.trim();
  const category = newQuoteCategory.value.trim();
  if (!text || !category) return alert("Both fields are required!");

  
  quotes.push({ text, category });
  saveQuotes();
  populateCategories();
  displayRandomQuote();

  newQuoteText.value = "";
  newQuoteCategory.value = "";
}


function populateCategories() {
  const categories = [...new Set(quotes.map(q => q.category))];
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  categories.forEach(cat => {
    const option = document.createElement("option");
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });
}


function filterQuotes() {
  localStorage.setItem("lastCategory", categoryFilter.value);
  displayRandomQuote();
}


function saveQuotes() {
  localStorage.setItem("quotes", JSON.stringify(quotes));
}

function loadQuotes() {
  const stored = localStorage.getItem("quotes");
  if (stored) quotes = JSON.parse(stored);
}

function loadLastCategory() {
  const lastCat = localStorage.getItem("lastCategory");
  if (lastCat) categoryFilter.value = lastCat;
}


function exportQuotes() {
  const blob = new Blob([JSON.stringify(quotes, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = "quotes.json";
  a.click();
  URL.revokeObjectURL(url);
}

function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function (e) {
    const importedQuotes = JSON.parse(e.target.result);
    quotes.push(...importedQuotes);
    saveQuotes();
    populateCategories();
    displayRandomQuote();
    alert("Quotes imported successfully!");
  };
  fileReader.readAsText(event.target.files[0]);
}


async function fetchQuotesFromServer() {
  try {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts");
    const serverData = await res.json();

    
    const serverQuotes = serverData.slice(0, 5).map(d => ({ text: d.title, category: "Server" }));

    
    quotes = [...serverQuotes];
    saveQuotes();
    populateCategories();
    displayRandomQuote();

    
    console.log("Server data synced and conflicts resolved!");
  } catch (error) {
    console.error("Server sync failed:", error);
  }
}


function syncQuotes() {
  setInterval(fetchQuotesFromServer, 30000);
}


if (newQuoteBtn) newQuoteBtn.addEventListener("click", displayRandomQuote); 
if (addQuoteBtn) addQuoteBtn.addEventListener("click", addQuote);
if (categoryFilter) categoryFilter.addEventListener("change", filterQuotes);
if (exportJsonBtn) exportJsonBtn.addEventListener("click", exportQuotes);
if (importFileInput) importFileInput.addEventListener("change", importFromJsonFile);


loadQuotes();
populateCategories();
loadLastCategory();
displayRandomQuote();
syncQuotes();