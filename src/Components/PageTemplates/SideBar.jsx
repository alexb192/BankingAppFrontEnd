import React from 'react';
import './SideBar.css';
import { Link } from 'react-router-dom';

const SideBar = () => {
    return (
        <div className='SideBar'>
            <Link>Open Card</Link>
            <Link to='/transfer'>Transfer</Link>
        </div>
    )
}

export default SideBar;