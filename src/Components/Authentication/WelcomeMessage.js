import '../UI/Global.css'

const WelcomeMessage = (props) => {

    return (
        <div className="bform-control">
            <h2>Welcome to TripBlogger</h2>
            <p>
                Tripblogger is an interactive project builder allowing organization of trip experiences and
                photos and is available via the web, android or iOS.
            </p>
            <p>
                To get started, simply click the get started button below.
            </p>
            <form onSubmit={props.changePageState}>
                <button type="submit" className="button">Get Started</button>
            </form>
        </div>
    );
}

export default WelcomeMessage;