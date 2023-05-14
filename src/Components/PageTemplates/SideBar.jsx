import React from 'react';
import './SideBar.css';
import { Link } from 'react-router-dom';

const SideBar = () => {
    return (
        <div className='SideBar'>
            <Link>Open Card</Link>
            <Link to='/transfer'>Transfer</Link>
            <Link>Withdraw</Link>
            <Link>Deposit</Link>
        </div>
    )
}

export default SideBar;