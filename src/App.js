import React, {useState} from 'react';
import WelcomeMessage from "./Components/Authentication/WelcomeMessage";
import EditProfile from "./Components/Profile/EditProfile";
import ProjectParent from "./Components/Projects/ProjectParent"
import './App.css';
import StylesCard from "./Components/UI/StylesCard";
import Header from "./Components/UI/Header";

import {useDispatch, useSelector} from "react-redux";
import {uiActions} from "./store/ui-slice";
import {AuthenticatedTemplate, UnauthenticatedTemplate} from "@azure/msal-react";
import AuthorizingSession from "./Components/Authentication/AuthorizingSession";
import EndSession from "./Components/Authentication/EndSession";
import PublicProjectsList from "./Components/Projects/PublicProjectsList";
import IntroModal from "./Components/Authentication/IntroModal";

function App() {
    const dispatch = useDispatch();
    const loggedIn = useSelector(state => state.authSlice.loggedIn);
    const pageState = useSelector(state => state.uiSlice.pageState);
    const [showIntroModal, setShowIntroModal] = useState(true);

    const showProjectViewHandler = () => {
        dispatch(uiActions.showProjectView());
    }
    const showWelcomePageHandler = () => {
        dispatch(uiActions.showWelcomePage());
    }

    const closeIntroModal = () => {
        setShowIntroModal(false);
    }

    return (
        <StylesCard>
            <>
                <UnauthenticatedTemplate>
                    {showIntroModal && <IntroModal closeHandler={closeIntroModal}/>}
                    {loggedIn === 'complete' &&
                    <EndSession/>
                    }
                    <main>
                        <PublicProjectsList/>
                    </main>
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
                        <EditProfile showWelcomePage={showWelcomePageHandler}/>
                        }
                    </>}
                </AuthenticatedTemplate>
                <Header/>
            </>
        </StylesCard>
    );
}

export default App;