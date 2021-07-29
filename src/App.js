import React, {useContext, useState} from 'react';
import {Image} from "react-bootstrap";
import AuthenticateUser from './Components/Authentication/AuthenticateUser';
import LogoutUser from "./Components/Authentication/LogoutUser";
import WelcomeMessage from "./Components/Authentication/WelcomeMessage";
import EditProfile from "./Components/Profile/EditProfile";
import ProjectParent from "./Components/Projects/ProjectParent"
import Test from "./Components/UI/Test"
import './App.css';
import BloggerCard from "./Components/UI/BloggerCard";
import AuthorizationContext from "./Context/authorization_context";

function App() {
    const authCtx = useContext(AuthorizationContext);

    return (
        <BloggerCard>
            {authCtx.pageState !== 'test' && <>
                {!authCtx.login &&
                    <AuthenticateUser/>
                }
                {authCtx.login &&
                <>
                    <header className="wb-form-control">
                        <div className="left-item">
                            <button className="button-profile" onClick={authCtx.editProfileClickHandler}>
                                {console.log(authCtx.fbPicture)}
                                <Image src={authCtx.fbPicture} className="profile-pic"/>&nbsp;{authCtx.userProfile.profile_name}
                            </button>
                        </div>
                        <div className="right-item">
                            <LogoutUser/>
                        </div>
                    </header>
                    {authCtx.pageState === 'welcome_message' &&
                    <WelcomeMessage changePageState={authCtx.showProjectView}/>
                    }
                    {authCtx.pageState === 'project_view' &&
                    <ProjectParent showWelcomePage={authCtx.showWelcomePage}/>
                    }
                    {authCtx.pageState === 'edit_profile' &&
                    <EditProfile userProfile={authCtx.userProfile} apiToken={authCtx.apiToken}
                                 refreshUserProfile={authCtx.refreshUserProfile} changePageState={authCtx.changePageState}
                                 showWelcomePage={authCtx.showWelcomePage}/>
                    }
                    <footer>
                        <br/>
                        <center>
                            <p>API Token: {authCtx.apiToken}<br/>Page
                                State: {authCtx.pageState}</p>
                        </center>
                    </footer>
                </>
                }
            </>}
            {authCtx.pageState === 'test' &&
            <Test showWelcome={authCtx.showWelcomePage}></Test>
            }
        </BloggerCard>
    );
}

export default App;