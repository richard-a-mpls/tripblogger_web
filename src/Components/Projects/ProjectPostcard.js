import classes from './ProjectPostcard.module.css';
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import DateConverter from "../UI/DateConverter";
import {useIsAuthenticated} from "@azure/msal-react";
import ProfileImage from "../UI/ProfileImage";
import ProjectPostcardModal from './ProjectPostcardModal';
import axios from "axios";
import {STORAGE_APITOKEN} from "../../store/auth-slice";
import {photosEndpoint} from "../../store/upload-slice";
import {prevProjectsEndpoint} from "../../store/project-slice";

const ProjectPostcard = (props) => {
    const [ownerInfo, setOwnerInfo] = useState({});
    const [showModal, setShowModal] = useState(false);
    const profile = useSelector(state => state.profileSlice.userProfile)
    const isAuthenticated = useIsAuthenticated();

    const clickHandler = () => {
        if (isAuthenticated) {
            setShowModal(true);
        } else {
            props.onClick();
        }
    }

    const closeModalHandler = () => {
        console.log("Close Handler: " + showModal);
        setShowModal("asdf");
    }

    const isOwner = profile._id === props.project.profile_id;

    useEffect(() => {
        if (isAuthenticated && !isOwner) {
            axios.get(`${prevProjectsEndpoint}/${props.project._id}/profile`,
                {headers: {Authorization: `Bearer ${localStorage.getItem(STORAGE_APITOKEN)}`}})
                .then((response) => {
                    setOwnerInfo(response.data);
                })
        }
    }, [isOwner, props.project._id, isAuthenticated]);

    let ownerProfile = <></>;
    if (isOwner) {
        ownerProfile = <><ProfileImage className={classes.profilePicSm}/>Your Project<br/></>
    } else {
        ownerProfile = <>
            {ownerInfo.profile_img &&
            <img alt="avatar" src={`${photosEndpoint}/${ownerInfo.profile_img}`} className={classes.profilePicSm}/>
            }
            {ownerInfo.profile_name}<br/>
        </>
    }

    return (
        <>
        {showModal === true &&
        <ProjectPostcardModal
            photos={props.project.photo_array}
            showcasePhoto={props.project.showcase_photo_id}
            showModal={showModal}
            closeHandler={closeModalHandler}/>}
        <div className={classes.postcard} onClick={clickHandler}>
            {isAuthenticated &&
            <div className={classes.headertitle}>
                <h6 className={classes.headertitle}>
                    {isAuthenticated && ownerProfile}
                </h6>
            </div>
            }
            <div className={classes.contenttop}>
                <img className={classes.stamp} alt="logo" src={`${photosEndpoint}/${props.project.showcase_photo_id}`}/>
            </div>
            <div className={classes.contentbottom}>
                <h6 className={classes.text}>{props.project.summary}</h6>
                <p className={classes.paragraph}>
                    {props.project.description} <DateConverter date={props.project.datestmp}/>
                </p>

            </div>
            <div className={classes.expandbar}>
                {props.project.photo_array.slice(0, 3).map((imageId) =>
                    <img className={classes.smallimg} alt={imageId} key={imageId}
                         src={`${photosEndpoint}/${imageId}`}/>
                )}
                {props.project.photo_array && props.project.photo_array.length > 3 &&
                <h6>+{props.project.photo_array.length - 3}</h6>
                }
            </div>
        </div>
        </>);
}

export default ProjectPostcard;