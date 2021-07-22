
const LogoutUser = (props) => {
    const endSessionHandler = (event) => {
        event.preventDefault();

        const requestOptions = {
            headers: {'Content-Type': 'application/json'}
        };

        fetch('https://my-react.local:3000/v1/logout/?apiToken=' + props.apiToken, requestOptions)
            .then(response => response.json())
            .then(data => console.log("DATER: " + JSON.stringify(data)));
        props.logoutHandler();
    }

    return (
        <form onSubmit={endSessionHandler}>
            <button type="submit">Log Out</button>
        </form>
    );
};

export default LogoutUser;