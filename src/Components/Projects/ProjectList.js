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
            />)}
        </div>
    );
}

export default ProjectList;