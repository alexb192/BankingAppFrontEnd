import React, { useEffect, useState } from 'react';
import { useStore } from '../LoginAuthenticator/LoginContext';
import axios from 'axios';
import './HomePage.css';
import NavBar from './PageTemplates/NavBar';
import SideBar from './PageTemplates/SideBar';
// import Transactions from './CardPage/Transactions';

import { Link } from 'react-router-dom'

const HomePage = () => {

    const store = useStore();

    const [cards, setCards] = useState();
    // const [transactions, setTransactions] = useState();

    // const openTransactions = (e) => {
    //     setTransactions(<Transactions cardNumber={e.target.innerText} />)
    // }

    useEffect(() => {
        axios.post(`${process.env.REACT_APP_API}getcards/${store.username}`, {username: store.username, key: store.key})
        .then(res => {
            setCards(
                res.data.map(card => (
                <ul className="card" key={card.cardNumber}>
                    {/* <p onClick={openTransactions}>{card.cardNumber}</p> */}
                    <Link to={`card/${card.cardNumber}`}>{card.cardNumber}</Link>
                    <p>{card.cardHolder.fname} {card.cardHolder.lname}</p>
                    <p>${card.balance}<i>CAD</i></p>
                </ul>
                ))
            )
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    // if (transactions)
    // {
    //     return (
    //         <div>
    //             {transactions}
    //         </div>
    //     )
    // }
    
    return (
        <>
            <NavBar />
            <SideBar />
            <div className='cards'>
                {cards} 
            </div>
        </>
    )
}

export default HomePage;