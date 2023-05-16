import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useStoreUpdate } from '../../LoginAuthenticator/LoginContext';
import './NavBar.css';

const NavBar = (props) => {

    const logOutUpdate = useStoreUpdate();

    const LogOut = async () => {
        let cookies = props.cookies.get('auth');
        logOutUpdate(null, false, null);
        props.cookies.remove('auth', {path: '/'}); // remove our cookie ( end session )
        let resp = await axios.post(`${process.env.REACT_APP_API}logout/`, cookies.username).catch((err) => {
            console.log(err);
        })
        console.log(`logout: ${resp.status}`)

    }

    return (
        <ul className='NavBar'>
            <Link to="/">Home</Link>
            <Link>Account</Link>
            <Link to="/" onClick={LogOut}>Log Out</Link>
        </ul>
    )
}

export default NavBar 