import ProjectList from "./ProjectList";
import React, {useState} from "react";
import Project from "./Project";
import {useDispatch, useSelector} from "react-redux";
import {loadActiveProject} from "../../store/project-slice";
import Button from '../UI/Button';
import classes from './ProjectParent.module.css';

const ProjectParent = props => {

    const PAGE_STATE_LIST = 'page_state_list';
    const PAGE_STATE_CREATING = 'page_state_creating';
    const PAGE_STATE_EDITING = 'page_state_editing';
    const PAGE_STATE_VIEW = 'page_state_view';
    const [pageState, setPageState] = useState(PAGE_STATE_LIST);
    const activeProject = useSelector(state => state.projectSlice.activeProject);

    const dispatch = useDispatch();

    const initNewProjectHandler = (event) => {
        dispatch(loadActiveProject()); // set empty project create
        setPageState(PAGE_STATE_CREATING);
    }

    const viewProjectsHandler = (event) => {
        setPageState(PAGE_STATE_LIST);
    }

    const editProjectHandler = (projectId) => {
        dispatch(loadActiveProject(projectId));
        setPageState(PAGE_STATE_EDITING);
    }

    const viewProjectHandler = (projectId) => {
        dispatch(loadActiveProject(projectId));
        setPageState(PAGE_STATE_VIEW);
    }

    return (
        <>
            <main>
                {pageState === PAGE_STATE_LIST && <div style={{textAlign: "center"}}>
                    <Button decorator="halfwidth" type="button" onClick={props.showWelcomePage}>Community</Button>
                    <Button decorator="halfwidth" onClick={initNewProjectHandler} type="submit">New Project</Button>
                </div>}
                {(pageState === PAGE_STATE_CREATING || pageState === PAGE_STATE_EDITING || pageState === PAGE_STATE_VIEW) &&
                <Button type="button" decorator="fullwidth" onClick={viewProjectsHandler}>All Projects</Button>
                }
            </main>
            <div className={classes.projectParentWrapper}>
                {pageState === PAGE_STATE_LIST &&
                <ProjectList changePageState={viewProjectsHandler}
                             editProjectHandler={viewProjectHandler}/>}
                {pageState === PAGE_STATE_VIEW &&
                <Project
                    editProjectHandler={editProjectHandler}
                    viewProjectsHandler={viewProjectsHandler}
                    project={activeProject}
                    view="edit"
                />}
                {pageState === PAGE_STATE_CREATING &&
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