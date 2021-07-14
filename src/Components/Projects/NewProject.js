import React, {useState} from "react";
import {Card} from "react-bootstrap";
import "../UI/Global.css";

const NewProject = (props) => {
    const [summary, setSummary] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState(new Date());

    const submitProjectHandler = (event) => {
        event.preventDefault();
        console.log("submit new project");
        const projectDays = [
            {
                'datestmp': date
            }
        ]
        const updateValue = {
            'summary': summary,
            'description': description,
            'location': location,
            'project_days': projectDays
        }
        fetch('http://localhost:8080/v1/me/projects', {
            method: 'post',
            body: JSON.stringify(updateValue),
            headers: new Headers({
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + props.apiToken
            })
        })
            .then(response => response.json())
            .then(data => props.addToProjectList(data));

        setSummary('');
        setDescription('');
        setLocation('');
        props.viewProjectsHandler();
    };

    const summaryChangeHandler = (event) => {
        setSummary(event.target.value);
    }
    const descriptionChangeHandler = (event) => {
        setDescription(event.target.value);
    }
    const locationChangeHandler = (event) => {
        setLocation(event.target.value);
    }
    const dateChangeHandler = (event) => {
        setDate(event.target.value);
    }

    return (
        <Card style={{width: 'auto'}}>
            <div>
                <Card.Header>
                    <h2>Creating a new Project</h2>
                </Card.Header>
                <Card.Body>
                    <Card.Title>
                        Fill in the below info to create your new project.
                    </Card.Title>
                    <div className="bform-control">
                        <form onSubmit={submitProjectHandler}>
                            <Card.Text>
                                <label>Summary: </label><input type="text" onChange={summaryChangeHandler}
                                                               value={summary}
                                                               placeholder="A brief summary of your project"/><br/>
                                <label>Description: </label><input type="text" onChange={descriptionChangeHandler}
                                                                   value={description}
                                                                   placeholder="A description of your project"/><br/>
                                <label>Location: </label><input type="text" onChange={locationChangeHandler}
                                                                value={location}
                                                                placeholder="The location associated with your project"/><br/>
                                <label>Date: </label>
                                <input type="date" onChange={dateChangeHandler}
                                       value={date}
                                       placeholder="The day/first day of your project contents"/><br/>
                                <button className="bform-control cancel-button" type="button"
                                        onClick={props.viewProjectsHandler}>Cancel
                                </button>
                                <button type="submit" onClick={submitProjectHandler}>Submit</button>
                            </Card.Text>
                        </form>
                    </div>
                </Card.Body>
            </div>
        </Card>
    )
};

export default NewProject;