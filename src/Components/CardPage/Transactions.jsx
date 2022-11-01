import './Transactions.css';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useStore } from '../../LoginAuthenticator/LoginContext'
import { useParams } from 'react-router-dom';

function Transactions() {

  // const cardNumber = props.cardNumber;
  const [transactions, setTransactions] = useState();
  const store = useStore();
  const { cardnumber } = useParams();

    useEffect(() => {
      let counter = 0;
      const url = `${process.env.REACT_APP_API}gettransactions/${cardnumber}`;

      axios.post(url, {username: store.username, key: store.key}).then(res => {
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
              // eslint-disable-next-line react-hooks/exhaustive-deps
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