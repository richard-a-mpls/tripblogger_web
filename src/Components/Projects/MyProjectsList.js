import {useDispatch, useSelector} from "react-redux";
import {useEffect} from "react";
import {loadProjectList} from "../../store/project-slice";
import ProjectPostcard from "./ProjectPostcard";

const MyProjectsList = () => {
    const dispatch = useDispatch();
    const projectList = useSelector(state => state.projectSlice.projectList);
    const clickHandler = () => {
    }

    useEffect(() => {
        dispatch(loadProjectList())
    }, [dispatch]);

    return (
        <>
            {projectList.map((prj) =>
                <ProjectPostcard onClick={clickHandler} project={prj} key={prj._id}/>
            )}
        </>
    );
}

export default MyProjectsList;