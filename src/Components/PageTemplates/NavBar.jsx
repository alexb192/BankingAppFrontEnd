import React from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useStore, useStoreUpdate } from '../../LoginAuthenticator/LoginContext';
import './NavBar.css';

import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

const NavBar = (props) => {

    // setup for the menu
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    }

    const logOutUpdate = useStoreUpdate();
    const store = useStore();

    const LogOut = async () => {
        let cookies = props.cookies.get('auth');
        logOutUpdate(null, false, null);
        props.cookies.remove('auth', {path: '/'}); // remove our cookie ( end session )
        let resp = await axios.post(`${process.env.REACT_APP_API}logout/`, cookies.username).catch((err) => {
            console.log(err);
        })
        console.log(`logout: ${resp.status}`)
        handleClose();
    }

    // return (
    //     <div>
    //         <ul className='flex justify-between'>
    //             <Link to="/"><img className="w-10 h-10" src={homeLogo} alt=''/></Link>
    //             <Link>Account</Link>
    //         </ul>
    //             <Link to="/" onClick={LogOut}>Log Out</Link>
    //     </div>

    // )

    return (
        <div className='flex justify-between'>
            <Button id="basic-button"><Link to="/">Home</Link></Button>
            <Button
                id="basic-button"
                aria-controls={open ? 'basic-menu' : undefined}
                aria-haspopup="true"
                aria-expanded={open ? 'true' : undefined}
                onClick={handleClick}
            >{store.username}</Button>
            <Menu
                id="basic-menu"
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                MenuListProps={{
                    'aria-labelledby': 'basic-button',
                }}
            >
                <MenuItem>
                    <Link onClick={handleClose}>Account</Link>
                </MenuItem>
                <MenuItem>
                    <Link to="/" onClick={LogOut}>Log Out</Link>
                </MenuItem>
            </Menu>
        </div>
      );
}

export default NavBar 