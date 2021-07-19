import '../UI/Global.css'
import {Card} from "react-bootstrap";

const WelcomeMessage = (props) => {

    return (
        <div className="bform-control">
            <Card style={{width: 'auto', marginBottom: '15px'}}>
                <Card.Header>
                    <h2 className="breadcrumb-text">TripBlogger Dashboard</h2>
                    <form className='breadcrumb-actions' onSubmit={props.changePageState}>
                        <button type="submit" className="button">Get Started</button>
                    </form>
                </Card.Header>
                <Card.Body>
                    <Card.Text>
                        <p>
                            Tripblogger is an interactive project builder allowing organization of trip experiences and
                            photos and is available via the web, android or iOS.
                        </p>
                        <p>
                            To get started, click the get started button to the upper-right.
                        </p>
                        <Card style={{width: 'auto', marginBottom: '15px'}}>
                            <Card.Header>
                                <h3 className="breadcrumb-text">Connections: Recent Projects</h3>
                                <form className='breadcrumb-actions'>
                                    <button type="button" onClick={props.changePageState} className="button">&gt;&gt;</button>
                                </form>
                            </Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    <p>PLACEHOLDER: be the first to publish a project.</p>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card style={{width: 'auto', marginBottom: '15px'}}>
                            <Card.Header>
                                <h3 className="breadcrumb-text">Community: Recent Projects</h3>
                                <form className='breadcrumb-actions' onSubmit={props.changePageState}>
                                    <button type="submit" className="button">&gt;&gt;</button>
                                </form>
                            </Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    <p>PLACEHOLDER: be the first to publish a project.</p>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                        <Card style={{width: 'auto', marginBottom: '15px'}}>
                            <Card.Header>
                                <h3 className="breadcrumb-text">My Recent Projects</h3>
                                <form className='breadcrumb-actions' onSubmit={props.changePageState}>
                                    <button type="submit" className="button">&gt;&gt;</button>
                                </form>
                            </Card.Header>
                            <Card.Body>
                                <Card.Text>
                                    <p>PLACEHOLDER: no projects found.</p>
                                </Card.Text>
                            </Card.Body>
                        </Card>
                    </Card.Text>
                </Card.Body>
            </Card>
        </div>
    );
}

export default WelcomeMessage;