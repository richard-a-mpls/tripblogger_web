import styles from './ProjectPostcard.module.css';
import React, {useState} from "react";
import {useSelector} from "react-redux";
import DateConverter from "../UI/DateConverter";
import {useIsAuthenticated} from "@azure/msal-react";
import ProfileImage from "../UI/ProfileImage";


const ProjectPostcard = (props) => {
    const [imagesExpaneded, setImagesExpanded] = useState(false);
    const profile = useSelector(state => state.profileSlice.userProfile)
    const isAuthenticated = useIsAuthenticated();

    const toggleImagesExpaneded = () => {
        setImagesExpanded(state => !state);
    }

    let ownerProfile = <i className="fas fa-users" style={{marginRight: "5px"}}/>;
    if (profile._id === props.project.profile_id) {
        ownerProfile = <ProfileImage className="profilePicSm"/>
    }

    return (<>
        <div className={styles.postcard} onClick={props.onClick}>
            <div className={styles.headertitle}>
                <h6 className={styles.headertitle}>
                    {isAuthenticated && ownerProfile}
                    <DateConverter date={props.project.datestmp}/>
                </h6>
            </div>
            <div className={styles.contenttop}>
                <img className={styles.stamp} alt="logo" src={`/v1/photos/${props.project.showcase_photo_id}`}/>
            </div>
            <div className={styles.contentbottom}>
                <h6 className={styles.text}>{props.project.summary}</h6>
                <p className={styles.paragraph}>
                    {props.project.description}<br/>
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
                )} <h6>+{props.project.photo_array.length-3}</h6>
            </div>
        </div>
    </>);
}

export default ProjectPostcard;