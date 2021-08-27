import React, {useState} from "react";
import styles from './ProjectActionButtons.module.css';

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

    return (<div className={styles.display}>
        {!props.editable && props.view !== "create" && !confirmDelete &&
        <button type="button"
                onClick={initiateEditHandler}><i className="fas fa-eye"></i>
        </button>
        }
        {confirmDelete &&
            <div className="wb-form-control">
                <button className="confirm" type="button"
                        onClick={confirmDeleteHandler}>Delete <i className="fas fa-check"/></button>
                <button className="cancel" type="button"
                        onClick={cancelDeleteHandler}><i className="fas fa-times"/>
                </button>
            </div>
        }
        {
            !confirmDelete && props.editable && !props.editing &&
            <div className="wb-form-control">
                <button type="button" onClick={initiateDeleteHandler}><i className="fas fa-trash"/>
                </button>
                <button onClick={props.onSetEdit} type="button">
                    <i className='far fa-edit'/>
                </button>
            </div>
        }
        {
            props.editing &&
            <div className="wb-form-control">
                <button onClick={props.onSubmit} type="button">
                    <i className="fas fa-check"/>
                </button>

                <button onClick={cancel} className='cancel' type="button">
                    <i className="fas fa-times"/>
                </button>

            </div>
        }
    </div>);
};

export default ProjectActionButtons;
