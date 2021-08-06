import React, {useState} from "react";
import axios from "axios";

const AuthorizationContext = React.createContext({
    apiToken: '',
    login: false,
    userProfile: '',
    fbPicture: undefined,
    pageState: 'welcome_message',
    editProfileClickHandler: () => {},
    logoutHandler: () => {},
    showProjectView: () => {},
    showWelcomePage: () => {},
    refreshUserProfile: () => {},
    changePageState: () => {},
    setApiSession: () => {},
    setPageState: () => {},
    setFbInfo: () => {}
});

export const AuthorizationContextProvider = (props) => {
    const [apiToken, setApiToken] = useState('');
    const [login, setLogin] = useState(false);
    const [userProfile, setUserProfile] = useState('');
    const [pageState, setPageState] = useState('welcome_message');
    const [fbPicture, setFbPicture] = useState('');

    const setFbInfo = (dataReturned, pictureReturned) => {
        setFbPicture(pictureReturned);
    };

    const setApiSession = (apiTokenId) => {
        console.log(apiTokenId.api_token);
        setApiToken(apiTokenId.api_token);
        // TODO
        //do i have projects already if userHasProjects setPageState=something
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
        apiToken: apiToken,
        login: login,
        userProfile: userProfile,
        pageState: pageState,
        fbPicture: fbPicture,
        editProfileClickHandler: editProfileClickHandler,
        logoutHandler: logoutHandler,
        showProjectView: showProjectView,
        showWelcomePage: showWelcomePage,
        refreshUserProfile: refreshUserProfile,
        changePageState: changePageState,
        setApiSession: setApiSession,
        setPageState: setPageState,
        setFbInfo: setFbInfo
    }}>
        {props.children}
    </AuthorizationContext.Provider>
};

export default AuthorizationContext;