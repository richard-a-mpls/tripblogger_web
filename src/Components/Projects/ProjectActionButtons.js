import React, {useState} from "react";
import Button from '../UI/Button';
import classes from './ProjectActionButtons.module.css';

const ProjectActionButtons = (props) => {
    const [confirmDelete, setConfirmDelete] = useState(false);

    const initiateDeleteHandler = (event) => {
        setConfirmDelete(true);
    }
    const cancelDeleteHandler = (event) => {
        setConfirmDelete(false);
    }
    const initiateEditHandler = (event) => {
        props.editProjectHandler(props.projectId);
    }

    const confirmDeleteHandler = (event) => {
        props.deleteHandler();
        setConfirmDelete(false);
    }

    let cancel = props.onCancelEdit;
    if (props.view === "create") {
        cancel = props.viewProjectsHandler;
    }

    return (<div className={classes.display}>
        {!props.editable && props.view !== "create" && !confirmDelete &&
            <Button onClick={initiateEditHandler}><i className="fas fa-eye"/></Button>
        }
        {confirmDelete &&
        <>
            <Button decorator="confirm" onClick={confirmDeleteHandler}>Delete <i className="fas fa-check"/></Button>
            <Button decorator="cancel" onClick={cancelDeleteHandler}><i className="fas fa-times"/></Button>
        </>
        }
        {
            !confirmDelete && props.editable && !props.editing &&
            <div className="wb-form-control">
                <Button type="button" onClick={initiateDeleteHandler}><i className="fas fa-trash"/>
                </Button>
                <Button onClick={props.onSetEdit} type="button">
                    <i className='far fa-edit'/>
                </Button>
            </div>
        }
        {props.editing && <div className={classes.display}>
            <Button onClick={props.onSubmit} type="button">
                <i className="fas fa-check"/>
            </Button>
            <Button onClick={cancel} decorator='cancel' type="button">
                <i className="fas fa-times"/>
            </Button>
        </div>}
    </div>);
};

export default ProjectActionButtons;
