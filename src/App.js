import React, {useContext} from 'react';
import AuthenticateUser from './Components/Authentication/AuthenticateUser';
import WelcomeMessage from "./Components/Authentication/WelcomeMessage";
import EditProfile from "./Components/Profile/EditProfile";
import ProjectParent from "./Components/Projects/ProjectParent"
import Test from "./Components/UI/Test"
import './App.css';
import BloggerCard from "./Components/UI/BloggerCard";
import Header from "./Components/UI/Header";
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
                    <Header/>
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