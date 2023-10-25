import React, { useState } from 'react';
import axios from 'axios';
import './LoginForm.css';

import { useStoreUpdate } from '../../LoginAuthenticator/LoginContext';
import { TextField, Box, Button, Container, Typography, FormControlLabel, Checkbox } from '@mui/material';
import { FormControl, InputLabel, OutlinedInput, InputAdornment, IconButton } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { withCookies } from 'react-cookie';

function LoginForm(props) {

    const [state, setState] = useState();
    const [showPassword, setShowPassword] = useState(false);

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
            <Box component="form" onSubmit={handleSubmit} className='flex flex-col items-center justify-items-center mt-8'>
                <Typography component="h1" variant="h5">Sign In</Typography>
                <TextField inputProps={{pattern: '[a-zA-Z0-9_]+'}} margin="normal" label="Username" variant="outlined" name='username' type='username' required={true} onKeyUp={handleChange} autoFocus fullWidth />
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
                    <Button>Sign Up</Button>
                </Box>
                <Button type='submit' className='mt-3' fullWidth variant='contained'>Sign In</Button>
            </Box>
        </Container>
    )

}

export default withCookies(LoginForm);