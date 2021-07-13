import '../UI/Global.css'
import './Project.css'
import {useState} from "react";

const DeleteButton = (props) => {

    const [confirmDelete, setConfirmDelete] = useState(false);
    const initiateDeleteHandler = (event) => {
        setConfirmDelete(true);
    }
    const cancelDeleteHandler = (event) => {
        setConfirmDelete(false);
    }

    return (
        <div className="bform-control">
            <form onSubmit={props.deleteHandler}>
                {!confirmDelete &&
                <button className="action-button-group" type="button" onClick={initiateDeleteHandler}>Delete</button>
                }
                {confirmDelete &&
                <div>
                    <button className="bform-control action-button-group cancel-button" type="button"
                            onClick={cancelDeleteHandler}>Cancel
                    </button>
                    <button className="bform-control action-button-group confirm-button" type="submit">Confirm</button>
                </div>
                }
            </form>
        </div>
    );
};

export default DeleteButton;
