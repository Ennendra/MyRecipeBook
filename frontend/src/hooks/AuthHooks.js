import { useState, useCallback, useEffect } from "react";

let logoutTimer;

export const useAuthHook = () => {
    //An app-wide login state
    const [token, setToken] = useState(false);
    const [userId, setUserId] = useState(false);
    const [tokenExpirationDate, setTokenExpirationDate] = useState();

    const[loading, setLoading] = useState(true);

    //Login function. Sets a token, userID and expiration date state
    //login state is currently set as 14 days from time of login
    //Set this data into localstorage for the browser to use on refresh
    const login = useCallback((uid, token, expiration) => {
        setToken(token);
        setUserId(uid);

        const newTokenExpirationDate = expiration || new Date(new Date().getTime() + (1000 * 60 * 60 * 24 * 7));
        setTokenExpirationDate(newTokenExpirationDate);
        localStorage.setItem('userData', JSON.stringify({userId : uid, token: token, expiration: newTokenExpirationDate.toISOString()}));
    }, []);
    //Logout. Clears the token, userID and expiration states and removes those items from localstorage
    const logout = useCallback(() => {
        setToken(null);
        setUserId(null);
        setTokenExpirationDate(null);
        localStorage.removeItem('userData');
    }, []);

    //useEffect to auto-login if there is data in localstorage
    useEffect(() => {
        const storedLoginData = JSON.parse(localStorage.getItem('userData'));
        if (storedLoginData && storedLoginData.token && new Date(storedLoginData.expiration) > new Date()) {
        login(storedLoginData.userId, storedLoginData.token, new Date(storedLoginData.expiration));
        } 
            setLoading(false);  // Mark loading as complete if no valid token is found
    }, [login]);
    //useEffect to automatically logout once the login token has expired
    useEffect(() => {
        if (token && tokenExpirationDate) {
        const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
        logoutTimer = setTimeout(logout, remainingTime)
        } else {
        clearTimeout(logoutTimer);
        }
    }, [token, logout, tokenExpirationDate]);

    return { token, login, logout, userId, loading}
}