import React, {useState} from 'react';
import {Alert, Card, Image} from "react-bootstrap";
import AuthenticateUser from './Components/Authentication/AuthenticateUser';
import LogoutUser from "./Components/Authentication/LogoutUser";
import WelcomeMessage from "./Components/Authentication/WelcomeMessage";
import EditProfile from "./Components/Profile/EditProfile";
import NewProject from "./Components/Projects/NewProject";
import './App.css';

function App() {
    const [login, setLogin] = useState(false);
    const [pageState, setPageState] = useState('');
    const [apiToken, setApiToken] = useState('');
    const [fbData, setFbData] = useState('');
    const [fbPicture, setFbPicture] = useState('');
    const [userProfile, setUserProfile] = useState('');

    const setApiSession = (apiTokenId) => {
        console.log(apiTokenId.api_token);
        setApiToken(apiTokenId.api_token);
        // TODO
        //do i have projects already if userHasProjects setPageState=something
        setPageState('welcome_message');
        setLogin(true);

        fetch('https://my-react.local:3000/v1/profile', {
            method: 'get',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + apiTokenId.api_token
            })
        })
            .then(response => response.json())
            .then(data => setUserProfile(data));
    };

    const refreshUserProfile = (newUserProfile) => {
        console.log(newUserProfile)
        setUserProfile(newUserProfile)
    }

    const logoutHandler = () => {
        setApiToken('');
        setPageState('');
        setLogin(false);
    };

    const setFbInfo = (dataReturned, pictureReturned) => {
        setFbData(dataReturned);
        setFbPicture(pictureReturned);
    };

    const changePageState = (desiredState) => {
        setPageState(desiredState);
    };

    const editProfileClickHandler = (event) => {
        changePageState("edit_profile");
    };

    return (
        <Card style={{width: 'auto'}}>
            {!login &&
            <Card.Header>
                <AuthenticateUser
                    setApiSession={setApiSession}
                    setFbInfo={setFbInfo}/>
            </Card.Header>
            }
            {login &&
            <div>
                <Card.Body>
                    <Card.Title>
                        <Alert key="5" variant="dark">
                            <Image src={fbPicture} roundedCircle/> {userProfile.profile_name}
                            <a href="#" onClick={editProfileClickHandler}> (edit profile)</a>
                        </Alert>
                    </Card.Title>
                    <Card.Text>
                        {pageState === 'welcome_message' &&
                        <WelcomeMessage changePageState={changePageState}/>
                        }
                        {pageState === 'new_project' &&
                        <NewProject changePageState={changePageState}/>
                        }
                        {pageState === 'edit_profile' &&
                        <EditProfile userProfile={userProfile} apiToken={apiToken} refreshUserProfile={refreshUserProfile} changePageState={changePageState}/>
                        }
                    </Card.Text>
                </Card.Body>
                <Card.Footer>
                    <p className="small">API Token ID: {apiToken}, Page State: {pageState}</p>
                    {login &&
                        <LogoutUser apiToken={apiToken} logoutHandler={logoutHandler}/>
                    }
                </Card.Footer>
            </div>
            }
        </Card>
    );
}

export default App;