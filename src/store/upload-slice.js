import FormData from "form-data";
import axios from "axios";
import {STORAGE_APITOKEN} from "./constants";

export const photosEndpoint = (process.env.REACT_APP_PYTHON_API || "https://tripblogger-api.azurewebsites.net") + "/v1/photos";
export const prevMeProjectsEndpoint = (process.env.REACT_APP_PYTHON_API || "https://tripblogger-api.azurewebsites.net") + "/v1/me/projects";

const uploadData = (projectId, data, setUrlCallback) => {
    return () => {
        const formData = new FormData();
        console.log("uploading data");
        formData.append('file', data);
        axios.post(`${prevMeProjectsEndpoint}/${projectId}/photos`, formData,
            {
                headers: {
                    'Content-Type': "multipart/form-data; boundary=--------------------------a string of numbers that is never the same",
                    'Authorization': 'Bearer ' + localStorage.getItem(STORAGE_APITOKEN)
                }
            })
            .then(response => {
                console.log(response.data.id);
                setUrlCallback(`${photosEndpoint}/${response.data.id}`);
            });
    }
}

export default uploadData;