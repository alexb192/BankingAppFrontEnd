import React from 'react';
import Transactions from './Transactions';
import NavBar from '../PageTemplates/NavBar';
import SideBar from '../PageTemplates/SideBar';
import { withCookies } from 'react-cookie';

const CardPage = (props) => {

    return (
        <>
            <NavBar cookies={props.cookies} />
            <SideBar />
            <Transactions />
        </>
    )
}

export default withCookies(CardPage);