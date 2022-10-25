import React, { useEffect, useState } from 'react';
import { useStore } from '../LoginAuthenticator/LoginContext';
import axios from 'axios';
import './HomePage.css';

const HomePage = () => {

    const store = useStore();

    const [cards, setCards] = useState();

    // res.data.map((transaction) => (
    //     <ul className="transaction" key={counter++}>
    //       <p>{transaction.sender.fname}</p>
    //       <p>{transaction.receiver.fname}</p>
    //       <p>{'$ ' + transaction.amount}</p>
    //       <p>{(new Date(transaction.date)).toLocaleDateString()}</p>
    //     </ul>
    //   ))

    useEffect(() => {
        axios.post(`${process.env.REACT_APP_API}getcards/${store.username}`, {username: store.username, key: store.key})
        .then(res => {
            setCards(
                res.data.map(card => (
                <ul className="card" key={card.cardNumber}>
                    <p>{card.cardNumber}</p>
                    <p>{card.cardHolder.fname} {card.cardHolder.lname}</p>
                    <p>${card.balance}<i>CAD</i></p>
                </ul>
                ))
            )
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <div className='cards'>
            {cards}
        </div>
    )
}

export default HomePage;