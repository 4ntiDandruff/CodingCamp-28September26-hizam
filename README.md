<div align="center">

# Expense & Budget Visualizer

*A responsive client-side web application to track daily expenses, categorize transactions, and visualize spending breakdown.*

[![HTML5](https://img.shields.io/badge/HTML5-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-1572B6?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E?logo=javascript&logoColor=black)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![Chart.js](https://img.shields.io/badge/Chart.js-v4-FF6384?logo=chartdotjs&logoColor=white)](https://www.chartjs.org/)

</div>

---

## 1. Overview
This project is built for the **RevoU x AWS Coding Camp (Software Engineering Program)** mini project. It provides users with a clean, single-screen dashboard to manage their daily budget without server-side dependencies.

### Features Included:
- **Core Requirements (MVP)**:
  - Total Balance display updating in real-time.
  - Transaction Input Form with full input validation (Item Name, Amount, Category).
  - Scrollable Transactions List with item deletion.
  - Interactive Pie Chart showing spending distribution by category powered by **Chart.js**.
  - Client-side persistence using **HTML5 LocalStorage API**.
- **Optional Challenges Completed**:
  - 🌓 **Dark / Light Mode Toggle**: Smooth theme switching with preference saved in localStorage.
  - 🔄 **Transaction Sorting**: Sort history by newest, highest amount, lowest amount, or category.
  - ⚠️ **Budget Limit Warning**: Automatic highlight when total spending exceeds $100.00.

---

## 2. Project Structure
Strict adherence to the course constraints (1 CSS file, 1 JS file, zero backend):

```
CodingCamp-28September26-hizam/
├── index.html         # Semantic HTML5 layout
├── css/
│   └── style.css      # Consolidated styling with CSS Variables & Dark Theme
├── js/
│   └── app.js         # Vanilla JS application state, LocalStorage CRUD, & Chart.js integration
├── .kiro/
│   └── project.json   # AWS Builder ID & Kiro IDE configuration
└── README.md
```

---

<div align="center">
<sub>RevoU x AWS Coding Camp • September 2026</sub>
</div>
