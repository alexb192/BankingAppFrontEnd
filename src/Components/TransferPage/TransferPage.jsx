import React from 'react';
import Transfer from './Transfer';
import NavBar from '../PageTemplates/NavBar';
import SideBar from '../PageTemplates/SideBar';
import { withCookies } from 'react-cookie';

const TransferPage = (props) => {

    return (
        <>
            <NavBar props={props.cookies}/>
            <SideBar />
            <Transfer />
        </>
    )
}

export default withCookies(TransferPage);