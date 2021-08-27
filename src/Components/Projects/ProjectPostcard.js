import styles from './ProjectPostcard.module.css';
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import DateConverter from "../UI/DateConverter";
import {useIsAuthenticated} from "@azure/msal-react";
import ProfileImage from "../UI/ProfileImage";
import axios from "axios";
import {STORAGE_APITOKEN} from "../../store/auth-slice";

const ProjectPostcard = (props) => {
    const [imagesExpaneded, setImagesExpanded] = useState(false);
    const [ownerInfo, setOwnerInfo] = useState({});
    const profile = useSelector(state => state.profileSlice.userProfile)
    const isAuthenticated = useIsAuthenticated();

    const toggleImagesExpaneded = () => {
        setImagesExpanded(state => !state);
    }

    const isOwner = profile._id === props.project.profile_id;

    useEffect(() => {
        console.log('useEffect');
        if (!isOwner) {
            axios.get('/v1/projects/' + props.project._id + '/profile',
                {headers: {Authorization: `Bearer ${localStorage.getItem(STORAGE_APITOKEN)}`}})
                .then((response) => {
                    console.log(response.data);
                    setOwnerInfo(response.data);
                })
        }
    }, [isOwner, props.project._id]);

    let ownerProfile = <></>;
    if (isOwner) {
        ownerProfile = <><ProfileImage className="profilePicSm"/>Your Project<br/></>
    } else {
        ownerProfile = <>
            <img alt="avatar" src={`/v1/photos/${ownerInfo.profile_img}`} className="profilePicSm"/>
            {ownerInfo.profile_name}<br/>
        </>
    }

    return (<>
        <div className={styles.postcard} onClick={props.onClick}>
            {isAuthenticated &&
            <div className={styles.headertitle}>
                <h6 className={styles.headertitle}>
                    {isAuthenticated && ownerProfile}
                </h6>
            </div>
            }
            <div className={styles.contenttop}>
                <img className={styles.stamp} alt="logo" src={`/v1/photos/${props.project.showcase_photo_id}`}/>
            </div>
            <div className={styles.contentbottom}>
                <h6 className={styles.text}>{props.project.summary}</h6>
                <p className={styles.paragraph}>
                    {props.project.description} <DateConverter date={props.project.datestmp}/>
                </p>

            </div>
            {imagesExpaneded && <div className={styles.imagegroup}>
                {props.project.photo_array.map((imageId) =>
                    <img className={styles.projectimage} alt={imageId} key={imageId}
                         src={`https://my-react.local:3000/v1/photos/${imageId}`}/>
                )}
            </div>}
            <div onClick={toggleImagesExpaneded} className={styles.expandbar}>
                {props.project.photo_array.slice(0, 3).map((imageId) =>
                    <img className={styles.smallimg} alt={imageId} key={imageId}
                         src={`https://my-react.local:3000/v1/photos/${imageId}`}/>
                )}
                {props.project.photo_array && props.project.photo_array.length > 3 &&
                <h6>+{props.project.photo_array.length - 3}</h6>
                }
            </div>
        </div>
    </>);
}

export default ProjectPostcard;