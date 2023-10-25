import React, { useState } from 'react';
import axios from 'axios';

import { useStoreUpdate } from '../../LoginAuthenticator/LoginContext';
import { TextField, Box, Button, Container, Typography, FormControlLabel, Checkbox } from '@mui/material';
import { withCookies } from 'react-cookie';

function CreateAccount(props) {

    const [state, setState] = useState();

    const storeLogInInformation = useStoreUpdate();

    const handleLogIn = async () => {
        let resp = await axios.post(`${process.env.REACT_APP_API}login/`, {username: state.username, password: state.password});

        // second param is login status, true => is logged in  
        if (resp.status === 200) {
            storeLogInInformation(state.username, true, resp.data.key);
            props.cookies.set('auth', {username: state.username, key: resp.data.key}, {path: '/'});
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        axios.post(`${process.env.REACT_APP_API}createaccount`, state)
        .then((res) => {
            if (res.status === 200)
            console.log(res.status);
            handleLogIn(); // we log in now with our freshly created account
        }).catch((err) => {
            console.log(err);
        })
    }

    const handleChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name

        setState({ ...state, [name]: value })
    }

    const regEx = {
        username: "[a-zA-Z0-9_]"}
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box component="form" onSubmit={handleSubmit} className='flex flex-col items-center justify-items-center mt-8'>
                <Typography component="h1" variant="h5">Sign In</Typography>
                <TextField margin="normal" label="Username" variant="outlined" name='username' type='username' required={true} onKeyUp={handleChange} autoFocus fullWidth />
                <FormControl variant="outlined" fullWidth>
                    <InputLabel>Password</InputLabel>
                    <OutlinedInput 
                        name='password'
                        fullWidth
                        onKeyUp={handleChange}
                        required={true}
                        type={showPassword ? 'text' : 'password'}
                        endAdornment={
                        <InputAdornment position="end">
                            <IconButton
                            aria-label="toggle password visibility"
                            onClick={handleClickShowPassword}
                            onMouseDown={handleMouseDownPassword}
                            edge="end"
                            >
                            {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                        }
                        label="Password"
                    />
                </FormControl>
                <TextField margin="normal" label="Password" variant="outlined" name='verifyPassword' type='password' required={true} onKeyUp={handleChange} autoFocus fullWidth />
                <Box className='flex items-center justify-between min-w-full'>
                    <TextField label="First Name" variant='outlined' name='fname' type='text' required='true' onKeyUp={handleChange} />
                    <TextField label="Last Name" variant='outlined' name='lname' type='text' required='true' onKeyUp={handleChange} />
                </Box>
                <Box className='flex items-center justify-between min-w-full'>
                    <TextField label="Phone Number" variant='outlined' name='pnumber' type='text' required='true' onKeyUp={handleChange} />
                    <TextField label="Address" variant='outlined' name='address' type='text' required='true' onKeyUp={handleChange} />
                </Box>
                <Button type='submit' className='mt-3' fullWidth variant='contained'>Sign In</Button>
            </Box>
        </Container>
    )

}

export default withCookies(CreateAccount);