import ProjectDay from "./ProjectDay";
import ShareStatus from "./ShareStatus";
import ProjectActionButtons from "./ProjectActionButtons";
import axios from "axios";
import React, {useContext, useState} from "react";
import AuthorizationContext from "../../Context/authorization_context";
import Input from "../UI/Input";

const Project = (props) => {
    const [editing, setEditing] = useState(false);
    const [updateData, setUpdateData] = useState({});
    const [showAudience, setShowAudience] = useState();
    const authCtx = useContext(AuthorizationContext);

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
                    'Authorization': 'Bearer ' + authCtx.apiToken
                }
            })
            .then(response => console.log(response.data));
        props.removeProject(props.project._id);
    }

    const updateDataHandler = (attribute, value) => {
        setUpdateData(prevState => {
            const tmpState = prevState;
            tmpState[attribute] = value;
            console.log(tmpState);
            console.log(tmpState.published);
            return tmpState;
        });
    }

    const submitEditHandler = () => {
        console.log(updateData);

        axios.patch('http://localhost:8080/v1/me/projects/' + props.project._id, JSON.stringify(updateData), { // receive two parameter endpoint url ,form data
            headers: {Authorization: `Bearer ${authCtx.apiToken}`, 'Content-Type': 'application/json',}
        })
            .then(response => {
                props.resetProject(response.data);
                props.updateProjectList(response.data);
            });
        setUpdateData({});
        setEditing(false);
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


    return (
        <main>
            <header className='wb-form-control'>
                <Input editing={editing} attribute="summary" value={props.project.summary}
                       className='wb-form-control summary' onUpdate={updateDataHandler}/>
                <ProjectActionButtons
                    editable={props.view === "edit"}
                    projectId={props.project._id}
                    editProjectHandler={props.editProjectHandler}
                    onSetEdit={setEditingHandler}
                    onCancelEdit={cancelEditingHandler}
                    onSubmit={submitEditHandler}
                    editing={editing}
                    deleteHandler={deleteHandler}/>
            </header>
            <div className="content">
                <img alt="showcase"
                     src={"https://my-react.local:3000/v1/photos/" + props.project.showcase_photo_id}/>
                <div className="project-details">
                    <Input editing={editing} attribute="location" value={props.project.location}  onUpdate={updateDataHandler}/>
                    <Input editing={editing} attribute="date" value={dateDisplay}  onUpdate={updateDataHandler}/>
                    <Input editing={editing} attribute="description"
                           value={props.project.description}  onUpdate={updateDataHandler}/><br/>
                    {!editing && <ShareStatus project={props.project}/>}
                    {editing &&
                        <Input type="slider" attribute="published" value={props.project.published} onUpdate={updateDataHandler} onUpdate2={toggleShowAudienceHandler}/>
                    }
                    {editing && ((!props.project.published && showAudience) || (props.project.published && showAudience !== false)) &&
                        <Input type="button-selector" label="Audience:" attribute="share_with" value={props.project.share_with} options={shareWithOptions} onUpdate={updateDataHandler}/>
                    }
                </div>
                <br/><br/>
                {props.view === "edit" && props.project.project_days !== undefined && props.project.project_days.map((projectDay) => (
                    <ProjectDay projectDay={projectDay}/>
                ))}
            </div>
        </main>

    );
}

export default Project;