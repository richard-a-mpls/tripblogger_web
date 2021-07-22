import BloggerCard from "./BloggerCard";
import "../UI/BloggerCard.css"

const Test = props => {

    const showWelcomeHandler = () => {
        props.showWelcome();
    }

    return (
        <BloggerCard>
            <header  className="wb-form-control">
                <div className="left-item"><button className="button-profile">
                    <img alt="profile" className="profile-pic" src="/001.JPG"/><h6>Richard
                    Abrahamson</h6></button>
                </div>
                <div className="right-item">
                    <form>
                        <button type="submit">Log Out</button>
                    </form>
                </div>
            </header>
            <main>
                <header>
                    <h3>My Projects</h3>
                    <form className="wb-form-control">
                        <button type="button">Show Dashboard</button>
                        <button type="button">Create New Project</button>
                    </form>
                </header>
                <div className="content">
                    <header>
                        <h5>Trip to Winona with Heather</h5>
                        <form className="wb-form-control">
                            <button type="button">View</button>
                            <button type="button">Delete</button>
                            <button type="button" className="inactive">Inactive</button>
                        </form>
                    </header>
                    <div className="content">
                        <img src="/001.JPG"/>
                        <div className="project-details">
                            <h6>Winona Minnesota, August 20, 2019</h6>
                            <p>Trip to Winona after we lost our sweet, sweet girl. She was such a dream and will
                                be missed forever. We were both sad but had fun and spoke of poor Gracy almost the
                                entire trip. We'll love you forever Gracy!</p>
                            <p><i>This project is viewable by everyone.</i></p>
                        </div>
                    </div>


                    <header>
                        <h5>Christmas at our new house in Plymouth</h5>
                        <form className="wb-form-control">
                            <button type="button">View</button>
                            <button type="button">Delete</button>
                            <button type="button" className="cancel">Cancel</button>
                        </form>
                    </header>
                    <div className="content">
                        <img src="/001.JPG"/>
                        <div className="project-details">
                            <h6>Winona Minnesota, August 20, 2019</h6>
                            <p>Trip to Winona after we lost our sweet, sweet girl. She was such a dream and will
                                be missed forever. We were both sad but had fun and spoke of poor Gracy almost the
                                entire trip. We'll love you forever Gracy!</p>
                            <p><i>This project is viewable by everyone.</i></p>
                        </div>
                    </div>


                    <form className="wb-form-control">
                        <header>
                            <input type="text" className="summary" value="Christmas at our new house in Plymouth"/>
                            <form className="wb-form-control">
                                <button type="button" className="cancel">Cancel Edit</button>
                            </form>
                        </header>
                        <div className="content">
                            <div>
                                <img src="/001.JPG"/>
                                <div className="project-details">
                                    <label>Location:</label>
                                    <input type="text" value="Winona Minnesota"/>
                                    <label>Description:</label>
                                    <input type="text" value="
                                    Trip to Winona after we lost our sweet, sweet girl. She was such a dream and will
                                        be missed forever. We were both sad but had fun and spoke of poor Gracy almost
                                        the
                                        entire trip. We'll love you forever Gracy!"/>
                                    <label style={{marginBottom: "8px"}}>Published:</label>
                                    selector yes/no<br/>
                                    <label>Available To:</label>
                                    <button type="button" className="inactive">Only Me</button>
                                    <button type="button">My Connections</button>
                                    <button type="button" className="inactive">Everyone</button>
                                </div>
                            </div>
                            <div style={{paddingTop: "25px"}}>
                                <button type="button" className="cancel">Cancel</button>
                                <button type="button">Submit</button>
                            </div>
                        </div>
                        <br/>
                    </form>

                </div>
            </main>
            <form className="wb-form-control">
                <button type="button" onClick={showWelcomeHandler}>showWelcome</button>
            </form>
            <div className="footer">
                <h6>API Token: 1234</h6>
                <h6>Page State: here</h6>
            </div>
        </BloggerCard>
    );
}

export default Test;