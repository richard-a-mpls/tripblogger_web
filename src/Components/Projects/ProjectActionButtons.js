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
            <div className="wb-form-control">
                <button type="button" onClick={initiateDeleteHandler}>Delete
                </button>
                <button type="button"
                        onClick={initiateEditHandler}>View
                </button>
            </div>
            }
            {confirmDelete &&
            <div className="wb-form-control">
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
