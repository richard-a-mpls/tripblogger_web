import NewProject from "./NewProject";
import ProjectList from "./ProjectList";

const ProjectParent = props => {
    return (
        <div>
            <div>{
                <NewProject addToProjectList={props.addToProjectList} changePageState={props.changePageState} apiToken={props.apiToken}/>}
            </div>
            <div>{
                <ProjectList projectList={props.projectList} apiToken={props.apiToken}/>
            }</div>
        </div>
    );
}

export default ProjectParent;