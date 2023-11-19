import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import { useStoreUpdate } from '../../LoginAuthenticator/LoginContext';
import { TextField, Box, Button, Container, Typography, FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { withCookies } from 'react-cookie';

function SignUpPage(props) {

    const [state, setState] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const [failedPasswordMatch, setfailedPasswordMatch] = useState(false);

    const navigate = useNavigate(); // navigation hook (to go to '/')
    const storeLogInInformation = useStoreUpdate(); // user store

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (e) => e.preventDefault();

    const handleLogIn = async () => {
        // we're logging in with the account we just made
        axios.post(`${process.env.REACT_APP_API}login/`, {username: state.username, password: state.password})
        .then(res => {
            if (res.status === 200) {
                storeLogInInformation(state.username, true, res.data.key);
                props.cookies.set('auth', {username: state.username, key: res.data.key}, {path: '/'});
                navigate('/'); // we're logged in, go to the main page
            }
        }).catch(err => {
            console.log(err);
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (state.password !== state.verifyPassword) // only allow users to create account if password matches the verify box
        {
            setfailedPasswordMatch(true);
            return;
        }

        const data = { // repack the data to be sent to the backend
            username: state.username.trim(),
            password: state.password.trim(),
            fname: state.fname.trim(),
            lname: state.lname.trim(),
            pnumber: state.pnumber.trim(),
            address: state.address
        }

        axios.post(`${process.env.REACT_APP_API}createaccount`, data) // tell the backend to create our account
        .then((res) => {
            if (res.status === 200)
            console.log(res.status);
            handleLogIn(); // we log in now with our freshly created account
        }).catch((err) => {
            console.log(err);
        })
    }

    const handleChange = (e) => { // general function for all text boxes
        const target = e.target;
        const value = target.value;
        const name = target.name

        setState({ ...state, [name]: value })
    }


    return (
        <Container component="main" maxWidth="xs">
            <Box component="form" onSubmit={handleSubmit} className='flex flex-col items-center justify-items-center mt-8 gap-3'>
                <Typography component="h1" variant="h5">Sign Up</Typography>
                <TextField className='mt-8' inputProps={{pattern: '[a-zA-Z0-9_]+'}} label="Username" variant="outlined" name='username' type='username' required={true} onKeyUp={handleChange} autoFocus fullWidth />
                <FormControl variant="outlined" fullWidth>
                    <InputLabel>Password</InputLabel>
                    <OutlinedInput 
                        inputProps={{pattern: '^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,16}$'}}
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
                <TextField helperText='Password must match' error={failedPasswordMatch} inputProps={{pattern: '^(?=.*[0-9])[a-zA-Z0-9!@#$%^&*]{6,16}$'}} label="Verify Password" variant="outlined" name='verifyPassword' type='password' required={true} onKeyUp={handleChange} autoFocus fullWidth />
                <Box className='flex items-center justify-between min-w-full gap-3'>
                    <TextField inputProps={{pattern: '^[a-zA-Z]{3,}$'}} label="First Name" variant='outlined' name='fname' type='text' required={true} onKeyUp={handleChange} />
                    <TextField inputProps={{pattern: '^[a-zA-Z]{3,}$'}} label="Last Name" variant='outlined' name='lname' type='text' required={true} onKeyUp={handleChange} />
                </Box>
                <Box className='flex items-center justify-between min-w-full gap-3'>
                    <TextField label="Phone Number" variant='outlined' name='pnumber' type='text' inputProps={{pattern: '^[0-9]{10}$'}} required={true} onKeyUp={handleChange} />
                    <TextField label="Address" variant='outlined' name='address' type='text' required={true} onKeyUp={handleChange} />
                </Box>
                <Button type='submit' fullWidth variant='contained'>Sign Up</Button>
            </Box>
        </Container>
    )

}

export default withCookies(SignUpPage);