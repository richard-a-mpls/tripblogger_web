import ProjectDay from "./ProjectDay";
import ShareStatus from "./ShareStatus";

const ViewProject = (props) => {

    const switchEditHandler = (event) => {
        event.preventDefault();
        props.editProjectHandler(props.editingProject._id);
    }

    let date = new Date();
    if (props.editingProject.datestmp !== undefined) {
        date = new Date(props.editingProject.datestmp.split("-"));
    }
    const month = date.toLocaleString('en-US', {month: 'long'});
    const day = date.toLocaleString('en-US', {day: '2-digit'});
    const year = date.getFullYear();


    return (
        <>
            <main>
                <header>
                    <h5>{props.editingProject.summary}</h5>
                    <form className="wb-form-control" onSubmit={switchEditHandler}>
                        <button type="submit">Edit</button>
                    </form>
                </header>
                <div className="content">
                    <img alt="showcase"
                         src={"https://my-react.local:3000/v1/photos/" + props.editingProject.showcase_photo_id}/>
                    <div className="project-details">
                        <h6>{props.editingProject.location} - {month} {day} {year}</h6><br/>
                        <p>{props.editingProject.description}</p><br/>
                        <ShareStatus project={props.editingProject}/>
                    </div>
                    <br/><br/>
                    {props.editingProject.project_days !== undefined && props.editingProject.project_days.map((projectDay) => (
                        <ProjectDay projectDay={projectDay}/>
                    ))}
                </div>
            </main>

        </>
    );
}

export default ViewProject;