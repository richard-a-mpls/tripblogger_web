import ProjectList from "./ProjectList";
import React, {useState} from "react";
import Project from "./Project";
import {useDispatch, useSelector} from "react-redux";
import {loadActiveProject} from "../../store/project-slice";

const ProjectParent = props => {
    const [pageState, setPageState] = useState('viewing');
    const activeProject = useSelector(state => state.projectSlice.activeProject);

    const dispatch = useDispatch();

    const initNewProjectHandler = (event) => {
        dispatch(loadActiveProject()); // set empty project create
        setPageState('creating');
    }

    const viewProjectsHandler = (event) => {
        setPageState('viewing');
    }

    const editProjectHandler = (projectId) => {
        dispatch(loadActiveProject(projectId));
        setPageState('editing');
    }

    const viewProjectHandler = (projectId) => {
        dispatch(loadActiveProject(projectId));
        setPageState('viewing_project');
    }

    return (
        <>
            <main style={{marginTop: "60px"}}>
                {pageState === "viewing" && <div className="center">
                    <button className="halfwidth" type="button" onClick={props.showWelcomePage}>Community</button>
                    <button className="halfwidth" onClick={initNewProjectHandler} type="submit">New Project</button>
                </div>}
                {pageState === "creating" && <button className="fullwidth cancel" type="button"
                                                     onClick={viewProjectsHandler}>Cancel
                </button>}
            </main>
            {(pageState === "editing" || pageState === "viewing_project") &&
            <button type="button" className="fullwidth" onClick={viewProjectsHandler}>All Projects</button>}
            <div className="content">
                {pageState === "viewing" &&
                <ProjectList changePageState={viewProjectsHandler}
                             editProjectHandler={viewProjectHandler}/>}
                {pageState === "viewing_project" &&
                <Project
                    editProjectHandler={editProjectHandler}
                    project={activeProject}
                    view="edit"
                />}
                {pageState === "creating" &&
                <Project
                    project={activeProject}
                    view="create"
                />
                }

            </div>
        </>
    );
}

export default ProjectParent;