import React from "react";
import {Image} from "react-bootstrap";

const WelcomeMessage = (props) => {

    const getStartedHandler = (event) => {
        event.preventDefault();
        console.log("preventing default");
        props.changePageState("new_project");
    };

    return (
        <div>
            <h2>Welcome to TripBlogger</h2>
            <p>
                Tripblogger is an interactive project builder allowing organization of trip experiences and
                photos and is available via the web, android or iOS.
            </p>
            <p>
                To get started, simply click the get started button below.
            </p>
            <form onSubmit={getStartedHandler}>
                <button type="submit">Get Started</button>
            </form>
        </div>
    );
}

export default WelcomeMessage;