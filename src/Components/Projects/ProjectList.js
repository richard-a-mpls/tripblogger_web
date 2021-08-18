import Project from "./Project";
import {useEffect} from "react";
import {loadProjectList} from "../../store/project-slice";
import {useDispatch, useSelector} from "react-redux";

const ProjectList = props => {
    const projectList = useSelector(state => state.projectSlice.projectList);
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(loadProjectList());
    }, [dispatch]);

    return (
        <>
            {projectList.map((prj) => <Project
                project={prj}
                key={prj._id}
                editProjectHandler={props.editProjectHandler}
                view="list"
            />)}
            {(!props.projectList || props.projectList.length === 0) && <p>create a new project</p>}
        </>
    );
}

export default ProjectList;