import React from 'react';
import Transactions from './Transactions';
import NavBar from '../PageTemplates/NavBar';
import SideBar from '../PageTemplates/SideBar';

const CardPage = () => {

    return (
        <>
            <NavBar />
            <SideBar />
            <Transactions />
        </>
    )
}

export default CardPage