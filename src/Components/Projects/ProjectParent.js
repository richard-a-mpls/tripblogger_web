import ProjectList from "./ProjectList";
import React, {useState} from "react";
import Project from "./Project";
import {useDispatch, useSelector} from "react-redux";
import {loadActiveProject} from "../../store/project-slice";
import classes from './ProjectParent.module.css';

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
            <main>
                {pageState === "viewing" && <div className="center">
                    <button className="halfwidth" type="button" onClick={props.showWelcomePage}>Community</button>
                    <button className="halfwidth" onClick={initNewProjectHandler} type="submit">New Project</button>
                </div>}
                {(pageState === "creating" || pageState === "editing" || pageState === "viewing_project") &&
                <button type="button" className="fullwidth" onClick={viewProjectsHandler}>All Projects</button>
                }
            </main>
            <div className={classes.projectParentWrapper}>
                {pageState === "viewing" &&
                <ProjectList changePageState={viewProjectsHandler}
                             editProjectHandler={viewProjectHandler}/>}
                {pageState === "viewing_project" &&
                <Project
                    editProjectHandler={editProjectHandler}
                    viewProjectsHandler={viewProjectsHandler}
                    project={activeProject}
                    view="edit"
                />}
                {pageState === "creating" &&
                <Project
                    project={activeProject}
                    onCancelEdit={viewProjectsHandler}
                    viewProjectsHandler={viewProjectsHandler}
                    onPostCreate={viewProjectHandler}
                    view="create"
                />
                }

            </div>
        </>
    );
}

export default ProjectParent;