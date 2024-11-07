import {React, useState, useRef, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
//@MUI html styles
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { AuthContext } from '../common/context/auth-context';
import { useHttpClient } from '../../hooks/HttpHooks';

export const Login = () => {
    //Getting the auth context (letting us know if we are logged in)
    const auth = useContext(AuthContext);
    //Setting the form data as states
    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    //Form and error references
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const wasSubmitCalledRef = useRef(false);
    const formRef = useRef(null);
    //navigation
    const navigate = useNavigate();
    //Sending requests to the backend
    const { sendAPIRequest } = useHttpClient();

    //Assembles the inputs into an object form
    const getLoginData = () => {
        const target = formRef.current;
        if (target === null) {
            return {};
        }

        const newLogin = {
            loginEmail,
            loginPassword
        }

        return newLogin;
    }

    //Validation checks
    const validateEmail = (value) => {
        //Checks that the input is in an email format (e.g. 'example@email.com')
        return /^\S+@\S+\.\S+$/.test(value);
    };
    const validatePassword = (value) => {
        return !(value.trim() === '');
    }

    //Main validation function
    const validateLogin = () => {
        if (!wasSubmitCalledRef.current) {
        return;
        }

        //resetting the error messages
        setEmailError('');
        setPasswordError('');

        //Set the login form data as an object
        const newLogin = getLoginData();

        //Check validations for the inputs
        let isValid = true;
        if (!validateEmail(newLogin.loginEmail)) {
            setEmailError('Please enter a valid email address');
            console.log("email error");
            isValid = false;
        }
        if (!validatePassword(newLogin.loginPassword)) {
            setPasswordError('Password input cannot be empty');
            console.log("password error");
            isValid = false;
        }

        //Return whether the inputs are valid
        return isValid;
    }

    const onSwitchToSignup = (e) => {
        e.preventDefault();
        navigate(`/signup`);
    }

    //called when the submit button is pressed
    const onSubmitLogin = async (e) => {
        e.preventDefault();

        wasSubmitCalledRef.current=true;

        if (!validateLogin()) { return; }

        try {
            const newLogin = 
            JSON.stringify(
                getLoginData()
            );
            const responseData = await sendAPIRequest(`login`, 'POST', newLogin, {'Content-Type': 'application/json'})
            auth.login(responseData.userId, responseData.token);
        } catch(error) { console.log("Error with login" + error); }

    }

    return (
        <div className="auth-form">
            <h2 className="auth-title">Login</h2>
            <form onSubmit={onSubmitLogin} ref={formRef}>
                <label htmlFor="loginEmail" className="input-label">Email (*)</label>
                <TextField
                    hiddenLabel
                    //type="email"
                    id="email"
                    name="loginEmail"
                    className="input-text"
                    placeholder="Email"
                    variant="filled"
                    value={loginEmail}
                    onChange={e => {
                        setEmailError('');
                        setLoginEmail(e.target.value);
                    }}
                    error={!!emailError} //Is true if the error isn't empty (ie. not-not-true)
                    helperText={emailError}
                />

                <label htmlFor="loginPassword" className="input-label">Password (*)</label>
                <TextField
                    hiddenLabel
                    type="password"
                    id="password"
                    name="loginPassword"
                    className="input-text"
                    placeholder="Password"
                    variant="filled"
                    value={loginPassword}
                    onChange={e => {
                        setPasswordError('');
                        setLoginPassword(e.target.value);
                    }}
                    error={!!passwordError} //Is true if the error isn't empty (ie. not-not-true)
                    helperText={passwordError}
                />

                <hr />
                <div className="one-line-class">
                    <Stack direction="row" spacing={5}>
                        <Button
                            className="submit-button"
                            type="submit"
                            variant="contained"
                            color="success"
                            size="large"
                        >
                            Login
                        </Button>

                        <Button
                            className="switch-to-signup-button"
                            onClick={onSwitchToSignup}
                            type="button"
                            variant="contained"
                            color="inherit"
                            size="large"
                        >
                            Switch to signup
                        </Button>
                    </Stack>
                </div>
            </form>
        </div>
    );
};