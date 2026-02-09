import React from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

function ExpenseItem({ expense, onDelete, onEdit }) {
  return (
    <div className="expense-item">
      <span>{expense.title}</span>
      <span>${expense.price}</span>
      <span>{expense.category}</span>
      <span>{expense.date}</span>
      <FaEdit onClick={() => onEdit(expense)} />
      <FaTrash onClick={() => onDelete(expense)} />
    </div>
  );
}

export default ExpenseItem;
