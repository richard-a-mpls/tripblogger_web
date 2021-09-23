// import classes from './Footer.module.css';
import React from "react";

const Footer = (props) => {
    return (
        <footer>
            <br/>
            <center>
                <p>
                    Page State: {props.pageState}<br/>
                    Logged In: {props.loggedIn}
                </p>
            </center>
        </footer>
    );
}

export default Footer;