import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css';

import { useStoreUpdate } from '../../LoginAuthenticator/LoginContext';

function LoginForm() {

    const [state, setState] = useState();

    const storeLogInInformation = useStoreUpdate();

    const LogInRequest = async () => {
        let resp = await (await axios.post(`${process.env.REACT_APP_API}login/`, state))

        // second param is login status, true => is logged in  
        if (resp.status === 200) {
            storeLogInInformation(state.username, true, resp.data.key);
        }
    }

    const handleChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name

        setState({ ...state, [name]: value })
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