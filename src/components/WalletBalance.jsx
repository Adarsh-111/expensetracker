import React from "react";

function WalletBalance({ balance }) {
  return (
    <h2>Wallet Balance: ${balance.toFixed(2)}</h2>
  );
}

export default WalletBalance;
