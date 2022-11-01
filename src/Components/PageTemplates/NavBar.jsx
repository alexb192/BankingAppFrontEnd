import React from 'react';
import { Link } from 'react-router-dom';
import { useStoreUpdate } from '../../LoginAuthenticator/LoginContext';
import './NavBar.css';

const NavBar = () => {

    const logOutUpdate = useStoreUpdate();

    const LogOut = () => {
        logOutUpdate(null, false, null);
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