# Requirements Document: Expense & Budget Visualizer

## 1. Overview
The Expense & Budget Visualizer is a client-side web application designed to help users track daily expenses, categorize transactions, and visualize spending patterns.

## 2. User Stories & Acceptance Criteria
- **User Story 1 (Input Form)**: As a user, I want to add new transactions with an item name, positive amount, and a category (Food, Transport, Fun) so I can record my expenses.
  - *Criteria*: Form validation prevents submission if any required field is empty or amount <= 0.
- **User Story 2 (Total Balance)**: As a user, I want to see my total balance updated in real-time.
  - *Criteria*: The balance updates immediately upon adding or deleting any transaction item.
- **User Story 3 (Transaction List)**: As a user, I want to review my past transactions in a scrollable list and delete incorrect entries.
  - *Criteria*: Displays item name, formatted amount, category badge, and functional delete button.
- **User Story 4 (Visual Breakdown)**: As a user, I want to see a chart representing my spending distribution.
  - *Criteria*: A responsive pie chart rendered using Chart.js that reflects current category totals.
- **User Story 5 (Persistence)**: As a user, I want my data saved automatically.
  - *Criteria*: All records persist across page reloads via HTML5 LocalStorage API.

## 3. Optional Features
- Dark / Light Mode toggle with stored preference.
- Transaction sorting (by newest, amount high-low, amount low-high, or category).
- Budget limit highlight warning when total balance exceeds $100.00.
