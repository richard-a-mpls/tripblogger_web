import '../UI/Global.css'
import './Project.css'
import {useState} from "react";

const ProjectActionButtons = (props) => {
    const [confirmDelete, setConfirmDelete] = useState(false);

    const initiateDeleteHandler = (event) => {
        setConfirmDelete(true);
    }
    const cancelDeleteHandler = (event) => {
        setConfirmDelete(false);
    }
    const initiateEditHandler = (event) => {
        console.log(props.projectId);
        props.editProjectHandler(props.projectId);
    }

    return (
        <form onSubmit={props.deleteHandler}>
            {!confirmDelete &&
            <div>
                <button className="action-button-group" type="button" onClick={initiateDeleteHandler}>Delete
                </button>
                <button className="action-button-group" type="button"
                        onClick={initiateEditHandler}>View
                </button>
            </div>
            }
            {confirmDelete &&
            <div>
                <button className="cancel" type="button"
                        onClick={cancelDeleteHandler}>Cancel
                </button>
                <button className="confirm" type="submit">Confirm</button>
            </div>
            }
        </form>
    );
};

export default ProjectActionButtons;
