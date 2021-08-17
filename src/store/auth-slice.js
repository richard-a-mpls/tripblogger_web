import {createSlice} from "@reduxjs/toolkit";
import {setupProfile} from "./profile-slice";
import axios from "axios";

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
            state.loggedIn = false;
        },
        login(state) {
            state.loggedIn = true;
        }
    }
});

export const authorizeSession = () => {
    return async (dispatch) => {
        if (localStorage.getItem(STORAGE_APITOKEN)) {
            // verify the token by getting user profile
            try {
                await dispatch(setupProfile(localStorage.getItem(STORAGE_APITOKEN)));
                dispatch(authActions.login());
            } catch (error) {
                dispatch(authActions.logout());
            }
        } else {
            dispatch(authActions.logout());
        }
    }
}

export const authorizeFacebook = (fbAccessToken) => {
    return async (dispatch) => {
        await axios.post(
            "http://localhost:8080/v1/authorize",
            JSON.stringify({"identity_token": fbAccessToken}),
            {headers: {'Content-Type': 'application/json'}})
            .then(response => {
                console.log(response.data.api_token);
                dispatch(authActions.setApiToken(response.data.api_token));
            });
    }
}

export const authActions = authSlice.actions;

export default authSlice.reducer;