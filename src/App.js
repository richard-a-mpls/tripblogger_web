import React, {useContext} from 'react';
import AuthenticateUser from './Components/Authentication/AuthenticateUser';
import WelcomeMessage from "./Components/Authentication/WelcomeMessage";
import EditProfile from "./Components/Profile/EditProfile";
import ProjectParent from "./Components/Projects/ProjectParent"
import Test from "./Components/UI/Test"
import './App.css';
import BloggerCard from "./Components/UI/BloggerCard";
import Header from "./Components/UI/Header";
import AuthorizationContext, {STORAGE_APITOKEN, STORAGE_LOGGEDIN} from "./Context/authorization_context";

function App() {
    const authCtx = useContext(AuthorizationContext);
    authCtx.initialize();

    return (
        <BloggerCard>
            {authCtx.pageState !== 'test' && <>
                {!localStorage.getItem(STORAGE_LOGGEDIN) &&
                    <AuthenticateUser/>
                }
                {localStorage.getItem(STORAGE_LOGGEDIN) &&
                <>
                    <Header/>
                    {authCtx.pageState === 'welcome_message' &&
                    <WelcomeMessage changePageState={authCtx.showProjectView}/>
                    }
                    {authCtx.pageState === 'project_view' &&
                    <ProjectParent showWelcomePage={authCtx.showWelcomePage}/>
                    }
                    {authCtx.pageState === 'edit_profile' &&
                    <EditProfile userProfile={authCtx.userProfile} apiToken={localStorage.getItem(STORAGE_APITOKEN)}
                                 refreshUserProfile={authCtx.refreshUserProfile} changePageState={authCtx.changePageState}
                                 showWelcomePage={authCtx.showWelcomePage}/>
                    }
                    <footer>
                        <br/>
                        <center>
                            <p>API Token: {localStorage.getItem(STORAGE_APITOKEN)}<br/>Page
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