import React, {useState} from "react";

import '../UI/BloggerCard.css';

const ProjectDay = (props) => {

    const [expanded, setExpanded] = useState(false);

    let date = new Date();
    if (props.projectDay !== undefined) {
        date = new Date(props.projectDay.datestmp.split("-"));
    }
    const month = date.toLocaleString('en-US', {month: 'long'});
    const day = date.toLocaleString('en-US', {day: '2-digit'});
    const year = date.getFullYear();

    const switchExpandedHandler = (event) => {
        event.preventDefault();
        if (expanded) {
            setExpanded(false);
        } else {
            setExpanded(true);
        }
    }

    return (
        <main className='day'>
            <header className='header day' style={{verticalAlign: 'middle', display: 'inline-block'}}>
                <span style={{verticalAlign: 'middle', display: 'inline-block', lineHeight: '40px'}}>
                <h6>
                    {month} {day} {year} - {props.projectDay.summary}
                </h6>
                </span>
                <form className="wb-form-control" onSubmit={switchExpandedHandler}>
                    {expanded && <>
                        <button type="submit">Collapse</button>
                        <button type="button">Edit</button>
                    </>}
                    {!expanded &&
                    <button type="submit">Expand</button>
                    }
                </form>

            </header>
            {expanded &&
            <div className="content">
                <b>{props.projectDay.location}</b><br/>
                {props.projectDay.description}<br/>
                {props.projectDay.photos && props.projectDay.photos.map((photoId) =>
                    <img
                        key={photoId}
                        alt="showcase"
                        src={"https://my-react.local:3000/v1/photos/" + photoId}/>
                )}
            </div>
            }
        </main>
    );
}

export default ProjectDay;