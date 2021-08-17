import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";

export const STORAGE_APITOKEN = 'apiToken';

const initialState = {
    apiToken: localStorage.getItem(STORAGE_APITOKEN),
    userProfile: '',
    loggedIn: 'pending'
};

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        setApiToken(state, action) {
            state.apiToken = action.payload;
        },
        logout(state) {
            state.userProfile = undefined;
            state.loggedIn = false;
        },
        login(state, action) {
            state.userProfile = action.payload;
            state.loggedIn = true;
        },
        updateProfile(state, action) {
            state.userProfile = action.payload;
        }
    }
});

export const setupProfile = (apiToken) => {
    return async (dispatch) => {
        try {
            if (!apiToken) {
                throw Error('no api token');
            }

            axios.get('https://my-react.local:3000/v1/profile', {
                headers: {Authorization: `Bearer ${apiToken}`}
            })
                .then(response => {
                    console.log(response.data);
                    if (!response.data) {
                        throw Error('profile data not returned');
                    }
                    dispatch(authActions.login(response.data));
                    localStorage.setItem(STORAGE_APITOKEN, apiToken);
                })
                .catch(error => {
                    console.log("Error here");
                    dispatch(authActions.logout());
                });
        } catch (error) {
            console.log("Log it out");
            dispatch(authActions.logout());
        }
    }
}

export const authActions = authSlice.actions;

export default authSlice.reducer;