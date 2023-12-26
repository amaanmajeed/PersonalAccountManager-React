import React, { useState, useEffect } from "react";

const AccountManager = () => {
  const [text, setText] = useState("");
  const [amount, setAmount] = useState("");
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    const storedTransactions = JSON.parse(localStorage.getItem("transactions"));

    if (storedTransactions) {
      setTransactions(storedTransactions);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("transactions", JSON.stringify(transactions));
  }, [transactions]);

  const generateID = () => {
    return Math.floor(Math.random() * 100000);
  };

  const addTransaction = (e) => {
    e.preventDefault();

    if (text.trim() === "" || amount.trim() === "") {
      alert("Please add a description and amount");
    } else {
      const newTransaction = {
        id: generateID(),
        description: text,
        amount: +amount
      };

      setTransactions([...transactions, newTransaction]);

      setText("");
      setAmount("");
    }
  };

  const removeTransaction = (id) => {
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== id
    );

    setTransactions(updatedTransactions);
  };

  const calculateBalance = () => {
    return transactions.reduce((acc, transaction) => acc + transaction.amount, 0);
  };

  const calculateIncome = () => {
    return transactions
      .filter((transaction) => transaction.amount > 0)
      .reduce((acc, transaction) => acc + transaction.amount, 0);
  };

  const calculateExpense = () => {
    return transactions
      .filter((transaction) => transaction.amount < 0)
      .reduce((acc, transaction) => acc + transaction.amount, 0);
  };

  return (
    <div>
      <h2>Personal Account Manager</h2>
      <a className="customLink" href="github.com/amaanmajeed">by Amaan Majeed F2020266286</a>
      

      <div className="container">
        <h4>Your Balance</h4>
        <h1>${calculateBalance()}</h1>

        <div className="inc-exp-container">
          <div>
            <h4>Income</h4>
            <p className="money plus">${calculateIncome()}</p>
          </div>
          <div>
            <h4>Expense</h4>
            <p className="money minus">${Math.abs(calculateExpense())}</p>
          </div>
        </div>

        <h3>History</h3>
        <ul className="list">
          {transactions.map((transaction) => (
            <li
              className={transaction.amount < 0 ? "minus" : "plus"}
              key={transaction.id}
            >
              {transaction.description} <span>${Math.abs(transaction.amount)}</span>{" "}
              <button
                className="delete-btn"
                onClick={() => removeTransaction(transaction.id)}
              >
                x
              </button>
            </li>
          ))}
        </ul>

        <h3>Add new transaction</h3>
        <form onSubmit={addTransaction}>
          <div className="form-control">
            <label htmlFor="text">Description</label>
            <input
              type="text"
              id="text"
              placeholder="Enter description..."
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <div className="form-control">
            <label htmlFor="amount">
              Amount <br />
              (negative - expense, positive - income)
            </label>
            <input
              type="number"
              id="amount"
              placeholder="Enter amount..."
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
          </div>
          <button className="btn">Add transaction</button>
        </form>
      </div>
    </div>
  );
};

export default AccountManager;