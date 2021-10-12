import Modal from "../UI/Modal";
import classes from "./ProjectPostcard.module.css";
import {photosEndpoint} from "../../store/upload-slice";
import React, {useState} from "react";

const ProjectPostcardModal = (props) => {
    const photoArray = props.photos;

    const [photoIndex, setPhotoIndex] = useState(-1);
    const [photoUrl, setPhotoUrl] = useState(`${photosEndpoint}/${props.showcasePhoto}`);

    const nextPhoto = () => {
        swapPhoto(1);
    }

    const prevPhoto = () => {
        swapPhoto(-1);
    }

    const swapPhoto = (increment) => {
        let idx = photoIndex;
        if (idx + increment < -1) {
            idx = photoArray.length - 1;
        } else if (idx + increment >= photoArray.length) {
            idx = -1;
        } else {
            idx += increment;
        }
        setPhotoIndex(idx);
        resolvePhotoUrl(idx);
    }

    const resolvePhotoUrl = (idx) => {
        if (idx === -1) {
            setPhotoUrl(`${photosEndpoint}/${props.showcasePhoto}`);
        } else {
            setPhotoUrl(`${photosEndpoint}/${photoArray[idx]}`);
        }
    }


    return (
        <Modal onClose={props.closeHandler}>
            <div style={{textAlign: "center"}}>
                <div>
                    <i onClick={prevPhoto} className={`${classes.modalnav} fas fa-arrow-left`}/>
                    <i onClick={props.closeHandler} className={`${classes.modalnav} fas fa-times`}/>
                    <i onClick={nextPhoto} className={`${classes.modalnav} fas fa-arrow-right`}/>
                </div>
                <img onClick={nextPhoto} className={classes.large} alt={photoIndex}
                     src={photoUrl}/>
            </div>
        </Modal>
    );
}

export default ProjectPostcardModal;