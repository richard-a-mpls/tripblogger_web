import {createSlice} from "@reduxjs/toolkit";
import {setupProfile} from "./profile-slice";

export const STORAGE_APITOKEN = 'apiToken';

const initialState = {
    apiToken: localStorage.getItem(STORAGE_APITOKEN),
    loggedIn: 'pending'
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setApiToken(state, action) {
            localStorage.setItem(STORAGE_APITOKEN, action.payload);
            state.apiToken = action.payload;
        },
        logout(state) {
            localStorage.removeItem(STORAGE_APITOKEN);
            state.apiToken = null;
            state.loggedIn = 'pending';
        },
        login(state, action) {
            state.loggedIn = action.payload;
        }
    }
});

export const authorizeSession = (apiToken) => {
    return async (dispatch) => {
        if (!apiToken) {
            apiToken = localStorage.getItem(STORAGE_APITOKEN);
        }

        dispatch(authActions.login('authorizing'))
        if (apiToken) {
            // verify the token by getting user profile
            try {
                await dispatch(setupProfile(apiToken));
                dispatch(authActions.login('complete'));
                dispatch(authActions.setApiToken(apiToken));
            } catch (error) {
                console.log(error);
                localStorage.removeItem(STORAGE_APITOKEN);
                dispatch(authActions.logout());
            }
        } else {
            dispatch(authActions.logout());
        }
    }
}

export const endSession = () => {
    return async (dispatch) => {
        dispatch(authActions.logout());
    };
};

export const authActions = authSlice.actions;

export default authSlice.reducer;