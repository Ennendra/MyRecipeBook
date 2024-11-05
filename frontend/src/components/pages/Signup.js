import {React, useState, useRef, useContext} from 'react';
import { useNavigate } from 'react-router-dom';
import './Auth.css';
//@MUI html styles
import { Stack } from '@mui/material';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import { AuthContext } from '../common/context/auth-context';

export const Signup = () => {
    //Getting the auth context (letting us know if we are logged in)
    const auth = useContext(AuthContext);
    //Setting the form data as states
    const [signupName, setSignupName] = useState('');
    const [signupEmail, setSignupEmail] = useState('');
    const [signupPassword, setSignupPassword] = useState('');
    const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
    //Form and error references
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [passwordMismatchError, setPasswordMismatchError] = useState('');

    const wasSubmitCalledRef = useRef(false);
    const formRef = useRef(null);
    //navigation
    const navigate = useNavigate();

    //Assembles the inputs into an object form
    const getSignupData = () => {
        const target = formRef.current;
        if (target === null) {
            return {};
        }

        const newSignup = {
            signupName,
            signupEmail,
            signupPassword,
            signupConfirmPassword
        }

        return newSignup;
    }

    //Validation checks
    const validateName = (value) => {
        if (value.trim() === '') {
            setNameError('Name cannot be empty.');
            return false;
        }
        //Checks that the input does not have any of the described special characters
        const regexCheck = /[!@#$%^&*(),.?":{}|<>]/;
        if (regexCheck.test(value)) {
            setNameError('Names cannot contain special characters.');
            return false;
        }
        
        return true;
    }
    const validateEmail = (value) => {
        //Checks that the input is in an email format (e.g. 'example@email.com')
        return /^\S+@\S+\.\S+$/.test(value);
    };
    const validatePassword = (value) => {
        return !(value.trim() === '');
    }
    const validateConfirmPassword = () => {
        return (signupConfirmPassword === signupPassword);
    }

    //Main validation function
    const validateSignup = () => {
        if (!wasSubmitCalledRef.current) {
        return;
        }

        //resetting the error messages
        setNameError('');
        setEmailError('');
        setPasswordError('');
        setPasswordMismatchError('');

        //Set the signup form data as an object
        const newSignup = getSignupData();

        //Check validations for the inputs
        let isValid = true;
        if (!validateName(newSignup.signupName)) {
            console.log("Name error");
            isValid = false;
        }
        if (!validateEmail(newSignup.signupEmail)) {
            setEmailError('Please enter a valid email address');
            console.log("email error");
            isValid = false;
        }
        if (!validatePassword(newSignup.signupPassword)) {
            setPasswordError('Password input cannot be empty');
            console.log("password error");
            isValid = false;
        }
        if (!validateConfirmPassword()) {
            setPasswordMismatchError('Passwords to not match');
            console.log("Confirm Password Error");
            isValid=false;
        }

        //Return whether the inputs are valid
        return isValid;
    }

    const onSwitchToLogin = (e) => {
        e.preventDefault();
        navigate(`/login`); 
    }

    //called when the submit button is pressed
    const onSubmitSignup = (e) => {
        e.preventDefault();

        wasSubmitCalledRef.current=true;

        if (!validateSignup()) { return; }

        //TODO: API CALL HERE
        alert("Successful validation: API would call now");
        auth.login();
    }

    return (
        <div className="auth-form">
            <h2 className="auth-title">Sign Up</h2>
            <form onSubmit={onSubmitSignup} ref={formRef}>
                <label htmlFor="signupName" className="input-label">Name (*)</label>
                <TextField
                    hiddenLabel
                    id="name"
                    name="signupName"
                    className="input-text"
                    placeholder="Name"
                    variant="filled"
                    value={signupName}
                    onChange={e => {
                        setNameError('');
                        setSignupName(e.target.value);
                    }}
                    error={!!nameError} //Is true if the error isn't empty (ie. not-not-true)
                    helperText={nameError}
                />

                <label htmlFor="signupEmail" className="input-label">Email (*)</label>
                <TextField
                    hiddenLabel
                    //type="email"
                    id="email"
                    name="signupEmail"
                    className="input-text"
                    placeholder="Email"
                    variant="filled"
                    value={signupEmail}
                    onChange={e => {
                        setEmailError('');
                        setSignupEmail(e.target.value);
                    }}
                    error={!!emailError} //Is true if the error isn't empty (ie. not-not-true)
                    helperText={emailError}
                />

                <label htmlFor="signupPassword" className="input-label">Password (*)</label>
                <TextField
                    hiddenLabel
                    type="password"
                    id="password"
                    name="signupPassword"
                    className="input-text"
                    placeholder="Password"
                    variant="filled"
                    value={signupPassword}
                    onChange={e => {
                        setPasswordError('');
                        setSignupPassword(e.target.value);
                    }}
                    error={!!passwordError} //Is true if the error isn't empty (ie. not-not-true)
                    helperText={passwordError}
                />

                <label htmlFor="signupConfirmPassword" className="input-label">Confirm Password (*)</label>
                <TextField
                    hiddenLabel
                    type="password"
                    id="confirmPassword"
                    name="signupConfirmPassword"
                    className="input-text"
                    placeholder="Confirm Password"
                    variant="filled"
                    value={signupConfirmPassword}
                    onChange={e => {
                        setPasswordMismatchError('');
                        setSignupConfirmPassword(e.target.value);
                    }}
                    error={!!passwordMismatchError} //Is true if the error isn't empty (ie. not-not-true)
                    helperText={passwordMismatchError}
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
                            Signup
                        </Button>

                        <Button
                            className="switch-to-signup-button"
                            onClick={onSwitchToLogin}
                            type="button"
                            variant="contained"
                            color="inherit"
                            size="large"
                        >
                            Switch to login
                        </Button>
                    </Stack>
                </div>
            </form>
        </div>
    );
};