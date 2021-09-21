import React, {useState} from "react";
import ImageUpload from "./ImageUpload";

import classes from './PhotoGroups.module.css';

const UploadGroup = (props) => {

    const [imageData, setImageData] = useState([]);

    const setPhotoDataHandler = (event) => {

        const tmpArray = [];
        for (let counter = 0; counter < event.target.files.length; counter++) {
            tmpArray.push({key: counter, data: event.target.files[counter]});
        }
        setImageData(tmpArray);
    }

    return (
        <>
            {imageData.map((data) =>
                <div className={classes.singleupload}>
                    <ImageUpload key={data.key} projectId={props.projectId} data={data.data}/>
                </div>
            )}
            <div className={classes.singleupload}>
                <label htmlFor="file" className={classes.inputfile}>
                    <span><i className={`${classes.showcase} fas fa-image`}/></span>
                    <span>+ Add Photos</span>
                </label>
                <input id="file" style={{display: "none"}} type="file" multiple="multiple"
                       onChange={setPhotoDataHandler}/>

            </div>

        </>
    );
}
export default UploadGroup;