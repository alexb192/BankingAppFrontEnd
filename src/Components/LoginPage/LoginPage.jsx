import React, {useState} from 'react';
import LoginForm from './LoginForm';
import CreateAccountForm from './CreateAccountForm';
import './LoginPage.css'
import { withCookies } from 'react-cookie';

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
                <button onClick={() => setChoice('Login')}>Log In</button>
                <button onClick={() => setChoice('CreateAccount')}>Create Account</button>
            </div>
        )
    }
}

export default withCookies(LoginPage);