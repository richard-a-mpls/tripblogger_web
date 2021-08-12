import React, {useState} from "react";
import axios from "axios";

const AuthorizationContext = React.createContext({
    login: false,
    userProfile: '',
    pageState: 'welcome_message',
    editProfileClickHandler: () => {},
    logoutHandler: () => {},
    showProjectView: () => {},
    showWelcomePage: () => {},
    refreshUserProfile: () => {},
    changePageState: () => {},
    setApiSession: () => {},
    setPageState: () => {}
});

export const STORAGE_APITOKEN='apiToken';

export const AuthorizationContextProvider = (props) => {
    const [login, setLogin] = useState(false);
    const [userProfile, setUserProfile] = useState('');
    const [pageState, setPageState] = useState('welcome_message');

    const setApiSession = (apiTokenId) => {
        localStorage.setItem(STORAGE_APITOKEN, apiTokenId.api_token);
        // TODO
        //do i have projects already if userHasProjects setPageState=something
        setLogin(true);

        axios.get('https://my-react.local:3000/v1/profile', {
            headers: {Authorization: `Bearer ${localStorage.getItem(STORAGE_APITOKEN)}`}
        })
            .then(response => setUserProfile(response.data));
    };

    const refreshUserProfile = (newUserProfile) => {
        console.log(newUserProfile)
        setUserProfile(newUserProfile)
    }

    const logoutHandler = () => {
        localStorage.removeItem(STORAGE_APITOKEN);
        setPageState('');
        setLogin(false);
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

    return <AuthorizationContext.Provider value={{
        login: login,
        userProfile: userProfile,
        pageState: pageState,
        editProfileClickHandler: editProfileClickHandler,
        logoutHandler: logoutHandler,
        showProjectView: showProjectView,
        showWelcomePage: showWelcomePage,
        refreshUserProfile: refreshUserProfile,
        changePageState: changePageState,
        setApiSession: setApiSession,
        setPageState: setPageState
    }}>
        {props.children}
    </AuthorizationContext.Provider>
};

export default AuthorizationContext;