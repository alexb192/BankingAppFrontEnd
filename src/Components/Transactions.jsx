import './Transactions.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';


function Transactions() {

  const cardNumber = 0; // set this later lol, maybe use redux?
  const [transactions, setTransactions] = useState();

    useEffect(() => {
      let counter = 0;
      const url = `${process.env.REACT_APP_API}gettransactions/${cardNumber}`;

      axios.get(url).then(res => {
        setTransactions(
          res.data.map((transaction) => (
            <ul className="transaction" key={counter++}>
              <p>{transaction.sender.fname}</p>
              <p>{transaction.receiver.fname}</p>
              <p>{'$ ' + transaction.amount}</p>
              <p>{(new Date(transaction.date)).toLocaleDateString()}</p>
            </ul>
          ))
        )
      })
    }, [])
  
  return (
    <div className="Transactions">
      <h1>Transactions</h1>
      <ul className="transactions_table">
        {transactions}
      </ul>
    </div>
  );
}

export default Transactions;