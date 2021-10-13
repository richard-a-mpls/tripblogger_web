import React, {useState} from "react";
import axios from "axios";
import {useEffect} from "react";
import Button from "../UI/Button";

const WakeupServices = (props) => {

    let configuredEndpoints = ["https://tripblogger-api-spring.azurewebsites.net/v1/wakeup",
        "https://tripblogger-api.azurewebsites.net/v1/wakeup",
        "https://b2ctokenvalidator.azurewebsites.net/wakeup"];
    if (process.env.REACT_APP_WAKEUP_ENDPOINTS) {
        configuredEndpoints = process.env.REACT_APP_WAKEUP_ENDPOINTS.split(",");
    }


    const wakeupEndpoints = useState(configuredEndpoints)[0];

    const [evaluatedCount, setEvaluatedCount] = useState(0);
    const [errors, setErrors] = useState([]);

    const wakeupEndpoint = (endpoint) => {
        axios.get(endpoint)
            .then(response => {
                if (response.status === 200) {
                    setEvaluatedCount((current) => {
                        return current + 1;
                    });
                }
            })
            .catch((err) => {
                setEvaluatedCount((current) => {
                    return current + 1;
                });
                setErrors((current) => {
                    const returnVal = current;
                    if (!returnVal.includes(endpoint)) {
                        returnVal.push(endpoint);
                    }
                    return returnVal;
                });
            });
    }

    useEffect(() => {
        wakeupEndpoints.map(endpoint =>
            wakeupEndpoint(endpoint)
        )
    }, [wakeupEndpoints]);

    return (
        <>
            Please be patient - I'm cheap so my free azure services will need a bit of time to wake up...
            {props.show &&
            <>
                <p>Evaluated Services {evaluatedCount}/{wakeupEndpoints.length}</p>
                {errors.length > 0 && <>
                    <p>Errors:</p>
                    <ul>
                        {errors.map((error) =>
                                <li key={error}>{error}</li>
                        )}
                    </ul>
                    <p>There were errors starting up services, usually this is because we've overreached our free service limits.  Please try again later or contact me with this screenshot and I'll have a look.</p>
                </>}
                {errors.length === 0 && evaluatedCount === wakeupEndpoints.length &&
                    <Button onClick={props.closeHandler}>Continue</Button>
                }
            </>
            }
        </>
    );


}

export default WakeupServices;