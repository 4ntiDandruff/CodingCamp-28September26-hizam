// --- State Management ---
const STORAGE_KEY = 'revou_expense_transactions';
const THEME_KEY = 'revou_theme_preference';
const BUDGET_LIMIT = 100.00; // $100 spending limit alert

let transactions = [];
let spendingChart = null;

// --- DOM Elements ---
const transactionForm = document.getElementById('transactionForm');
const itemNameInput = document.getElementById('itemName');
const itemAmountInput = document.getElementById('itemAmount');
const itemCategoryInput = document.getElementById('itemCategory');
const totalBalanceEl = document.getElementById('totalBalance');
const budgetAlertEl = document.getElementById('budgetAlert');
const transactionsListEl = document.getElementById('transactionsList');
const emptyStateEl = document.getElementById('emptyState');
const sortSelect = document.getElementById('sortSelect');
const themeToggleBtn = document.getElementById('themeToggleBtn');
const themeIcon = document.getElementById('themeIcon');
const chartCanvas = document.getElementById('spendingChart');
const chartEmptyMessage = document.getElementById('chartEmptyMessage');

// Error message elements
const nameError = document.getElementById('nameError');
const amountError = document.getElementById('amountError');
const categoryError = document.getElementById('categoryError');

// --- Initialization ---
document.addEventListener('DOMContentLoaded', () => {
  initTheme();
  loadTransactions();
  initChart();
  renderApp();
  attachEvents();
});

// --- LocalStorage Operations ---
function loadTransactions() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    transactions = raw ? JSON.parse(raw) : [
      // Initial mock transactions matching the brief image
      { id: '1', name: 'Shopping', amount: 3.56, category: 'Fun', timestamp: Date.now() - 10000 },
      { id: '2', name: 'Cilok', amount: 14.94, category: 'Food', timestamp: Date.now() - 5000 }
    ];
  } catch (e) {
    console.error('Failed to parse localStorage:', e);
    transactions = [];
  }
}

function saveTransactions() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(transactions));
}

// --- Theme Toggle (Optional Challenge 1) ---
function initTheme() {
  const savedTheme = localStorage.getItem(THEME_KEY) || 'light';
  applyTheme(savedTheme);
}

function applyTheme(theme) {
  if (theme === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    themeIcon.textContent = '☀️';
  } else {
    document.documentElement.removeAttribute('data-theme');
    themeIcon.textContent = '🌙';
  }
  localStorage.setItem(THEME_KEY, theme);
}

function toggleTheme() {
  const current = document.documentElement.getAttribute('data-theme');
  applyTheme(current === 'dark' ? 'light' : 'dark');
}

// --- Calculations & Updates ---
function calculateTotal() {
  return transactions.reduce((acc, curr) => acc + Number(curr.amount || 0), 0);
}

function calculateCategoryTotals() {
  const totals = { Food: 0, Transport: 0, Fun: 0 };
  transactions.forEach(t => {
    if (totals[t.category] !== undefined) {
      totals[t.category] += Number(t.amount || 0);
    }
  });
  return totals;
}

// --- Chart.js Visualization ---
function initChart() {
  const ctx = chartCanvas.getContext('2d');
  const catTotals = calculateCategoryTotals();

  spendingChart = new Chart(ctx, {
    type: 'pie',
    data: {
      labels: ['Food', 'Transport', 'Fun'],
      datasets: [{
        data: [catTotals.Food, catTotals.Transport, catTotals.Fun],
        backgroundColor: [
          '#22c55e', // Food (Green)
          '#3b82f6', // Transport (Blue)
          '#f97316'  // Fun (Orange)
        ],
        borderWidth: 2,
        borderColor: '#ffffff'
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: true,
      plugins: {
        legend: {
          position: 'bottom',
          labels: {
            boxWidth: 16,
            padding: 16,
            font: {
              size: 12
            }
          }
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.label || '';
              const val = context.raw || 0;
              return ' ' + label + ': $' + val.toFixed(2);
            }
          }
        }
      }
    }
  });
}

