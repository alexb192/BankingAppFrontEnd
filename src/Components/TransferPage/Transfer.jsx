import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useStore } from '../../LoginAuthenticator/LoginContext';
import { Autocomplete, FormControl, Typography, TextField, Box, Button } from '@mui/material';

const Transfer = () => {

    const [cards, setCards] = useState();
    const [state, setState] = useState();
    const store = useStore();

    const handleChange = (e, fieldName) => {
        const target = e.target;
        const value = target.value.replaceAll(/[^0-9]/gm, '');

        console.log(target);

        setState({ ...state, [fieldName]: value });
    }

    const handleSubmit = (e) => {

        e.preventDefault();

        if (!state.sender || !state.receiver || !state.amount)
        {
            return
        } // make sure all fields filled

        let sender = state.sender.toString();
        let receiver = state.receiver.toString();
        let amount = state.amount;

        const url = `${process.env.REACT_APP_API}transfer/${sender}/${receiver}/${amount}`
        axios.post(url, {username: store.username, key: store.key}).then(res => {
            console.log(res.status);
        })
    }

    useEffect(() => {
        // populate the dropdown with available cards
        const url = `${process.env.REACT_APP_API}getcards/${store.username}`;
  
        axios.post(url, {username: store.username, key: store.key}).then(res => {
            setCards(res.data.map(card => ({label: card.cardNumber})));
        })
                // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

      console.log(state);

    return (
        <Box className='flex flex-col' component='form' onSubmit={handleSubmit}>
            <Typography variant='h1'>Transfer</Typography>
            <FormControl>
                
                <Autocomplete
                    freeSolo
                    name='sender'
                    disablePortal
                    options={cards ? cards : []}
                    renderInput={(params) => <TextField value={state?.sender} onChange={(evt) => handleChange(evt, 'sender')} {...params} label="Sender">{state?.sender}</TextField>}
                />
                <Autocomplete
                    freeSolo
                    name='receiver' 
                    onChange={handleChange}
                    disablePortal
                    options={cards ? cards : []}
                    renderInput={(params) => <TextField onChange={handleChange} {...params} label="Receiver" />}
                />
            </FormControl>
            <TextField name='amount' onKeyUp={handleChange}></TextField>
            <Button type='submit' fullWidth variant='contained'>Transfer</Button>

        </Box>
    )
}

export default Transfer;