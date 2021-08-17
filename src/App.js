import React, {useContext, useEffect} from 'react';
import AuthenticateUser from './Components/Authentication/AuthenticateUser';
import WelcomeMessage from "./Components/Authentication/WelcomeMessage";
import EditProfile from "./Components/Profile/EditProfile";
import ProjectParent from "./Components/Projects/ProjectParent"
import Test from "./Components/UI/Test"
import './App.css';
import BloggerCard from "./Components/UI/BloggerCard";
import Header from "./Components/UI/Header";
import AuthorizationContext, {STORAGE_APITOKEN} from "./Context/authorization_context";

import {setupProfile} from "./store/auth-slice";
import {useDispatch, useSelector} from "react-redux";
import {uiActions} from "./store/ui-slice";

function App() {
    const authCtx = useContext(AuthorizationContext);
    //authCtx.initialize();
    const dispatch = useDispatch();
    const loggedIn = useSelector(state => state.authSlice.loggedIn);
    const pageState = useSelector(state => state.uiSlice.pageState);
    const apiToken = useSelector(state => state.authSlice.apiToken);

    useEffect(() => {
        dispatch(setupProfile(apiToken));
    }, [apiToken, dispatch]);

    const showProjectViewHandler = () => {
        dispatch(uiActions.showProjectView());
    }
    const showWelcomePageHandler = ()  => {
        dispatch(uiActions.showWelcomePage());
    }

    return (
        <BloggerCard>
            {pageState !== 'test' && <>
                {!loggedIn && loggedIn !== 'pending' &&
                    <AuthenticateUser/>
                }
                {loggedIn && loggedIn !== 'pending' &&
                <>
                    <Header/>
                    {pageState === 'welcome_message' &&
                    <WelcomeMessage changePageState={showProjectViewHandler}/>
                    }
                    {pageState === 'project_view' &&
                    <ProjectParent showWelcomePage={showWelcomePageHandler}/>
                    }
                    {pageState === 'edit_profile' &&
                    <EditProfile userProfile={authCtx.userProfile} apiToken={localStorage.getItem(STORAGE_APITOKEN)}
                                 refreshUserProfile={authCtx.refreshUserProfile} showWelcomePage={showWelcomePageHandler}/>
                    }
                    <footer>
                        <br/>
                        <center>
                            <p>API Token: {localStorage.getItem(STORAGE_APITOKEN)}<br/>Page
                                State: {pageState}</p>
                        </center>
                    </footer>
                </>
                }
            </>}
            {pageState === 'test' &&
            <Test showWelcome={showWelcomePageHandler}></Test>
            }
        </BloggerCard>
    );
}

export default App;