import FormData from "form-data";
import axios from "axios";
import {STORAGE_APITOKEN} from "./constants";

const uploadData = (projectId, data, setUrlCallback) => {
    return () => {
        const formData = new FormData();
        console.log("uploading data");
        formData.append('file', data);
        axios.post(`${process.env.REACT_APP_PROJECTS_API}/v1/me/projects/${projectId}/photos`, formData,
            {
                headers: {
                    'Content-Type': "multipart/form-data; boundary=--------------------------a string of numbers that is never the same",
                    'Authorization': 'Bearer ' + localStorage.getItem(STORAGE_APITOKEN)
                }
            })
            .then(response => {
                console.log(response.data.id);
                setUrlCallback(`${process.env.REACT_APP_PYTHON_API}/v1/photos/` + response.data.id);
            });
    }
}

export default uploadData;