import React, {useState} from 'react';
import LoginForm from './LoginForm';
import CreateAccountForm from './CreateAccountForm';
import './LoginPage.css'


function LoginPage () {

    const [choice, setChoice] = useState(null);


    if (choice === 'Login')
        return (
            <LoginForm />
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

export default LoginPage;