import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {loadConnectionsProjectList} from "../../store/project-slice";
import ProjectPostcard from "./ProjectPostcard";

const ConnectionsProjectsList = () => {
    const dispatch = useDispatch();
    const projectList = useSelector(state => state.projectSlice.connectionsProjectList);
    const clickHandler = () => {
    }

    useEffect(() => {
        dispatch(loadConnectionsProjectList())
    }, [dispatch]);

    return (
        <>
            {projectList.map((prj) =>
                <ProjectPostcard onClick={clickHandler} project={prj} key={prj._id}/>
            )}
        </>
    );
}

export default ConnectionsProjectsList;