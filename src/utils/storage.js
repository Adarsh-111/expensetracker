export const getExpenses = () => {
  const data = localStorage.getItem("expenses");
  return data ? JSON.parse(data) : [];
};

export const saveExpenses = (expenses) => {
  localStorage.setItem("expenses", JSON.stringify(expenses));
};

export const getBalance = () => {
  const data = localStorage.getItem("balance");
  return data ? Number(data) : 5000;
};

export const saveBalance = (balance) => {
  localStorage.setItem("balance", balance);
};
