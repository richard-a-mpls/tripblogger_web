import React, {useState} from "react";
import {Card} from "react-bootstrap";
import "../UI/Global.css";

import axios from 'axios'

const NewProject = (props) => {
    const [summary, setSummary] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');
    const [date, setDate] = useState(new Date());
    const [photoData, setPhotoData] = useState('');
    const [photoSelected, setPhotoSelected] = useState(false);

    const submitProjectHandler = (event) => {
        event.preventDefault();
        console.log("submit new project");
        const formData = new FormData();
        formData.append('file', photoData);
        axios.post("http://localhost:8080/v1/photos", formData, { // receive two parameter endpoint url ,form data
            headers: { Authorization: `Bearer ${props.apiToken}` }
        })
            .then(response => {
                const imgData = response.data;
                console.log(imgData.id);
                const projectDays = [
                    {
                        'datestmp': date
                    }
                ]
                const updateValue = {
                    'summary': summary,
                    'description': description,
                    'location': location,
                    'project_days': projectDays,
                    'showcase_photo_id': imgData.id
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
                    .then(data => {
                        props.viewProject(data);
                    });

                setSummary('');
                setDescription('');
                setLocation('');
            })};

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

    const setPhotoDataHandler = (event) => {
        setPhotoData(event.target.files[0])
        setPhotoSelected(true);
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
                                <label>Photo: </label>
                                <label for="file" className="inputfile">Choose a file</label>
                                <input id="file" className="inputfile" type="file" onChange={setPhotoDataHandler}/><br/><br/>
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