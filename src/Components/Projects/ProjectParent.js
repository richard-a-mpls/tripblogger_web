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
        event.preventDefault();
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
        <main>
            <header>
                <h3>My Projects</h3>
                <form onSubmit={initNewProjectHandler} className="wb-form-control">
                    <button type="button" onClick={props.showWelcomePage}>Dashboard</button>
                    {pageState === "viewing" && <button type="submit">New Project</button>}
                    {pageState === "creating" && <button className="cancel" type="button"
                                                         onClick={viewProjectsHandler}>Cancel
                    </button>}
                    {(pageState === "editing" || pageState === "viewing_project") &&
                    <button type="button" onClick={viewProjectsHandler}>All Projects</button>}
                </form>
            </header>
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
        </main>
    );
}

export default ProjectParent;