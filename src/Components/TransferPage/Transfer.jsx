import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useStore } from '../../LoginAuthenticator/LoginContext';

const Transfer = () => {

    const [cards, setCards] = useState();
    const [state, setState] = useState();
    const store = useStore();

    const handleChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name

        setState({ ...state, [name]: value })
    }

    const handleSubmit = () => {

        if (!state.sender || !state.receiver || !state.amount)
        {
            return
        } // make sure all fields filled

        let sender = state.sender.toString();
        let receiver = state.receiver.toString();
        let amount = state.amount;

        if (receiver.length !== 16) // card length must be === 16
        {
            alert('invalid receiver card');
            return;
        }
        if (state.amount < 0 || !state.amount) // prevent weird values
        {
            alert('invalid amount');
            return;
        }

        console.log(`${state.sender.toString()}=>${receiver}: ${amount}, ${store.username}:${store.key}`);

        const url = `${process.env.REACT_APP_API}transfer/${sender}/${receiver}/${amount}`
        axios.post(url, {username: store.username, key: store.key}).then(res => {
            console.log(res.status);
        })
    }

    useEffect(() => {
        // populate the dropdown with available cards
        const url = `${process.env.REACT_APP_API}getcards/${store.username}`;
  
        axios.post(url, {username: store.username, key: store.key}).then(res => {
          setCards(
            res.data.map((card) => (
                <option key={card.cardNumber} className={card.cardNumber} name={card.cardNumber} value={card.cardNumber}>{card.cardNumber}</option>
            ))
          )
        })
                // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

    return (
        <div className='transfer_form'>
            <h1>Transfer</h1>
            <label>Select a card</label>
            <select name="sender" className='cards' onChange={handleChange}>
                {cards}
            </select>
            <label>Transfer to</label>
            <input type='number' placeholder='16-digit card number' name='receiver' onKeyUp={handleChange}></input>
            <label>Amount</label>
            <input type='number' placeholder='Enter an amount' name='amount' onKeyUp={handleChange}></input>
            <button onClick={handleSubmit}>Submit</button>
        </div>
    )
}

export default Transfer;