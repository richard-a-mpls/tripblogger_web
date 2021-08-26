import React, {useState} from "react";
import PublicProjectsList from "../Projects/PublicProjectsList";
import MyProjectsList from "../Projects/MyProjectsList";
import ConnectionsProjectsList from "../Projects/ConnectionsProjectsList";
import {useSelector} from "react-redux";

const WelcomeMessage = (props) => {

    const [showConnectionsProjects, setShowConnectionsProjects] = useState(false);
    const userProfile = useSelector(state => state.profileSlice.userProfile);

    return (
        <>
            {showConnectionsProjects && <main>
                <header>
                    <h4>Connections: Recent Projects</h4>
                    <form className="wb-form-control">
                        <button type="button" onClick={props.changePageState}>&gt;&gt;</button>
                    </form>
                </header>
                <ConnectionsProjectsList/>
            </main>
            }
            <main>
                <button className="fullwidth" onClick={props.changePageState}>
                    Manage or create new Projects, {userProfile.profile_name}?
                </button>
                <PublicProjectsList/>
            </main>
            <main>
                <header>
                    <h4>My Projects</h4>
                    <form className="wb-form-control" onSubmit={props.changePageState}>
                        <button type="submit">&gt;&gt;</button>
                    </form>
                </header>
                <MyProjectsList/>
            </main>
        </>
    );
}

export default WelcomeMessage;