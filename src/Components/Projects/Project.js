import ProjectDay from "./ProjectDay";
import ShareStatus from "./ShareStatus";
import ProjectActionButtons from "./ProjectActionButtons";
import React, {useState} from "react";
import Input from "../UI/Input";
import UploadGroup from "../PhotoGroups/UploadGroup";
import {useDispatch} from "react-redux";
import {createProject, removeProject, updateProject} from "../../store/project-slice";
import styles from './Project.module.css';
import SingleUpload from "../PhotoGroups/SingleUpload";

const Project = (props) => {
    const dispatch = useDispatch();
    const [editing, setEditing] = useState(false);
    const [updateData, setUpdateData] = useState({});
    const [showAudience, setShowAudience] = useState();

    // const [tmpPhotoId, setTmpPhotoId] = useState();
    // const [uploadingTmpPhoto, setUploadingTmpPhoto] = useState(false);

    let date = new Date();
    if (props.project.datestmp !== undefined) {
        date = new Date(props.project.datestmp.split("-"));
    }
    const month = date.toLocaleString('en-US', {month: 'long'});
    const day = date.toLocaleString('en-US', {day: '2-digit'});
    const year = date.getFullYear();
    const dateDisplay = month + " " + day + " " + year;

    const formatDate = (date) => {
        var d = new Date(date),
            month = '' + (d.getMonth() + 1),
            day = '' + d.getDate(),
            year = d.getFullYear();

        if (month.length < 2)
            month = '0' + month;
        if (day.length < 2)
            day = '0' + day;

        return [year, month, day].join('-');
    }

    const dateInput = formatDate(date);

    const shareWithOptions = [
        {value: "private", label: "Only Me"},
        //{value: "connections", label: "My Connections"},
        {value: "public", label: "Everyone"}
    ];

    const deleteHandler = () => {
        dispatch(removeProject(props.project._id));
        props.viewProjectsHandler();
    }

    const updateDataHandler = (attribute, value) => {
        setUpdateData(prevState => {
            const tmpState = prevState;
            tmpState[attribute] = value;
            return tmpState;
        });
    }

    const submitHandler = () => {
        if (props.project._id) {
            submitEdit();
        } else {
            submitCreate();
        }
        setUpdateData({});
        setEditing(false);
    }

    const submitEdit = () => {
        dispatch(updateProject(props.project._id, updateData));
    }

    const submitCreate = () => {
        dispatch(createProject(updateData));
        props.onPostCreate();
    }

    const updatePhotoId = (id) => {
        updateData['showcase_photo_id'] = id;
    }

    const setEditingHandler = () => {
        setEditing(true);
    }
    const cancelEditingHandler = () => {
        setEditing(false);
    }

    const toggleShowAudienceHandler = (value) => {
        setShowAudience(value);
    }

    const allowEdit = editing || props.view === "create";

    return (
        <main>
            <div className={styles.projectHeader}>
                <Input placeholder="summary" editing={allowEdit} attribute="summary" value={props.project.summary}
                       className="summary" onUpdate={updateDataHandler}/>
                <div className={styles.actionButtons}>
                    <ProjectActionButtons
                        editable={props.view === "edit"}
                        projectId={props.project._id}
                        editProjectHandler={props.editProjectHandler}
                        viewProjectsHandler={props.viewProjectsHandler}
                        onSetEdit={setEditingHandler}
                        onCancelEdit={cancelEditingHandler}
                        onSubmit={submitHandler}
                        editing={allowEdit}
                        view={props.view}
                        deleteHandler={deleteHandler}/>
                </div>
            </div>
            <div className='content'>
                <SingleUpload updateData={updatePhotoId} photoId={props.project.showcase_photo_id}/>

                <div className="project-details">
                    <Input placeholder="location" editing={allowEdit} attribute="location"
                           value={props.project.location} onUpdate={updateDataHandler}/>
                    <Input type="date" editing={allowEdit} attribute="datestmp" value={dateDisplay}
                           dateValue={dateInput}
                           onUpdate={updateDataHandler}/>
                    <Input placeholder="description" editing={allowEdit} attribute="description"
                           value={props.project.description} onUpdate={updateDataHandler}/><br/>
                    {!editing && <ShareStatus project={props.project}/>}
                    {editing &&
                    <Input type="slider" attribute="published" value={props.project.published}
                           onUpdate={updateDataHandler} onUpdate2={toggleShowAudienceHandler}/>
                    }
                    {editing && ((!props.project.published && showAudience) || (props.project.published && showAudience !== false)) &&
                    <Input type="button-selector" label="Audience:" attribute="share_with"
                           value={props.project.share_with} options={shareWithOptions} onUpdate={updateDataHandler}/>
                    }
                </div>
                <br/><br/>
                {props.view === "edit" && props.project.project_days !== undefined && props.project.project_days.map((projectDay) => (
                    <ProjectDay projectDay={projectDay}/>
                ))}
                {!editing && props.project.photo_array &&
                <div>
                    {props.view !== 'list' && props.project.photo_array.map((imageId) =>
                        <img alt={imageId} style={{margin: "2px"}} key={imageId}
                             src={`https://my-react.local:3000/v1/photos/${imageId}`}/>
                    )}
                    {props.view !== 'list' &&
                    <UploadGroup projectId={props.project._id} photoArray={props.project.photo_array}/>
                    }
                </div>
                }
            </div>

        </main>

    );
}

export default Project;