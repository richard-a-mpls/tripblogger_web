const ShareStatus = (props) => {
    let text = "This project is only viewable by you.";
    if (props.project.published) {
        text = "This project is viewable by everyone.";
    } else {
        text = "Once published, this project will be viewable by everyone.";
    }
    return (
        <p><i>{text}</i></p>
    );
}

export default ShareStatus;