
class ApiUtils {
    apiUrl = "https://my-react.local:3000/v1/";

    trialFunction = () => "hit the trial function after refactor";

    logout = (setLogin, apiToken) => {
        const requestOptions = {
            headers: { 'Content-Type': 'application/json' }
        };

        fetch('https://my-react.local:3000/v1/logout/?apiToken=' + apiToken, requestOptions)
            .then(response => response.json())
            .then(data => console.log("DATER: " + JSON.stringify(data)));

        setLogin(false)
    }

}


export {ApiUtils};
