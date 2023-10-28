import React, { useState } from 'react';
import axios from 'axios';

import { useStoreUpdate } from '../../LoginAuthenticator/LoginContext';
import { TextField, Box, Button, Container, Typography, FormControlLabel, Checkbox } from '@mui/material';
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton, Alert } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { withCookies } from 'react-cookie';
import { Link } from 'react-router-dom';

function LogInPage(props) {

    const [state, setState] = useState();
    const [showPassword, setShowPassword] = useState(false);
    const [invalidLogin, setInvalidLogin] = useState(false);

    const handleClickShowPassword = () => setShowPassword((show) => !show);
    const handleMouseDownPassword = (e) => e.preventDefault();

    const storeLogInInformation = useStoreUpdate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        let resp = await axios.post(`${process.env.REACT_APP_API}login/`, state);
        console.log(resp.status);
        // second param is login status, true => is logged in  
        if (resp.status === 200) {
            storeLogInInformation(state.username, true, resp.data.key);
            props.cookies.set('auth', {username: state.username, key: resp.data.key}, {path: '/'});
        } else if (resp.status === 400) {
            setInvalidLogin(true);
            console.log(invalidLogin);
            console.log(resp.status);
        }
    }

    const handleChange = (e) => {
        const target = e.target;
        const value = target.value;
        const name = target.name

        setState({ ...state, [name]: value })
    }

    return (

        <Container component="main" maxWidth="xs">
            <Box component="form" onSubmit={handleSubmit} className='flex flex-col items-center justify-items-center mt-8 gap-3'>
                <Typography component="h1" variant="h5">Sign In</Typography>
                <TextField inputProps={{pattern: '[a-zA-Z0-9_]+'}} margin="normal" label="Username" variant="outlined" name='username' type='username' required={true} onKeyUp={handleChange} autoComplete='on' autoFocus fullWidth />
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
                    <Box className='flex items-center justify-between min-w-full'>
                    <FormControlLabel
                        control={<Checkbox value="remember" color="primary" />}
                        label="Remember me"
                    />
                    <Button><Link to='/signup'>Sign Up</Link></Button>
                </Box>
                <Button type='submit' className='mt-3' fullWidth variant='contained'>Sign In</Button>
            </Box>
            {invalidLogin && <Alert variant='outlined' severity='error'>Invalid Login Information</Alert>}
        </Container>
    )

}

export default withCookies(LogInPage);