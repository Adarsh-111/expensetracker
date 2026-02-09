import React, { useEffect, useState } from "react";
import WalletBalance from "./components/WalletBalance";
import AddIncomeModal from "./components/AddIncomeModal";
import AddExpenseModal from "./components/AddExpenseModal";
import ExpenseList from "./components/ExpenseList";
import ExpenseSummary from "./components/ExpenseSummary";
import ExpenseTrends from "./components/ExpenseTrends";
import { getExpenses, saveExpenses, getBalance, saveBalance } from "./utils/storage";

function App() {
  const [walletBalance, setWalletBalance] = useState(5000);
  const [expenses, setExpenses] = useState([]);
  const [showIncomeModal, setShowIncomeModal] = useState(false);
  const [showExpenseModal, setShowExpenseModal] = useState(false);
  const [editExpense, setEditExpense] = useState(null);

  useEffect(() => {
    setExpenses(getExpenses());
    setWalletBalance(getBalance());
  }, []);

  useEffect(() => {
    saveExpenses(expenses);
    saveBalance(walletBalance);
  }, [expenses, walletBalance]);

  const addIncome = (amount) => {
    setWalletBalance(prev => prev + amount);
  };

  const addExpense = (expense) => {
    setExpenses(prev => [...prev, expense]);
    setWalletBalance(prev => prev - expense.price);
  };

  const deleteExpense = (expense) => {
    setExpenses(prev => prev.filter(e => e.id !== expense.id));
    setWalletBalance(prev => prev + expense.price);
  };

  const updateExpense = (updatedExpense) => {
    setExpenses(prev =>
      prev.map(e => (e.id === updatedExpense.id ? updatedExpense : e))
    );
  };

  return (
    <div className="container">
      {/* ONLY ONE h1 */}
      <h1>Expense Tracker</h1>

      <WalletBalance balance={walletBalance} />

      <div className="actions">
        <button type="button" onClick={() => setShowIncomeModal(true)}>
          + Add Income
        </button>
        <button type="button" onClick={() => setShowExpenseModal(true)}>
          + Add Expense
        </button>
      </div>

      <ExpenseSummary expenses={expenses} />
      <ExpenseTrends expenses={expenses} />

      <ExpenseList
        expenses={expenses}
        onDelete={deleteExpense}
        onEdit={(exp) => {
          setEditExpense(exp);
          setShowExpenseModal(true);
        }}
      />

      <AddIncomeModal
        isOpen={showIncomeModal}
        onClose={() => setShowIncomeModal(false)}
        onAdd={addIncome}
      />

      <AddExpenseModal
        isOpen={showExpenseModal}
        onClose={() => {
          setShowExpenseModal(false);
          setEditExpense(null);
        }}
        onAdd={addExpense}
        onUpdate={updateExpense}
        walletBalance={walletBalance}
        editExpense={editExpense}
      />
    </div>
  );
}

export default App;
