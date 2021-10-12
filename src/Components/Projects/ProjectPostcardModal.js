import Modal from "../UI/Modal";
import classes from "./ProjectPostcard.module.css";
import {photosEndpoint} from "../../store/upload-slice";
import React, {useState} from "react";

const ProjectPostcardModal = (props) => {
    const photoArray = props.photos;

    const [photoIndex, setPhotoIndex] = useState(-1);

    const nextPhoto = () => {
        if (photoIndex + 1 < photoArray.length) {
            setPhotoIndex(photoIndex + 1);
        } else {
            setPhotoIndex(-1);
        }
    }

    const prevPhoto = () => {
        if (photoIndex - 1 < -1) {
            setPhotoIndex(photoArray.length - 1);
        } else {
            setPhotoIndex(photoIndex - 1);
        }
    }


    return (
        <Modal onClose={props.closeHandler}>
            <div style={{textAlign: "center", paddingTop: "10px"}}>
                <i onClick={props.closeHandler} className={`${classes.modalnav} ${classes.closemodal} fas fa-times`}/>
                <i onClick={nextPhoto} className={`${classes.modalnav} ${classes.moveright} fas fa-arrow-right`}/>
                <i onClick={prevPhoto} className={`${classes.modalnav} ${classes.moveleft} fas fa-arrow-left`}/>
                {photoIndex >= 0 && <img onClick={nextPhoto} className={classes.large} alt={photoIndex}
                     src={`${photosEndpoint}/${photoArray[photoIndex]}`}/>}
                {photoIndex === -1 && <img onClick={nextPhoto} className={classes.large} alt={photoIndex}
                                        src={`${photosEndpoint}/${props.showcasePhoto}`}/>}
            </div>
        </Modal>
    );
}

export default ProjectPostcardModal;