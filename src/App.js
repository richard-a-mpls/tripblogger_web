import React, {useContext} from 'react';
import WelcomeMessage from "./Components/Authentication/WelcomeMessage";
import EditProfile from "./Components/Profile/EditProfile";
import ProjectParent from "./Components/Projects/ProjectParent"
import './App.css';
import BloggerCard from "./Components/UI/BloggerCard";
import Header from "./Components/UI/Header";
import AuthorizationContext, {STORAGE_APITOKEN} from "./Context/authorization_context";

import {useDispatch, useSelector} from "react-redux";
import {uiActions} from "./store/ui-slice";
import {AuthenticatedTemplate, UnauthenticatedTemplate} from "@azure/msal-react";
import AuthorizingSession from "./Components/Authentication/AuthorizingSession";
import EndSession from "./Components/Authentication/EndSession";
import PublicProjectsList from "./Components/Projects/PublicProjectsList";

function App() {
    const authCtx = useContext(AuthorizationContext);
    const dispatch = useDispatch();
    const loggedIn = useSelector(state => state.authSlice.loggedIn);
    const pageState = useSelector(state => state.uiSlice.pageState);

    const showProjectViewHandler = () => {
        dispatch(uiActions.showProjectView());
    }
    const showWelcomePageHandler = () => {
        dispatch(uiActions.showWelcomePage());
    }

    return (
        <BloggerCard>
            <>
                <UnauthenticatedTemplate>
                    {loggedIn === 'complete' &&
                    <EndSession/>
                    }
                    <div className="center" style={{marginTop: "60px"}}>
                        <PublicProjectsList/>
                    </div>
                </UnauthenticatedTemplate>
                <AuthenticatedTemplate>
                    {loggedIn === 'pending' &&
                    <AuthorizingSession/>
                    }
                    {loggedIn === 'complete' && <>
                        {pageState === 'welcome_message' &&
                        <WelcomeMessage changePageState={showProjectViewHandler}/>
                        }
                        {pageState === 'project_view' &&
                        <ProjectParent showWelcomePage={showWelcomePageHandler}/>
                        }
                        {pageState === 'edit_profile' &&
                        <EditProfile userProfile={authCtx.userProfile} apiToken={localStorage.getItem(STORAGE_APITOKEN)}
                                     refreshUserProfile={authCtx.refreshUserProfile}
                                     showWelcomePage={showWelcomePageHandler}/>
                        }
                    </>}
                    <br/><br/><br/><br/><br/>
                </AuthenticatedTemplate>
                <br/><br/><br/><br/><br/>
                <Header/>
                <footer>
                    <br/>
                    <center>
                        <p>
                            Page State: {pageState}<br/>
                            Logged In: {loggedIn}
                        </p>
                    </center>
                </footer>

            </>
        </BloggerCard>
    );
}

export default App;