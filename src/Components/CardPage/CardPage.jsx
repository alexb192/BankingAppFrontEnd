import React from 'react';
import Transactions from './Transactions';
import NavBar from '../PageTemplates/NavBar';
import Transfer from '../PageTemplates/Transfer';
import { withCookies } from 'react-cookie';
import { Box } from '@mui/material';

const CardPage = (props) => {

    return (
        <Box>
            <NavBar cookies={props.cookies} />
            <Box className='flex flex-col md:flex-row justify-between mt-12'>
                <Box className='grow'>
                    <Transactions />
                </Box>
                <Transfer />
            </Box>
        </Box>
    )
}

export default withCookies(CardPage);