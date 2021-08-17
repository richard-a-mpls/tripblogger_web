import {STORAGE_APITOKEN} from "../Context/authorization_context";
import axios from "axios";
import {authActions} from "./auth-slice";

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
                dispatch(authActions.updateProfile(response.data));
            })
    }
}