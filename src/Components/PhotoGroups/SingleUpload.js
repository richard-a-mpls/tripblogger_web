import FormData from "form-data";
import axios from "axios";
import {STORAGE_APITOKEN} from "../../store/constants";
import React, {useState} from "react";
import {photosEndpoint} from "../../store/upload-slice";

import classes from './PhotoGroups.module.css';

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
        <img className={classes.showcasephoto} alt="showcase"
             src={`${photosEndpoint}/${tmpPhotoId}`}/>
        }

        {!uploadingTmpPhoto && !tmpPhotoId && !props.photoId &&
        <div className={classes.singleupload}>
            <label htmlFor="file" className={classes.inputfile}>
                <span><i className={`${classes.showcase} fas fa-image`}/></span>
                <span>+ Add Photo</span>
            </label>
            <input id="file" style={{display: "none"}} type="file"
                   onChange={setPhotoDataHandler}/>
        </div>}
        {uploadingTmpPhoto &&
        <img className={classes.showcasephoto} alt="showcase"
             src={"/spin.gif"}/>
        }
        {!tmpPhotoId && props.photoId &&
        <img className={classes.showcasephoto} alt="showcase"
             src={`${photosEndpoint}/${props.photoId}`}/>
        }
    </>);

}

export default SingleUpload;