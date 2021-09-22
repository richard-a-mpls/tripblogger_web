import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import uploadData from "../../store/upload-slice";
import classes from "./PhotoGroups.module.css";

const ImageUpload = (props) => {
    const dispatch = useDispatch();
    const [imageUrl, setImageUrl] = useState("/spin.gif");

    useEffect(() => {
        dispatch(uploadData(props.projectId, props.data, setImageUrl));
    }, [dispatch, props.data, props.projectId]);


    return (
        <img className={classes.projectphoto} alt="showcase" src={imageUrl}/>
    );
}
export default ImageUpload;