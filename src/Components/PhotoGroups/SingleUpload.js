import FormData from "form-data";
import axios from "axios";
import {STORAGE_APITOKEN} from "../../store/constants";
import React, {useState} from "react";
import {photosEndpoint} from "../../store/upload-slice";

const SingleUpload = (props) => {

    const [tmpPhotoId, setTmpPhotoId] = useState();
    const [uploadingTmpPhoto, setUploadingTmpPhoto] = useState(false);

    const setPhotoDataHandler = (event) => {
        setUploadingTmpPhoto(true);
        const formData = new FormData();
        formData.append('file', event.target.files[0]);
        axios.post(photosEndpoint, formData,
            {
                headers: {
                    'Content-Type': "multipart/form-data; boundary=--------------------------a string of numbers that is never the same",
                    'Authorization': 'Bearer ' + localStorage.getItem(STORAGE_APITOKEN)
                }
            })
            .then(response => {
                props.updateData(response.data.id);
                setTmpPhotoId(response.data.id);
                setUploadingTmpPhoto(false);
            });
    }

    return (<>
        {tmpPhotoId &&
        <img alt="showcase"
             src={`${photosEndpoint}/${tmpPhotoId}`}/>
        }

        {!uploadingTmpPhoto && !tmpPhotoId && !props.photoId &&
        <div className="wb-form-control addphoto" style={{
            marginTop: '5px',
            display: "inline-block",
            textAlign: "center",
            backgroundColor: "#26567b",
            borderRadius: '16px'
        }}>
            <label htmlFor="file" className="inputfile">
                <span style={{display: "block"}}><i className="showcase fas fa-image"/></span>
                <span style={{display: "block", color: "#ffffff"}}>+ Add Photo</span>
            </label>
            <input id="file" className="inputfile" type="file"
                   onChange={setPhotoDataHandler}/>
        </div>}
        {uploadingTmpPhoto &&
        <img alt="showcase"
             src={"/spin.gif"}/>
        }
        {!tmpPhotoId && props.photoId &&
        <img alt="showcase"
             src={`${photosEndpoint}/${props.photoId}`}/>
        }
    </>);

}

export default SingleUpload;