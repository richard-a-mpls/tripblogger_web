import React, {useState} from "react";
import {Card} from "react-bootstrap";

const NewProject = (props) => {
    const [pageState, setPageState] = useState('default');
    const [summary, setSummary] = useState('');
    const [description, setDescription] = useState('');
    const [location, setLocation] = useState('');

    const cancelNewProjectHandler = () => {
        console.log("cancel new project");
        setPageState('default');
    };

    const submitProjectHandler = (event) => {
        event.preventDefault();
        console.log("submit new project");
        const updateValue = {
            'summary': summary,
            'description': description,
            'location': location
        }
        console.log(JSON.stringify(updateValue));
        console.log(props.apiToken);
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
        setPageState('default');
    };

    const initNewProjectHandler = (event) => {
        event.preventDefault();
        setPageState('creating');
    }

    const summaryChangeHandler = (event) => {
        setSummary(event.target.value);
    }
    const descriptionChangeHandler = (event) => {
        setDescription(event.target.value);
    }
    const locationChangeHandler = (event) => {
        setLocation(event.target.value);
    }

    return (
        <Card style={{width: 'auto'}}>
            {pageState === 'default' &&
            <Card.Header>
                <form onSubmit={initNewProjectHandler}>
                    <button type="submit">Create a new project</button>
                </form>
            </Card.Header>
            }
            {pageState === 'creating' &&
            <div>
                <Card.Header>
                    <h2>Create a new Project</h2>
                </Card.Header>
                <Card.Body>
                    <Card.Title>
                        Fill in the below info to create your new project.
                    </Card.Title>
                    <form onSubmit={submitProjectHandler}>
                        <Card.Text>
                            <label>Summary: </label><input type="text" onChange={summaryChangeHandler} value={summary}/><br/>
                            <label>Description: </label><input type="text" onChange={descriptionChangeHandler} value={description}/><br/>
                            <label>Location: </label><input type="text" onChange={locationChangeHandler} value={location}/><br/>
                        </Card.Text>
                        <Card.Footer>
                            <button type="button" onClick={cancelNewProjectHandler}>cancel</button>
                            <button type="submit" onClick={submitProjectHandler}>Submit</button>
                        </Card.Footer>
                    </form>
                </Card.Body>
            </div>
            }
        </Card>
    )
}

export default NewProject;