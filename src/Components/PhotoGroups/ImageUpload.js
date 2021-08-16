import React, {useState, useEffect} from "react";
import FormData from "form-data";
import axios from "axios";
import {STORAGE_APITOKEN} from "../../Context/authorization_context";

const ImageUpload = (props) => {

    const [imageUrl, setImageUrl] = useState("/spin.gif");

    useEffect(() => {
        setImageUrl("/spin.gif");
        const formData = new FormData();
        console.log("uploading data");
        formData.append('file', props.data);
        axios.post(`http://localhost:8080/v1/me/projects/${props.projectId}/photos`, formData,
            {
                headers: {
                    'Content-Type': "multipart/form-data; boundary=--------------------------a string of numbers that is never the same",
                    'Authorization': 'Bearer ' + localStorage.getItem(STORAGE_APITOKEN)
                }
            })
            .then(response => {
                console.log(response.data.id);
                setImageUrl("https://my-react.local:3000/v1/photos/" + response.data.id);
            });
    }, [props.data, props.projectId]);


    return (
        <img style={{marginTop: "0px"}} alt="showcase" src={imageUrl}/>
    );
}
export default ImageUpload;