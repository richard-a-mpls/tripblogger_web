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
            props.editProjectHandler(props.projectId);
        }

        const confirmDeleteHandler = (event) => {
            event.preventDefault();
            props.deleteHandler();
            setConfirmDelete(false);
        }

        return (
            <form onSubmit={confirmDeleteHandler}>
                {!props.editable && !confirmDelete &&
                <div className="wb-form-control">
                    <button type="button"
                            onClick={initiateEditHandler}><i className="fas fa-eye"></i>
                    </button>
                </div>
                }
                {confirmDelete &&
                <div className="wb-form-control">
                    <button className="confirm" type="submit"><i className="fas fa-check"/></button>
                    <button className="cancel" type="button"
                            onClick={cancelDeleteHandler}><i className="fas fa-times"/>
                    </button>
                </div>
                }
                {!confirmDelete && props.editable && !props.editing &&
                <div className="wb-form-control">
                    <button type="button" onClick={initiateDeleteHandler}><i className="fas fa-trash"/>
                    </button>
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
                        <i className="fas fa-times"/>
                    </button>
                </div>
                }
            </form>
        );};

export default ProjectActionButtons;
