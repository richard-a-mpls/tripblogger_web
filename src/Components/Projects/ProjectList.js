import Project from "./Project";

const ProjectList = props => {
    return (
        <div>
            {props.projectList.map((prj) => <Project
                key={prj._id}
                id={prj._id}
                description={prj.description}
                location={prj.location}
                profile_id={prj.profile_id}
                published={prj.published}
                share_with={prj.share_with}
                summary={prj.summary}
                photo_id={prj.showcase_photo_id}
                days={prj.project_days}
                removeProject={props.removeProject}
                apiToken={props.apiToken}
                editProjectHandler={props.editProjectHandler}
            />)}
            {(props.projectList.length === 0) && <p>create a new project</p>}
        </div>
    );
}

export default ProjectList;