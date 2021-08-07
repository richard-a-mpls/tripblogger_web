const ShareStatus = (props) => {
    let text = "This project is only viewable by you.";
    if (props.project.published) {
        if (props.project.share_with === "connections") {
            text = "Only you and your connections can view this project.";
        } else if (props.project.share_with === "public") {
            text = "This project is viewable by everyone.";
        }
    } else {
        if (props.project.share_with === "connections") {
            text = "Once published, only you and your connections can view this project.";
        } else if (props.project.share_with === "public") {
            text = "Once published, this project will be viewable by everyone.";
        }
    }
    return (
        <p><i>{text}</i></p>
    );
}

export default ShareStatus;