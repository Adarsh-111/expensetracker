import React, { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [balance, setBalance] = useState(5000);
  const [expenses, setExpenses] = useState(0);

  const [showBalanceModal, setShowBalanceModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);

  const [income, setIncome] = useState("");
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Food");

  const [transactions, setTransactions] = useState([]);

  // Load from localStorage
  useEffect(() => {
    const b = localStorage.getItem("balance");
    const t = localStorage.getItem("transactions");
    const e = localStorage.getItem("expenses");

    if (b) setBalance(Number(b));
    if (e) setExpenses(Number(e));
    if (t) setTransactions(JSON.parse(t));
  }, []);

  // Save to localStorage
  useEffect(() => {
    localStorage.setItem("balance", balance);
    localStorage.setItem("expenses", expenses);
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [balance, expenses, transactions]);

  const addBalance = () => {
    if (!income) return;
    setBalance(balance + Number(income));
    setIncome("");
    setShowBalanceModal(false);
  };

  const addExpense = () => {
    if (!title || !price) return;

    const txn = {
      title,
      price: Number(price),
      category,
    };

    setTransactions([txn, ...transactions]);
    setExpenses(expenses + Number(price));
    setBalance(balance - Number(price));

    setTitle("");
    setPrice("");
    setShowExpenseModal(false);
  };

  return (
    <div className="app">
      <h1 className="header">Expense Tracker</h1>

      <div className="top-section">
        <div className="cards">
          <div className="card">
            <p>Wallet Balance: <span className="green">₹{balance}</span></p>
            <button className="green-btn" onClick={() => setShowBalanceModal(true)}>
              + Add Income
            </button>
          </div>

          <div className="card">
            <p>Expenses: <span className="orange">₹{expenses}</span></p>
            <button className="red-btn" onClick={() => setShowExpenseModal(true)}>
              + Add Expense
            </button>
          </div>
        </div>

        <div className="chart">
          <div className="circle">100%</div>
          <div className="legend">
            <span className="food">Food</span>
            <span className="ent">Entertainment</span>
            <span className="travel">Travel</span>
          </div>
        </div>
      </div>

      <div className="bottom-section">
        <div className="transactions">
          <h2>Recent Transactions</h2>
          {transactions.length === 0 ? (
            <p>No transactions!</p>
          ) : (
            transactions.map((t, i) => (
              <div key={i} className="txn">
                <span>{t.title}</span>
                <span>₹{t.price}</span>
              </div>
            ))
          )}
        </div>

        <div className="top-expenses">
          <h2>Top Expenses</h2>
          <p>Food -</p>
          <p>Entertainment -</p>
          <p>Travel -</p>
        </div>
      </div>

      {/* ADD BALANCE MODAL */}
      {showBalanceModal && (
        <div className="modal">
          <div className="modal-box">
            <h3>Add Balance</h3>
            <input
              type="number"
              placeholder="Income Amount"
              value={income}
              onChange={(e) => setIncome(e.target.value)}
            />
            <div className="modal-actions">
              <button onClick={addBalance}>Add Balance</button>
              <button onClick={() => setShowBalanceModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}

      {/* ADD EXPENSE MODAL */}
      {showExpenseModal && (
        <div className="modal">
          <div className="modal-box">
            <h3>Add Expenses</h3>

            <input
              type="text"
              name="title"
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <input
              type="number"
              name="price"
              placeholder="Price"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />

            <select value={category} onChange={(e) => setCategory(e.target.value)}>
              <option>Food</option>
              <option>Entertainment</option>
              <option>Travel</option>
            </select>

            <div className="modal-actions">
              <button onClick={addExpense}>Add Expense</button>
              <button onClick={() => setShowExpenseModal(false)}>Cancel</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
