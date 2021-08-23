import {STORAGE_APITOKEN} from "../Context/authorization_context";
import axios from "axios";
import {authActions} from "./auth-slice";
import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    userProfile: {}
};

const profileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        updateProfile(state, action) {
            state.userProfile = action.payload;
        }
    }
});

export const setupProfile = (apiToken) => {
    return async (dispatch) => {
        try {
            axios.get('https://my-react.local:3000/v1/profile', {
                headers: {Authorization: `Bearer ${apiToken}`}
            })
                .then(response => {
                    console.log(response.data);
                    if (!response.data) {
                        throw Error('profile data not returned');
                    }
                    dispatch(profileActions.updateProfile(response.data));
                })
                .catch(error => {
                    console.log(error);
                    dispatch(authActions.logout());
                });
        } catch (error) {
            console.log("Log it out");
            throw error;
        }
    }
}


export const updateProfile = (userProfileId, updateData) => {
    return async (dispatch) => {
        axios.patch('http://localhost:8080/v1/profile/' + userProfileId,
            JSON.stringify(updateData), {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem(STORAGE_APITOKEN)}`,
                    'Content-Type': 'application/json'
                }
            })
            .then(response => {
                dispatch(profileActions.updateProfile(response.data));
            })
    }
}

export const profileActions = profileSlice.actions;

export default profileSlice.reducer;