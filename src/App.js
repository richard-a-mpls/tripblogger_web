import React, {useState} from 'react';
import {Card, Image} from "react-bootstrap";
import AuthenticateUser from './Components/Authentication/AuthenticateUser';
import LogoutUser from "./Components/Authentication/LogoutUser";
import WelcomeMessage from "./Components/Authentication/WelcomeMessage";
import EditProfile from "./Components/Profile/EditProfile";
import ProjectParent from "./Components/Projects/ProjectParent"
import Test from "./Components/UI/Test"
import './Components/UI/Global.css'
import './App.css';
import axios from "axios";
import BloggerCard from "./Components/UI/BloggerCard";

function App() {
    const [login, setLogin] = useState(false);
    const [pageState, setPageState] = useState('test');
    const [apiToken, setApiToken] = useState('');
    const [fbData, setFbData] = useState('');
    const [fbPicture, setFbPicture] = useState('');
    const [userProfile, setUserProfile] = useState('');

    const showWelcomePage = () => {
        setPageState('welcome_message');
    }

    const showProjectView = (event) => {
        changePageState("project_view");
    }

    const setApiSession = (apiTokenId) => {
        console.log(apiTokenId.api_token);
        setApiToken(apiTokenId.api_token);
        // TODO
        //do i have projects already if userHasProjects setPageState=something
        setPageState('welcome_message');
        setLogin(true);

        axios.get('https://my-react.local:3000/v1/profile', {
            headers: {Authorization: `Bearer ${apiTokenId.api_token}`}
        })
            .then(response => setUserProfile(response.data));
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
        <BloggerCard>
            {pageState != 'test' && <>
                {!login &&
                <AuthenticateUser
                    setApiSession={setApiSession}
                    setFbInfo={setFbInfo}/>
                }
                {login &&
                <>

                    <div className="header wb-form-control">
                        <div className="left-item">
                            <button className="button-profile" onClick={editProfileClickHandler}>
                                <Image src={fbPicture} className="profile-pic"/>&nbsp;{userProfile.profile_name}
                            </button>
                        </div>
                        <div className="right-item">
                            <LogoutUser apiToken={apiToken} logoutHandler={logoutHandler}/>
                        </div>
                    </div>
                    {pageState === 'welcome_message' &&
                    <WelcomeMessage changePageState={showProjectView}/>
                    }
                    {pageState === 'project_view' &&
                    <ProjectParent showWelcomePage={showWelcomePage} apiToken={apiToken}/>
                    }
                    {pageState === 'edit_profile' &&
                    <EditProfile userProfile={userProfile} apiToken={apiToken}
                                 refreshUserProfile={refreshUserProfile} changePageState={changePageState}
                                 showWelcomePage={showWelcomePage}/>
                    }
                    <Card.Footer style={{backgroundColor: '#26567b'}}>
                        <br/>
                        <center>
                            <p style={{color: 'white'}} className="small"><strong>API Token: {apiToken}<br/>Page
                                State: {pageState}</strong></p>
                        </center>
                    </Card.Footer>
                </>
                }
            </>}
            {pageState === 'test' &&
            <Test showWelcome={showWelcomePage}></Test>
            }
        </BloggerCard>
    );
}

export default App;