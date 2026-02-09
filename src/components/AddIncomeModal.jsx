import React, { useState } from "react";
import Modal from "react-modal";
import { useSnackbar } from "notistack";

Modal.setAppElement("#root");

function AddIncomeModal({ isOpen, onClose, onAdd }) {
  const [amount, setAmount] = useState("");
  const { enqueueSnackbar } = useSnackbar();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!amount || Number(amount) <= 0) {
      enqueueSnackbar("Enter valid income amount", { variant: "error" });
      return;
    }
    onAdd(Number(amount));
    setAmount("");
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onRequestClose={onClose}>
      <h2>Add Income</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Income Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <button type="submit">Add Balance</button>
      </form>
    </Modal>
  );
}

export default AddIncomeModal;
