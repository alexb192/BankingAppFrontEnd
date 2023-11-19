import React, { useEffect, useState } from 'react';
import { useStore } from '../LoginAuthenticator/LoginContext';
import axios from 'axios';
import NavBar from './PageTemplates/NavBar';
import SideBar from './PageTemplates/SideBar';
import { withCookies } from 'react-cookie';

import { Link } from 'react-router-dom'
import { Box, Table, TableCell, TableContainer, TableRow, Container, TableBody } from '@mui/material';

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
        <>
            <NavBar cookies={props.cookies} />
            <Box className='flex flex-row-reverse'>
            <SideBar className='sticky' />
                <Container maxWidth='md'>
                    <TableContainer>
                        <Table>
                            <TableBody>
                                {cards}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </Container>
            </Box>
        </>
    );

}

export default withCookies(HomePage);