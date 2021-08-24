import {useState} from "react";
import PublicProjectsList from "../Projects/PublicProjectsList";
import MyProjectsList from "../Projects/MyProjectsList";
import ConnectionsProjectsList from "../Projects/ConnectionsProjectsList";

const WelcomeMessage = (props) => {

    const [showConnectionsProjects, setShowConnectionsProjects] = useState(false);

    return (
        <main>
            <header>
                <h3>TripBlogger Dashboard</h3>
                <form className="wb-form-control" onSubmit={props.changePageState}>
                    <button type="submit">Get Started</button>
                </form>
            </header>
            <div className="content">
                <p>
                    Tripblogger is an interactive project builder allowing organization of trip experiences and
                    photos and is available via the web, android or iOS.
                </p>
                <p>To get started, click the get started button to the upper-right.</p>
            </div>
            {showConnectionsProjects && <main>
                <header>
                    <h4>Connections: Recent Projects</h4>
                    <form className="wb-form-control">
                        <button type="button" onClick={props.changePageState}>&gt;&gt;</button>
                    </form>
                </header>
                <ConnectionsProjectsList/>
            </main>}
            <main>
                <header>
                    <h4>Community: Recent Projects</h4>
                    <form className="wb-form-control" onSubmit={props.changePageState}>
                        <button type="submit">&gt;&gt;</button>
                    </form>
                </header>
                <PublicProjectsList/>
            </main>
            <main>
                <header>
                    <h4>My Recent Projects</h4>
                    <form className="wb-form-control" onSubmit={props.changePageState}>
                        <button type="submit">&gt;&gt;</button>
                    </form>
                </header>
                <MyProjectsList/>
            </main>
        </main>
    );
}

export default WelcomeMessage;