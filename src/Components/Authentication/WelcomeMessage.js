import '../UI/Global.css'
import {Card} from "react-bootstrap";

const WelcomeMessage = (props) => {

    return (
        <div className="main-body">
            <div className="main-body-header">
                <h3>TripBlogger Dashboard</h3>
                <form className="wb-form-control" onSubmit={props.changePageState}>
                    <button type="submit">Get Started</button>
                </form>
            </div>
            <div className="main-body-text">
                <p>
                    Tripblogger is an interactive project builder allowing organization of trip experiences and
                    photos and is available via the web, android or iOS.
                </p>
                <p>
                    To get started, click the get started button to the upper-right.
                </p>
                <div className="main-body">
                    <div className="main-body-header">
                        <h4>Connections: Recent Projects</h4>
                        <form className="wb-form-control">
                            <button type="button" onClick={props.changePageState}>&gt;&gt;</button>
                        </form>
                    </div>
                    <div className="main-body-text">
                        <p>PLACEHOLDER: be the first to publish a project.</p>
                    </div>
                </div>
                <div className="main-body">
                    <div className="main-body-header">
                        <h4>Community: Recent Projects</h4>
                        <form className="wb-form-control" onSubmit={props.changePageState}>
                            <button type="submit">&gt;&gt;</button>
                        </form>
                    </div>
                    <div className="main-body-text">
                        <p>PLACEHOLDER: be the first to publish a project.</p>
                    </div>
                </div>
                <div className="main-body">
                    <div className="main-body-header">
                        <h4>My Recent Projects</h4>
                        <form className="wb-form-control" onSubmit={props.changePageState}>
                            <button type="submit">&gt;&gt;</button>
                        </form>
                    </div>
                    <div className="main-body-text">
                        <p>PLACEHOLDER: no projects found.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WelcomeMessage;