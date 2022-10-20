import React, { useState } from 'react';
import axios from 'axios';
import './CreateAccountForm.css';

function CreateAccountForm () {

    const [state, setState] = useState();

    const handleChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name

        setState({...state, [name]: value})
    }

    const CreateAccountRequest = (event) => {
        axios.post(`${process.env.REACT_APP_API}createaccount`, state)
        .then((res) => {
            if (res.status === 200)
            console.log('success');
        }).catch((err) => {
            console.log(err);
        })
        
        event.preventDefault();
    }

    return (

        <form onSubmit={CreateAccountRequest} className='CreateAccountForm'>
            <h1>Create Account</h1>
            <label><b>Username</b></label>
            <input type='text' placeholder='Enter Username' name='username' required onKeyUp={handleChange}></input>

            <label><b>Password</b></label>
            <input type='password' placeholder='Enter Password' name='password' required onKeyUp={handleChange}></input>

            <label><b>First Name</b></label>
            <input type='text' placeholder='Enter First Name' name='fname' required onKeyUp={handleChange}></input>

            <label><b>Last Name</b></label>
            <input type='text' placeholder='Enter Last Name' name='lname' required onKeyUp={handleChange}></input>

            <label><b>Phone Number</b></label>
            <input type='text' placeholder='Enter Phone Number' name='pnumber' required onKeyUp={handleChange}></input>

            <label><b>Address</b></label>
            <input type='text' placeholder='Enter Password' name='address' required onKeyUp={handleChange}></input>
            
            <input type="submit" value="Create Account" />
        </form>
    )

}

export default CreateAccountForm