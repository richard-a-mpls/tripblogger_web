import FormData from "form-data";
import axios from "axios";
import {STORAGE_APITOKEN} from "../Context/authorization_context";

const uploadData = (projectId, data, setUrlCallback) => {
    return () => {
        const formData = new FormData();
        console.log("uploading data");
        formData.append('file', data);
        axios.post(`http://localhost:8080/v1/me/projects/${projectId}/photos`, formData,
            {
                headers: {
                    'Content-Type': "multipart/form-data; boundary=--------------------------a string of numbers that is never the same",
                    'Authorization': 'Bearer ' + localStorage.getItem(STORAGE_APITOKEN)
                }
            })
            .then(response => {
                console.log(response.data.id);
                setUrlCallback("https://my-react.local:3000/v1/photos/" + response.data.id);
            });
    }
}

export default uploadData;