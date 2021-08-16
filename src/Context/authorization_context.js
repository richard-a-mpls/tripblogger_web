import React, {useState} from "react";
import axios from "axios";

const AuthorizationContext = React.createContext({
    userProfile: '',
    pageState: 'welcome_message',
    editProfileClickHandler: () => {},
    logoutHandler: () => {},
    showProjectView: () => {},
    showWelcomePage: () => {},
    refreshUserProfile: () => {},
    changePageState: () => {},
    setApiSession: () => {},
    setPageState: () => {},
    initialize: () => {}
});

export const STORAGE_APITOKEN='apiToken';
export const STORAGE_LOGGEDIN='logged_in';



export const AuthorizationContextProvider = (props) => {
    const [userProfile, setUserProfile] = useState('');
    const [pageState, setPageState] = useState('welcome_message');

    const setApiSession = (apiTokenId) => {
        localStorage.setItem(STORAGE_APITOKEN, apiTokenId);
        // TODO
        //do i have projects already if userHasProjects setPageState=something
        localStorage.setItem(STORAGE_LOGGEDIN, 'yes');
        axios.get('https://my-react.local:3000/v1/profile', {
            headers: {Authorization: `Bearer ${localStorage.getItem(STORAGE_APITOKEN)}`}
        })
            .then(response => setUserProfile(response.data))
            .catch(error => {
                console.log(error);
                logoutHandler();
            });
    };

    const refreshUserProfile = (newUserProfile) => {
        console.log(newUserProfile)
        setUserProfile(newUserProfile)
    }

    const logoutHandler = () => {
        localStorage.removeItem(STORAGE_APITOKEN);
        localStorage.removeItem(STORAGE_LOGGEDIN);
        setPageState('');
    };

    const showWelcomePage = () => {
        setPageState('welcome_message');
    }

    const showProjectView = (event) => {
        changePageState("project_view");
    }

    const changePageState = (desiredState) => {
        setPageState(desiredState);
    };

    const editProfileClickHandler = (event) => {
        changePageState("edit_profile");
    };

    const initialize = () => {
        console.log("setup");
        if (localStorage.getItem(STORAGE_APITOKEN) && !userProfile) {
            setApiSession(localStorage.getItem(STORAGE_APITOKEN));
            setPageState('welcome_message')
        }
    }

    return <AuthorizationContext.Provider value={{
        userProfile: userProfile,
        pageState: pageState,
        editProfileClickHandler: editProfileClickHandler,
        logoutHandler: logoutHandler,
        showProjectView: showProjectView,
        showWelcomePage: showWelcomePage,
        refreshUserProfile: refreshUserProfile,
        changePageState: changePageState,
        setApiSession: setApiSession,
        setPageState: setPageState,
        initialize: initialize
    }}>
        {props.children}
    </AuthorizationContext.Provider>
};

export default AuthorizationContext;