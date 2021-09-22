import ShareStatus from "./ShareStatus";
import ProjectActionButtons from "./ProjectActionButtons";
import React, {useState} from "react";
import Input from "../UI/Input";
import UploadGroup from "../PhotoGroups/UploadGroup";
import {useDispatch} from "react-redux";
import {createProject, removeProject, updateProject} from "../../store/project-slice";
import classes from './Project.module.css';
import SingleUpload from "../PhotoGroups/SingleUpload";
import {photosEndpoint} from "../../store/upload-slice";

const Project = (props) => {
    const dispatch = useDispatch();
    const [editing, setEditing] = useState(false);
    const [updateData, setUpdateData] = useState({});
    const setShowAudience = useState()[1];

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
        <>
            <div className={classes.projectHeader}>
                <Input placeholder="summary" editing={allowEdit} attribute="summary" value={props.project.summary}
                       className="summary" onUpdate={updateDataHandler}/>
                <div className={classes.actionButtons}>
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
                </div>
                <br/><br/>
                {!editing && props.project.photo_array &&
                <div>
                    {props.view !== 'list' && props.project.photo_array.map((imageId) =>
                        <img className={classes.projectphoto} alt={imageId} style={{margin: "2px"}} key={imageId}
                             src={`${photosEndpoint}/${imageId}`}/>
                    )}
                    {props.view !== 'list' &&
                    <UploadGroup projectId={props.project._id} photoArray={props.project.photo_array}/>
                    }
                </div>
                }
            </div>

        </>

    );
}

export default Project;