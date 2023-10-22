import React from 'react';
import NavBar from '../PageTemplates/NavBar';
import SideBar from '../PageTemplates/SideBar';
import { withCookies } from 'react-cookie';
import { useStore } from '../../LoginAuthenticator/LoginContext';
import axios from 'axios';

const CardPage = (props) => {

    const store = useStoreUpdate();

    openCardRequest = async () => {
        let resp = await axios.post(`${process.env.REACT_APP_API}opennewcard/`, {username: store.username, key: store.key});
        if (resp.status === 200)
        {
            console.log('success!');
        }
    }

    return (
        <>
            <NavBar props={props.cookies}/>
            <SideBar />
            <div>
                <h1>
                    Open New Card
                </h1>
                <button></button>
            </div>
        </>
    )
}

export default withCookies(CardPage);