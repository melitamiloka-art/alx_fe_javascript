let quotes = JSON.parse(localStorage.getItem('quotes')) || [
  { text: "Be yourself; everyone else is already taken.", category: "Inspirational" },
  { text: "Two things are infinite: the universe and human stupidity.", category: "Humor" },
];

let lastSelectedCategory = localStorage.getItem('lastCategory') || 'all';


const quoteDisplay = document.getElementById('quoteDisplay');
const categoryFilter = document.getElementById('categoryFilter');


function showRandomQuote() {
  let filteredQuotes = getFilteredQuotes();
  if (filteredQuotes.length === 0) {
    quoteDisplay.textContent = "No quotes available for this category.";
    return;
  }
  const randomIndex = Math.floor(Math.random() * filteredQuotes.length);
  const quote = filteredQuotes[randomIndex];
  quoteDisplay.textContent = `"${quote.text}" — ${quote.category}`;
  sessionStorage.setItem('lastQuote', JSON.stringify(quote)); 
}


function addQuote() {
  const textInput = document.getElementById('newQuoteText');
  const categoryInput = document.getElementById('newQuoteCategory');

  const newQuote = {
    text: textInput.value.trim(),
    category: categoryInput.value.trim() || 'General'
  };

  if (!newQuote.text) {
    alert("Please enter a quote!");
    return;
  }

  quotes.push(newQuote);
  saveQuotes();
  populateCategories();
  textInput.value = '';
  categoryInput.value = '';
  showRandomQuote();
}


function saveQuotes() {
  localStorage.setItem('quotes', JSON.stringify(quotes));
}

function populateCategories() {
  const categories = [...new Set(quotes.map(q => q.category))];
  categoryFilter.innerHTML = '<option value="all">All Categories</option>';
  categories.forEach(cat => {
    const option = document.createElement('option');
    option.value = cat;
    option.textContent = cat;
    categoryFilter.appendChild(option);
  });
  categoryFilter.value = lastSelectedCategory;
}

function filterQuotes() {
  lastSelectedCategory = categoryFilter.value;
  localStorage.setItem('lastCategory', lastSelectedCategory);
  showRandomQuote();
}

function getFilteredQuotes() {
  return lastSelectedCategory === 'all'
    ? quotes
    : quotes.filter(q => q.category === lastSelectedCategory);
}

function exportToJson() {
  const dataStr = JSON.stringify(quotes, null, 2);
  const blob = new Blob([dataStr], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = 'quotes.json';
  a.click();
  URL.revokeObjectURL(url);
}


function importFromJsonFile(event) {
  const fileReader = new FileReader();
  fileReader.onload = function(e) {
    try {
      const importedQuotes = JSON.parse(e.target.result);
      quotes.push(...importedQuotes);
      saveQuotes();
      populateCategories();
      showRandomQuote();
      alert('Quotes imported successfully!');
    } catch (err) {
      alert('Invalid JSON file!');
    }
  };
  fileReader.readAsText(event.target.files[0]);
}

populateCategories();
showRandomQuote();


async function syncWithServer() {
  
  try {
    const response = await fetch('https://jsonplaceholder.typicode.com/posts?_limit=2');
    const serverQuotes = await response.json();
    
    serverQuotes.forEach(post => {
      const exists = quotes.some(q => q.text === post.title);
      if (!exists) quotes.push({ text: post.title, category: "Server" });
    });
    saveQuotes();
    populateCategories();
  } catch (err) {
    console.log('Server sync failed', err);
  }
}

ver, 60000);


const lastQuote = JSON.parse(sessionStorage.getItem('lastQuote'));
if (lastQuote) quoteDisplay.textContent = `"${lastQuote.text}" — ${lastQuote.category}`;