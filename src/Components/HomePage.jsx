import React, { useEffect, useState } from 'react';
import { useStore } from '../LoginAuthenticator/LoginContext';
import axios from 'axios';
import NavBar from './PageTemplates/NavBar';
import Transfer from './PageTemplates/Transfer';
import { withCookies } from 'react-cookie';

import { Link } from 'react-router-dom'
import { Box, Table, TableCell, TableContainer, TableRow, TableBody } from '@mui/material';

const HomePage = (props) => {

    const [cards, setCards] = useState();
    const store = useStore();

    useEffect(() => {
        axios.post(`${process.env.REACT_APP_API}getcards/${store.username}`, {username: store.username, key: store.key})
        .then(res => {
            setCards(
                res.data.map(card => (
                <TableRow className="text-xl" key={card.cardNumber}>
                    <TableCell><Link to={`card/${card.cardNumber}`}>{card.cardNumber}</Link></TableCell>
                    <TableCell>{card.cardHolder.fname} {card.cardHolder.lname}</TableCell>
                    <TableCell>${card.balance}<i>CAD</i></TableCell>
                </TableRow>
                ))
            )
        })
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    return (
        <Box>
            <NavBar cookies={props.cookies}/>
            <Box className='flex flex-col md:flex-row justify-between mt-12'>
                <Box className='m-6 flex-1'>
                    <TableContainer>
                        <Table>
                            <TableBody>
                                {cards}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Box>
                <Transfer className='self-center w-96' />
            </Box>
        </Box>
    );

}

export default withCookies(HomePage);