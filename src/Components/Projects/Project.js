import ProjectDay from "./ProjectDay";
import ShareStatus from "./ShareStatus";
import ProjectActionButtons from "./ProjectActionButtons";
import axios from "axios";
import React, {useState} from "react";
import {STORAGE_APITOKEN} from "../../Context/authorization_context";
import Input from "../UI/Input";
import FormData from "form-data";
import UploadGroup from "../PhotoGroups/UploadGroup";

const Project = (props) => {
    const [editing, setEditing] = useState(false);
    const [updateData, setUpdateData] = useState({});
    const [showAudience, setShowAudience] = useState();

    const [tmpPhotoId, setTmpPhotoId] = useState();
    const [uploadingTmpPhoto, setUploadingTmpPhoto] = useState(false);

    let date = new Date();
    if (props.project.datestmp !== undefined) {
        date = new Date(props.project.datestmp.split("-"));
    }
    const month = date.toLocaleString('en-US', {month: 'long'});
    const day = date.toLocaleString('en-US', {day: '2-digit'});
    const year = date.getFullYear();

    const shareWithOptions = [
        {value: "private", label: "Only Me"},
        {value: "connections", label: "My Connections"},
        {value: "public", label: "Everyone"}
    ];

    const deleteHandler = (event) => {
        axios.delete('https://my-react.local:3000/v1/me/projects/' + props.project._id,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem(STORAGE_APITOKEN)
                }
            })
            .then(response => console.log(response.data));
        props.removeProject(props.project._id);
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
        axios.patch('http://localhost:8080/v1/me/projects/' + props.project._id, JSON.stringify(updateData), { // receive two parameter endpoint url ,form data
            headers: {Authorization: `Bearer ${localStorage.getItem(STORAGE_APITOKEN)}`, 'Content-Type': 'application/json',}
        })
            .then(response => {
                props.resetProject(response.data);
                props.updateProjectList(response.data);
            });
    }

    const submitCreate = () => {
        console.log("POST");
        console.log(updateData);
        axios.post('http://localhost:8080/v1/me/projects', JSON.stringify(updateData), { // receive two parameter endpoint url ,form data
            headers: {Authorization: `Bearer ${localStorage.getItem(STORAGE_APITOKEN)}`, 'Content-Type': 'application/json',}
        })
            .then(response => {
                props.resetProject(response.data);
                props.updateProjectList(response.data);
            });
    }

    const setPhotoDataHandler = (event) => {
        setUploadingTmpPhoto(true);
        const formData = new FormData();
        formData.append('file', event.target.files[0]);
        axios.post('http://localhost:8080/v1/photos', formData,
            {
                headers: {
                    'Content-Type': "multipart/form-data; boundary=--------------------------a string of numbers that is never the same",
                    'Authorization': 'Bearer ' + localStorage.getItem(STORAGE_APITOKEN)
                }
            })
            .then(response => {
                updateData['showcase_photo_id'] = response.data.id;
                setTmpPhotoId(response.data.id);
                setUploadingTmpPhoto(false);
            });
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

    const dateDisplay = month + " " + day + " " + year;
    const allowEdit = editing || props.view === "create";

    return (
        <main>
            <header className='wb-form-control'>
                <Input placeholder="summary" editing={allowEdit} attribute="summary" value={props.project.summary}
                       className='wb-form-control summary' onUpdate={updateDataHandler}/>
                <ProjectActionButtons
                    editable={props.view === "edit"}
                    projectId={props.project._id}
                    editProjectHandler={props.editProjectHandler}
                    onSetEdit={setEditingHandler}
                    onCancelEdit={cancelEditingHandler}
                    onSubmit={submitHandler}
                    editing={allowEdit}
                    view={props.view}
                    deleteHandler={deleteHandler}/>
            </header>
            <div className="content">

                {tmpPhotoId &&
                <img alt="showcase"
                     src={"https://my-react.local:3000/v1/photos/" + tmpPhotoId}/>
                }

                {!uploadingTmpPhoto && !tmpPhotoId && !props.project.showcase_photo_id &&
                <div className="wb-form-control addphoto" style={{
                    marginTop: '5px',
                    display: "inline-block",
                    textAlign: "center",
                    backgroundColor: "#26567b",
                    borderRadius: '16px'
                }}>
                    <label htmlFor="file" className="inputfile">
                        <span style={{display: "block"}}><i className="showcase fas fa-image"/></span>
                        <span style={{display: "block", color: "#ffffff"}}>+ Add Photo</span>
                    </label>
                    <input id="file" className="inputfile" type="file"
                           onChange={setPhotoDataHandler}/>
                </div>}
                {uploadingTmpPhoto &&
                <img alt="showcase"
                     src={"/spin.gif"}/>
                }
                {!tmpPhotoId && props.project.showcase_photo_id &&
                <img alt="showcase"
                     src={"https://my-react.local:3000/v1/photos/" + props.project.showcase_photo_id}/>
                }


                <div className="project-details">
                    <Input placeholder="location" editing={allowEdit} attribute="location"
                           value={props.project.location} onUpdate={updateDataHandler}/>
                    <Input type={"date"} editing={allowEdit} attribute="datestmp" value={dateDisplay}
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
                    {props.project.photo_array.map((imageId) =>
                        <img alt={imageId} style={{margin: "2px"}} key={imageId}
                             src={`https://my-react.local:3000/v1/photos/${imageId}`}/>
                    )}
                    <UploadGroup projectId={props.project._id} photoArray={props.project.photo_array}/>
                </div>
                }
            </div>

        </main>

    );
}

export default Project;