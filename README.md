# 💰 Personal Finance Visualizer

A full-stack web app for tracking, visualizing, and managing your personal finances with intuitive charts, budget insights, and responsive UI.

---

## 🚀 Live Demo

> 🔗 [Live Frontend App](https://personal-finance-visualizer-ng3k.vercel.app/)

---

## 🛠️ Tech Stack

| Layer       | Tech Stack                            |
|-------------|----------------------------------------|
| Frontend    | Next.js, React, Tailwind CSS, MUI, Recharts |
| Backend     | Node.js, Express.js                   |
| Database    | MongoDB                               |
| Components  | MUI Icons, shadcn/ui (optional)       |

---

## ✅ Features by Stage

### 📍 Stage 1: Basic Transaction Tracking

- Add, edit, and delete transactions
- Responsive MUI table view
- Monthly expense bar chart (Recharts)
- Basic form validation

---

### 📍 Stage 2: Categories & Visualization

- Predefined categories (Food, Travel, Bills, etc.)
- Category-wise pie chart
- Dashboard summary:
  - Total expenses
  - Recent transactions
  - Category totals

---

### 📍 Stage 3: Budgeting

- Monthly budgets per category (hardcoded for now)
- Budget vs Actual spending chart
- Monthly insights (stacked bar chart per category)

---

## 📦 Setup Instructions

### 1. Prerequisites

Ensure you have:

- Node.js (v18+)
- MongoDB (local or Atlas)
- npm or yarn

---

### 2. Clone the Repo


git clone https://github.com/tarupathak/Personal-Finance-Visualizer.git
cd finance-tracker

---

### 3. Backend Setup

cd server
npm install

Create a .env file in the server/ folder:

MONGO_URI=mongodb+srv://pathaktaru2002:hello1234@cluster0.shzcrgp.mongodb.net/finance

Start the backend server:

nodemon / node index.js

Backend runs at: http://localhost:5000

---

### 4. Frontend Setup

cd client
npm install
npm run dev

Frontend runs at: http://localhost:5000

---


## 📊 Screenshots
![Screenshot 2025-07-05 185409](https://github.com/user-attachments/assets/247ae5cf-02f1-4071-ac23-c26b1d3f2ae2)
![Screenshot 2025-07-05 185400](https://github.com/user-attachments/assets/dbb3f204-cd5f-45bd-b9a5-59c119847b4c)
![Screenshot 2025-07-05 185350](https://github.com/user-attachments/assets/b9c8ed7c-6fe9-410e-bb86-6c53634076e6)
![Screenshot 2025-07-05 185336](https://github.com/user-attachments/assets/32398fce-4420-457a-882b-bbbeedfdbd85)


