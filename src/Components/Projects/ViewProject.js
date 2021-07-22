import ProjectDay from "./ProjectDay";

const ViewProject = (props) => {

    const switchEditHandler = (event) => {
        event.preventDefault();
        props.editProjectHandler(props.editingProject._id);
    }

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
                        <h6>{props.editingProject.location}</h6><br/>
                        <p>{props.editingProject.description}</p><br/><br/>
                        <p><i>
                            {(props.editingProject.share_with === "private") && "This project is only viewable by you."}
                            {(props.editingProject.share_with === "connections" && props.editingProject.published) && "Only you and your connections can view this project."}
                            {(props.editingProject.share_with === "connections" && !props.editingProject.published) && "Once published, only you and your connections can view this project."}
                            {(props.editingProject.share_with === "public" && props.editingProject.published) && "This project is viewable by everyone."}
                            {(props.editingProject.share_with === "public" && !props.editingProject.published) && "Once published, this project will be viewable by everyone."}
                        </i></p>
                    </div>
                </div>
            </main>

            {props.editingProject.project_days !== undefined && props.editingProject.project_days.map((projectDay) => (
                <ProjectDay projectDay={projectDay}/>
            ))}
        </>
    );
}

export default ViewProject;