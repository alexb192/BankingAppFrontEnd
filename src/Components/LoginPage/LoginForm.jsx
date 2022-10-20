import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css';

import { useStoreUpdate } from '../../LoginAuthenticator/LoginContext';

function LoginForm () {

    const [state, setState] = useState();

    const toggleLoggedIn = useStoreUpdate();

    const LogInRequest = () => {
        axios.post(`${process.env.REACT_APP_API}login/`, state)
        .then((res) => {
            if (res.status === 200)
            toggleLoggedIn(state.username);
        }).catch((err) => {
            alert('Invalid credentials');
            console.log(err);
        })
    }

    const handleChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name

        setState({...state, [name]: value})
    }

    return (

        <div className='LoginForm'>
            <h1>Log In</h1>
            <label><b>Username</b></label>
            <input type='text' placeholder='Enter Username' name='username' onKeyUp={handleChange} required></input>

            <label><b>Password</b></label>
            <input type='password' placeholder='Enter Password' name='password' required onKeyUp={handleChange}></input>

            <button onClick={LogInRequest}>Login</button>
        </div>
    )

}

export default LoginForm