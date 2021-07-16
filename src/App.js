import React, {useState} from 'react';
import {Card, Image} from "react-bootstrap";
import AuthenticateUser from './Components/Authentication/AuthenticateUser';
import LogoutUser from "./Components/Authentication/LogoutUser";
import WelcomeMessage from "./Components/Authentication/WelcomeMessage";
import EditProfile from "./Components/Profile/EditProfile";
import ProjectParent from "./Components/Projects/ProjectParent"
import './Components/UI/Global.css'
import './App.css';

function App() {
    const [login, setLogin] = useState(false);
    const [pageState, setPageState] = useState('');
    const [apiToken, setApiToken] = useState('');
    const [fbData, setFbData] = useState('');
    const [fbPicture, setFbPicture] = useState('');
    const [userProfile, setUserProfile] = useState('');
    const [projectList, setProjectList] = useState([]);

    const addToProjectList = (addProject) => {
        setProjectList([addProject, ...projectList]);
    }

    const showWelcomePage = () => {
        setPageState('welcome_message');
    }
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

    const removeProject = (idToRemove) => {
        setProjectList(projectList.filter((prj => {
            return prj._id !== idToRemove;
        })));
    }

    const loadProjectList = (event) => {
        event.preventDefault();
        fetch('http://localhost:8080/v1/me/projects', {
            method: 'get',
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + apiToken
            })
        })
            .then(async response => await response.json())
            .then(data => {
                console.log("set with ");
                console.log(data);
                setProjectList(data);
            });
        changePageState("project_view");
    }

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
        <Card style={{width: 'auto', align: 'center'}}>
            {!login &&
            <Card.Header>
                <AuthenticateUser
                    setApiSession={setApiSession}
                    setFbInfo={setFbInfo}/>
            </Card.Header>
            }
            {login &&
            <div>
                <Card.Header style={{backgroundColor: '#26567b', verticalAlign: 'center'}}>
                    <div className="bform-control">
                        <button className="button-profile" onClick={editProfileClickHandler}>
                            <Image src={fbPicture} roundedCircle/>&nbsp;{userProfile.profile_name}
                        </button>
                        <LogoutUser apiToken={apiToken} logoutHandler={logoutHandler}/>
                    </div>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        {pageState === 'welcome_message' &&
                        <WelcomeMessage changePageState={loadProjectList}/>
                        }
                        {pageState === 'project_view' &&
                        <ProjectParent removeProject={removeProject} addToProjectList={addToProjectList}
                                       projectList={projectList} apiToken={apiToken} changePageState={loadProjectList}
                                       showWelcomePage={showWelcomePage}/>
                        }
                        {pageState === 'edit_profile' &&
                        <EditProfile userProfile={userProfile} apiToken={apiToken}
                                     refreshUserProfile={refreshUserProfile} changePageState={changePageState}
                                     showWelcomePage={showWelcomePage}/>
                        }
                    </Card.Text>
                </Card.Body>
                <Card.Footer style={{backgroundColor: '#26567b'}}>
                    <br/>
                    <center>
                        <p style={{color: 'white'}} className="small"><strong>API Token: {apiToken}<br/>Page
                            State: {pageState}</strong></p>
                    </center>
                </Card.Footer>
            </div>
            }
        </Card>
    );
}

export default App;