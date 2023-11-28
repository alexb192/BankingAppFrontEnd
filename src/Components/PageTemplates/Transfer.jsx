import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useStore } from '../../LoginAuthenticator/LoginContext';
import { Autocomplete, TextField, Box, Button, InputAdornment } from '@mui/material';

const Transfer = (props) => {

    const defaultState = {
        sender: '',
        receiver: '',
        amount: ''
    }

    const defaultHelperText = {
        receiverFieldHelperText: '',
        amountFieldHelperText: '',
    }

    const [cards, setCards] = useState(props.cards);
    const [state, setState] = useState(defaultState);
    const [error, setError] = useState(false);
    const [helperText, setHelperText] = useState(defaultHelperText)
    const store = useStore();

    const handleSubmit = (e) => {

        if (!state.sender || !state.receiver || !state.amount)
        {
            return
        } // make sure all fields filled

        const sender = state.sender;
        const receiver = state.receiver;
        const amount = state.amount;
        const url = `${process.env.REACT_APP_API}transfer/${sender}/${receiver}/${amount}`


        // error handling input fields

        // sender === receiver => invalid entry
        if (sender === receiver)
        {
            e.preventDefault();
            setError(true);
            setHelperText({receiverFieldHelperText: 'Invalid entry'});
            return;
        }

        // receiver must be 16 digits => match ^[0-9]{16}$
        if (receiver.match(/^[0-9]{16}$/g) === null)
        {
            e.preventDefault();
            setError(true);
            setHelperText({receiverFieldHelperText: 'Card number must be exactly 16 characters'});
            return;
        }

        // amount must be > 0
        // must be in format 123.45 (2 decimal point, no extra periods, no non-numeric characters)
        if (amount <= 0 || amount.match(/^[0-9]+\.[0-9]{2}$/g) === null)
        {
            e.preventDefault();
            setError(true);
            setHelperText({amountFieldHelperText: 'Invalid entry'});
            return;
        }

        axios.post(url, {username: store.username, key: store.key}).then(res => {
            console.log(res.status);
        })
    }

    useEffect(() => {
        // populate the dropdown with available cards
        const url = `${process.env.REACT_APP_API}getcards/${store.username}`;
  
        axios.post(url, {username: store.username, key: store.key}).then(res => {
            setCards(res.data.map(card => ({label: "" + card.cardNumber}))); // force cardnumbers to be strings
        })
                // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])

    return (
        <Box className={props.className + ' flex flex-col gap-3 ml-3 mr-3'} component='form' onSubmit={handleSubmit}>
            <Autocomplete
                value={state.sender}
                inputValue={state.sender}
                onChange={(e, value) => setState({...state, sender: value?.label})}
                options={cards ? cards : []}
                isOptionEqualToValue={(option, value) => option.id === value.id}
                renderInput={(params) => 
                <TextField required {...params} label="Sender" />
                }
            />
            <Autocomplete
                freeSolo
                inputValue={state.receiver}
                value={state.receiver}
                onChange={(e, value) => value ? setState({...state, receiver: value.label}) : e.preventDefault()}
                onInputChange={(e, value) => setState({ ...state, 'receiver': value.replaceAll(/[^0-9]/gm, '')})}
                options={cards ? cards : []}
                renderInput={(params) => <TextField helperText={helperText.receiverFieldHelperText} error={error} required {...params} label="Receiver" />}
            />
            <TextField
                required
                error={error}
                helperText={helperText.amountFieldHelperText}
                inputProps={{ maxLength: 12 }}
                InputProps={{ startAdornment: <InputAdornment position='start'>$</InputAdornment>}}
                value={state.amount}
                onChange={(e) => 
                    setState({ ...state, 'amount': e.target.value?.replaceAll(/[^0-9.]/gm, '')})
                }
            ></TextField>
            <Button type='submit' fullWidth variant='contained'>Transfer</Button>

        </Box>
    )
}

export default Transfer;