function updateChart() {
  if (!spendingChart) return;
  const totals = calculateCategoryTotals();
  const hasData = transactions.length > 0;

  if (!hasData) {
    chartCanvas.style.display = 'none';
    chartEmptyMessage.style.display = 'block';
  } else {
    chartCanvas.style.display = 'block';
    chartEmptyMessage.style.display = 'none';
    spendingChart.data.datasets[0].data = [totals.Food, totals.Transport, totals.Fun];
    spendingChart.update();
  }
}

// --- Form Validation ---
function validateForm() {
  let isValid = true;
  nameError.textContent = '';
  amountError.textContent = '';
  categoryError.textContent = '';

  const nameVal = itemNameInput.value.trim();
  const amountVal = parseFloat(itemAmountInput.value);
  const categoryVal = itemCategoryInput.value;

  if (!nameVal) {
    nameError.textContent = 'Item name is required.';
    isValid = false;
  }

  if (isNaN(amountVal) || amountVal <= 0) {
    amountError.textContent = 'Please enter a valid amount greater than 0.';
    isValid = false;
  }

  if (!categoryVal) {
    categoryError.textContent = 'Please select a category.';
    isValid = false;
  }

  return isValid;
}

// --- Sorting (Optional Challenge 2) ---
function getSortedTransactions() {
  const copy = [...transactions];
  const sortMode = sortSelect.value;

  switch (sortMode) {
    case 'amount-high':
      return copy.sort((a, b) => b.amount - a.amount);
    case 'amount-low':
      return copy.sort((a, b) => a.amount - b.amount);
    case 'category':
      return copy.sort((a, b) => a.category.localeCompare(b.category));
    case 'newest':
    default:
      return copy.sort((a, b) => b.timestamp - a.timestamp);
  }
}

// --- Render Operations ---
function renderApp() {
  // 1. Total Balance
  const total = calculateTotal();
  totalBalanceEl.textContent = '$' + total.toFixed(2);

  // 2. Budget Limit Alert (Optional Challenge 3)
  if (total > BUDGET_LIMIT) {
    budgetAlertEl.classList.remove('hidden');
  } else {
    budgetAlertEl.classList.add('hidden');
  }

  // 3. Transactions List
  const sorted = getSortedTransactions();
  transactionsListEl.innerHTML = '';

  if (sorted.length === 0) {
    transactionsListEl.appendChild(emptyStateEl);
  } else {
    sorted.forEach(t => {
      const itemEl = document.createElement('div');
      itemEl.className = 'transaction-item';
      itemEl.innerHTML = `
        <div class="tx-info">
          <span class="tx-name">${escapeHtml(t.name)}</span>
          <span class="tx-amount">$${Number(t.amount).toFixed(2)}</span>
          <span class="tx-badge">${escapeHtml(t.category)}</span>
        </div>
        <button class="btn-delete" data-id="${t.id}" type="button">Delete</button>
      `;
      transactionsListEl.appendChild(itemEl);
    });
  }

  // 4. Update Chart
  updateChart();
}

function escapeHtml(str) {
  const div = document.createElement('div');
  div.textContent = str;
  return div.innerHTML;
}

// --- Events Handling ---
function attachEvents() {
  // Add Transaction
  transactionForm.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const newTx = {
      id: Date.now().toString(),
      name: itemNameInput.value.trim(),
      amount: parseFloat(itemAmountInput.value),
      category: itemCategoryInput.value,
      timestamp: Date.now()
    };

    transactions.push(newTx);
    saveTransactions();
    renderApp();

    // Reset Form
    transactionForm.reset();
  });

  // Delete Transaction (Event Delegation)
  transactionsListEl.addEventListener('click', (e) => {
    if (e.target && e.target.classList.contains('btn-delete')) {
      const idToDelete = e.target.getAttribute('data-id');
      transactions = transactions.filter(t => t.id !== idToDelete);
      saveTransactions();
      renderApp();
    }
  });

  // Sort Change
  sortSelect.addEventListener('change', () => {
    renderApp();
  });

  // Theme Toggle
  themeToggleBtn.addEventListener('click', toggleTheme);
}
