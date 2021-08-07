import React, {useState} from "react";

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
                {!props.editable && !confirmDelete &&
                <div className="wb-form-control">
                    <button type="button" onClick={initiateDeleteHandler}>Delete
                    </button>
                    <button type="button"
                            onClick={initiateEditHandler}>View
                    </button>
                </div>
                }
                {!props.editable && confirmDelete &&
                <div className="wb-form-control">
                    <button className="cancel" type="button"
                            onClick={cancelDeleteHandler}>Cancel
                    </button>
                    <button className="confirm" type="submit">Confirm</button>
                </div>
                }
                {props.editable && !props.editing &&
                <div className="wb-form-control">
                    <button onClick={props.onSetEdit} type="button">
                        <i className='far fa-edit'/>
                    </button>
                </div>
                }
                {props.editing &&
                <div className="wb-form-control">
                    <button onClick={props.onSubmit} type="button">
                        <i className="fas fa-check"/>
                    </button>
                    <button onClick={props.onCancelEdit} className='cancel' type="button">
                        <i className="fas fa-times"></i>
                    </button>
                </div>
                }
            </form>
        );};

export default ProjectActionButtons;
