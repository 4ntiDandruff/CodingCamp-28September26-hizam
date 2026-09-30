# Design Document: Expense & Budget Visualizer

## 1. Architecture Overview
This application follows a zero-backend, client-side MVC pattern implemented with semantic HTML5, pure CSS3 (CSS Variables for themes), and Vanilla JavaScript.

## 2. Component Design
- **Header Component**: Contains application branding and the Theme Toggle button.
- **Balance Card**: Computes and displays the aggregate expense sum, plus budget limit alert indicator.
- **Form Card**: Controlled input interface with inline validation rules.
- **Transactions Card**: Scrollable list container with sorting controls and item event delegation.
- **Chart Card**: Canvas element bound to a Chart.js Pie Chart instance with dynamic dataset updates.

## 3. Data Structure
```json
{
  "id": "1727702400000",
  "name": "Cilok",
  "amount": 14.94,
  "category": "Food",
  "timestamp": 1727702400000
}
```

## 4. State Management & Storage
- Key `revou_expense_transactions`: Array of transaction objects stored as JSON string.
- Key `revou_theme_preference`: String (`"light"` or `"dark"`).
