
import { useCallback, useRef, useEffect } from 'react';

export const useHttpClient = () => {
    //Defines any active requests, so we can abort them safely (e.g. navigating to new page while a request is still being processed)
    const activeHttpRequests = useRef([]);

    //Runs a fetch request, using: 
    //the specified URL (see backend/recipe-routes for valid url routes)
    //Method (default is GET, but POST and PATCH are also potential methods)
    //Body: Used for POST and PATCH requests, the JSON data we're wanting to send to the database
    //headers: For when we need to set certain browser permissions and avoid CORS errors
    //Run as a useCallBack to avoid it running on every re-render (which will prevent infinite loop errors)
    const sendAPIRequest = useCallback(
    async (url, method = 'GET', body = null, headers = {}) => {
        
        //Define a controller in case we need to abort this request
        const abortController = new AbortController();
        activeHttpRequests.current.push(abortController);

        try {
            //Send the request to backend and define the response
            const apiResponse = await fetch(url, {
                method, 
                body, 
                headers,
                signal: abortController.signal
            });

            //Wait for the response from backend
            const responseData = await apiResponse.json();
            //The request and response are ready, we can clear this request's abort controller
            activeHttpRequests.current = activeHttpRequests.current.filter(requestControllers => requestControllers !== abortController);
            //Throw an error if the response code received was not a 200/2xx code (ie, a 404 or 500 error etc was received)
            if (!apiResponse.ok) {
                throw new Error("API response error: " + responseData.message);
            }

            //request successful, return the data (recipes for GET, or success messages for other requests)
            return responseData;
        }
        catch(error) {
            console.log("Httphook error: "+error);
            throw error;
        }
    }, 
    [] );

    //Aborts any current requests if needed (e.g. navigating to new page) 
    useEffect(() => {
        return () => {
            activeHttpRequests.current.forEach(abortController => abortController.abort());
        };
    }, []);
    

    //return { isLoading, error, sendAPIRequest, clearError };
    return { sendAPIRequest };
};