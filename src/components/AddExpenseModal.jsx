import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import { useSnackbar } from "notistack";

Modal.setAppElement("#root");

function AddExpenseModal({
  isOpen,
  onClose,
  onAdd,
  onUpdate,
  walletBalance,
  editExpense
}) {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("");
  const [date, setDate] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  useEffect(() => {
    if (editExpense) {
      setTitle(editExpense.title);
      setPrice(editExpense.price);
      setCategory(editExpense.category);
      setDate(editExpense.date);
    }
  }, [editExpense]);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !price || !category || !date) {
      enqueueSnackbar("All fields are required", { variant: "error" });
      return;
    }

    const amount = Number(price);
    const oldAmount = editExpense ? editExpense.price : 0;

    if (amount - oldAmount > walletBalance) {
      enqueueSnackbar("Insufficient wallet balance", { variant: "error" });
      return;
    }

    const expenseData = {
      id: editExpense ? editExpense.id : Date.now(),
      title,
      price: amount,
      category,
      date
    };

    if (editExpense) {
      onUpdate(expenseData);
    } else {
      onAdd(expenseData);
    }

    setTitle("");
    setPrice("");
    setCategory("");
    setDate("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <h2>{editExpense ? "Edit Expense" : "Add Expense"}</h2>
      <form onSubmit={handleSubmit}>
        <input name="title" value={title} onChange={e => setTitle(e.target.value)} />
        <input name="price" value={price} onChange={e => setPrice(e.target.value)} />
        <select name="category" value={category} onChange={e => setCategory(e.target.value)}>
          <option value="">Select</option>
          <option value="Food">Food</option>
          <option value="Travel">Travel</option>
          <option value="Shopping">Shopping</option>
        </select>
        <input name="date" type="date" value={date} onChange={e => setDate(e.target.value)} />
        <button type="submit">Add Expense</button>
      </form>
    </Modal>
  );
}

export default AddExpenseModal;
