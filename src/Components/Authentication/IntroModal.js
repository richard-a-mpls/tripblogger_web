import Modal from "../UI/Modal";
import classes from "./IntroModal.module.css";
import React, {useState} from "react";
import WakeupServices from "./WakeupServices";

const IntroModal = (props) => {

    const [returnIndex, setReturnIndex] = useState(0);
    const returnInfo = [
        <WakeupServices/>,
        <p>In the interim, welcome to my slackr site. In the summer of 2021, I decided to take a break from my career to
            do 'other' things.</p>,
        <p>During that time I did numerous hiking trips from a day to a week traveling thousands of miles around
            Minnesota, Wisconsin, South Dakota, Wyoming, Nebraska, Iowa and Colorado.</p>,
        <p>And while I was at it, I built this service to learn new skills, and freshen up on things I've not used in a
            while.</p>,
        <p>and act as a hosting point to show my adventures during my time off.</p>,
        <p>This is the start for potential future capabilities and allows sharing of pictures with some ability to
            summarize where, what, when...</p>,
        <p>If you choose to post, please be kind in both content and amount posted. I'm leveraging free cloud services
            so please don't abuse it.</p>,
        <p>That said, there is no guarantee on retention of information so.....</p>,
        <img src="/arch_diagram.drawio.png"/>,
        <>
            <p>The previous diagram shows current state. Future plans include:</p>
            <ul>
                <li>splitting of microservices further, using additional technologies i.e. NodeJS, etc.</li>
                <li>better error handling and hardening.</li>
                <li>ability to support multi day/destination groupings of photos.</li>
                <li>ability to support "friends" and sharing within just friends vs. just public or not public.</li>
            </ul>
        </>,
        <>
            <p>The previous diagram shows current state. Future plans include:</p>
            <ul>
                <li>ability to add comments from both publishers and commenter for public post, day or individual
                    photo
                </li>
                <li>better and consolidated naming and terms.</li>
                <li>Lots of other things</li>
            </ul>
        </>,
        <p>I'd also like to add support for video and audio files...</p>,
        <p>All of code is hosted on github at <a
            target="_blank" href="https://github.com/richard-a-mpls">https://github.com/richard-a-mpls</a></p>,
        <p>All services are hosted by Azure App Services in the Free Tier.</p>,
        <p>Deployment is facilitated by GitHub Actions for most services.</p>,
        <p>Thanks and hope you enjoy the site.</p>,
        <WakeupServices show="yes" closeHandler={props.closeHandler}/>
    ];

    const timeoutId = setTimeout(() => {
        setReturnIndex(returnIndex + 1)
    }, 10000);
    if (returnIndex >= returnInfo.length - 1) {
        clearTimeout(timeoutId);
    }

    return (
        <Modal onClose={props.closeHandler}>
            <div style={{textAlign: "center", backgroundColor: "white", borderRadius: "24px", height: "400px"}}>
                <i onClick={props.closeHandler} className="fas fa-times"/>
                <div className={classes.displaysection} style={{width: "50%", margin: "auto"}}>
                    {returnInfo[returnIndex]}
                </div>
            </div>
        </Modal>
    );

}

export default IntroModal;