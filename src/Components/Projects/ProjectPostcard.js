import styles from './ProjectPostcard.module.css';
import React, {useState} from "react";
import DateConverter from "../UI/DateConverter";


const ProjectPostcard = (props) => {
    const [imagesExpaneded, setImagesExpanded] = useState(false);

    const toggleImagesExpaneded = () => {
        setImagesExpanded(state => !state);
    }

    return (<>
        <div className={styles.postcard} onClick={props.onClick}>
            <div className={styles.contenttop}>
                <img className={styles.stamp} alt="logo" src={`/v1/photos/${props.project.showcase_photo_id}`}/>
            </div>
            <div className={styles.contentbottom}>
                <h6 className={styles.text}>{props.project.summary}</h6>
                <p className={styles.paragraph}>
                    {props.project.description}<br/>
                    <h6><DateConverter date={props.project.datestmp}/></h6>
                </p>
            </div>
            {imagesExpaneded && <div className={styles.imagegroup}>
                {props.project.photo_array.map((imageId) =>
                    <img className={styles.projectimage} alt={imageId} key={imageId}
                         src={`https://my-react.local:3000/v1/photos/${imageId}`}/>
                )}
            </div>}
            <div onClick={toggleImagesExpaneded} className={styles.expandbar}>
                {props.project.photo_array.map((imageId) =>
                    <img className={styles.smallimg} alt={imageId} key={imageId}
                         src={`https://my-react.local:3000/v1/photos/${imageId}`}/>
                )}
            </div>
        </div>
    </>);
}

export default ProjectPostcard;