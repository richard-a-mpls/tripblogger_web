import Project from "./Project";

const ProjectList = props => {
    return (
        <>
            {props.projectList.map((prj) => <Project
                project={prj}
                key={prj._id}
                removeProject={props.removeProject}
                editProjectHandler={props.editProjectHandler}
                view="list"
            />)}
            {(props.projectList.length === 0) && <p>create a new project</p>}
        </>
    );
}

export default ProjectList;