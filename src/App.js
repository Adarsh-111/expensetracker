import React, { useEffect, useState } from "react";

function App() {
  const [balance, setBalance] = useState(0);
  const [income, setIncome] = useState("");
  const [expenseAmount, setExpenseAmount] = useState("");
  const [category, setCategory] = useState("Food");
  const [transactions, setTransactions] = useState([]);

  /* ---------- LOAD FROM localStorage ---------- */
  useEffect(() => {
    const savedBalance = localStorage.getItem("balance");
    const savedTransactions = localStorage.getItem("transactions");

    if (savedBalance) setBalance(Number(savedBalance));
    if (savedTransactions) setTransactions(JSON.parse(savedTransactions));
  }, []);

  /* ---------- SAVE TO localStorage ---------- */
  useEffect(() => {
    localStorage.setItem("balance", balance);
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [balance, transactions]);

  /* ---------- ADD INCOME ---------- */
  const handleAddIncome = () => {
    if (!income) return;
    setBalance(balance + Number(income));
    setIncome("");
  };

  /* ---------- ADD EXPENSE ---------- */
  const handleAddExpense = (e) => {
    e.preventDefault();

    if (!expenseAmount) return;

    const newTransaction = {
      amount: Number(expenseAmount),
      category,
    };

    setTransactions([...transactions, newTransaction]);
    setBalance(balance - Number(expenseAmount));
    setExpenseAmount("");
  };

  return (
    <div>
      {/* HEADER */}
      <h1>Expense Tracker</h1>

      {/* WALLET + EXPENSES (REQUIRED TEXT) */}
      <h2>Expenses</h2>
      <p>Wallet Balance: ₹{balance}</p>

      {/* ADD INCOME */}
      <input
        type="number"
        placeholder="Income Amount"
        value={income}
        onChange={(e) => setIncome(e.target.value)}
      />
      <button onClick={handleAddIncome}>Add Income</button>

      {/* ADD EXPENSE FORM */}
      <form onSubmit={handleAddExpense}>
        <input
          type="number"
          placeholder="Expense Amount"
          value={expenseAmount}
          required
          onChange={(e) => setExpenseAmount(e.target.value)}
        />

        <select
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Entertainment">Entertainment</option>
        </select>

        <button type="submit">Add Expense</button>
      </form>

      {/* TRANSACTIONS (REQUIRED TEXT) */}
      <h2>Transactions</h2>

      <ul>
        {transactions.map((txn, index) => (
          <li key={index}>
            {txn.category} - ₹{txn.amount}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
