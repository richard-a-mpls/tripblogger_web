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

export const authorizeB2C = (b2cAccessToken) => {
    return async (dispatch) => {
        await axios.post(
            "/v1/authorize",
            JSON.stringify({"identity_token": b2cAccessToken}),
            {headers: {'Content-Type': 'application/json'}})
            .then(response => {
                dispatch(authActions.setApiToken(response.data.api_token));
                dispatch(authorizeSession(response.data.api_token));
            });
    }
}

export const endSession = () => {
    return async (dispatch) => {
        axios.get('/v1/logout/?apiToken=' + localStorage.getItem(STORAGE_APITOKEN), {
            headers: {Authorization: `Bearer ${localStorage.getItem(STORAGE_APITOKEN)}`}
        })
            .then(() => {
                dispatch(authActions.logout());
            })
    };
};

export const authActions = authSlice.actions;

export default authSlice.reducer;