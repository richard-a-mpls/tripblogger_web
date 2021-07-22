import React, {useRef, useState} from "react";

import axios from 'axios'

const NewProject = (props) => {

    const summary = useRef();
    const description = useRef();
    const location = useRef();
    const date = useRef();
    const [photoData, setPhotoData] = useState('');
    const [photoSelected, setPhotoSelected] = useState(false);

    const submitProjectHandler = (event) => {
        event.preventDefault();
        console.log("submit new project");
        const formData = new FormData();
        formData.append('file', photoData);
        axios.post("http://localhost:8080/v1/photos", formData, { // receive two parameter endpoint url ,form data
            headers: {Authorization: `Bearer ${props.apiToken}`}
        })
            .then(response => {
                const imgData = response.data;
                console.log(imgData.id);
                const projectDays = [
                    {
                        'datestmp': date.current.value
                    }
                ]
                const updateValue = {
                    'summary': summary.current.value,
                    'description': description.current.value,
                    'location': location.current.value,
                    'project_days': projectDays,
                    'showcase_photo_id': imgData.id
                }
                console.log(updateValue);

                axios.post('http://localhost:8080/v1/me/projects', JSON.stringify(updateValue),
                    {headers: {'Authorization': 'Bearer ' + props.apiToken, 'Content-Type': 'application/json'}})
                    .then(response => {
                        props.addToProjectList(response.data);
                        props.viewProject(response.data);
                    });
            });
    };

    const setPhotoDataHandler = (event) => {
        setPhotoData(event.target.files[0])
        setPhotoSelected(true);
    }

    return (
        <main>
            <header>
                <h3>Creating a new Project</h3>
            </header>
            <div className="content">
                <h6>Fill in the below info to create your new project.</h6>
                <div className="wb-form-control">
                    <form onSubmit={submitProjectHandler}>

                            <label>Summary: </label><input type="text" ref={summary}
                                                           placeholder="A brief summary of your project"/>
                            <label>Description: </label><input type="text" ref={description}
                                                               placeholder="A description of your project"/>
                            <label>Location: </label><input type="text" ref={location}
                                                            placeholder="The location associated with your project"/>
                            <label>Date: </label>
                            <input type="date" ref={date}
                                   placeholder="The day/first day of your project contents"/><br/>
                            <label>Photo: </label>
                            <label for="file" className="inputfile">Choose a file</label>
                            <input id="file" className="inputfile" type="file"
                                   onChange={setPhotoDataHandler}/><br/><br/>
                            <button className="cancel" type="button"
                                    onClick={props.viewProjectsHandler}>Cancel
                            </button>
                            <button type="submit" onClick={submitProjectHandler}>Submit</button>
                    </form>
                </div>
            </div>
        </main>
    )
};

export default NewProject;