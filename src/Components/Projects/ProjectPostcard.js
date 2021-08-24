import styles from './ProjectPostcard.module.css';
import React from "react";
import DateConverter from "../UI/DateConverter";


const ProjectPostcard = (props) => {

    return (<>
        <div className={styles.postcard} onClick={props.onClick}>
            <div className={styles.contentleft}>
                <img className={styles.stamp} alt="logo" src={`/v1/photos/${props.project.showcase_photo_id}`}/>
            </div>
            <div className={styles.contentright}>
                <h6 className={styles.text}>{props.project.summary}</h6>
                <p className={styles.paragraph}>
                    {props.project.description}
                </p>
                <h6 className={styles.text}><DateConverter date={props.project.datestmp}/></h6>
            </div>
        </div>
    </>);
}

export default ProjectPostcard;