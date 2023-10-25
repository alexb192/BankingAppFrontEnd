import React, {useState} from 'react';
import LoginForm from './LoginForm';
import CreateAccountForm from './CreateAccountForm';
import './LoginPage.css'
import { withCookies } from 'react-cookie';
import { Button } from '@mui/material';

function LoginPage (props) {

    const [choice, setChoice] = useState(null);


    if (choice === 'Login')
        return (
            <LoginForm props={props.cookies}/>
        )
    else if (choice === 'CreateAccount')
        return (
            <CreateAccountForm />
        )
    else {
        return (
            <div className='LoginPage'>               
                <Button onClick={() => setChoice('Login')}>Log In</Button>
                <Button onClick={() => setChoice('CreateAccount')}>Create Account</Button>
            </div>
        )
    }
}

export default withCookies(LoginPage);