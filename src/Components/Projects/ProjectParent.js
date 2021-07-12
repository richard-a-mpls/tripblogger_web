import NewProject from "./NewProject";
import ProjectList from "./ProjectList";

const ProjectParent = props => {
    return (
        <div>
            <div>{
                <NewProject addToProjectList={props.addToProjectList} changePageState={props.changePageState} apiToken={props.apiToken}/>}
            </div><br/>
            <div>{
                <ProjectList removeProject={props.removeProject} projectList={props.projectList} changePageState={props.changePageState} apiToken={props.apiToken}/>
            }</div>
        </div>
    );
}

export default ProjectParent;