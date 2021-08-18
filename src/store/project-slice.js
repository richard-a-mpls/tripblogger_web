import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {STORAGE_APITOKEN} from "./auth-slice";

const initialState = {
    projectList: [],
    activeProject: {}
};

const projectSlice = createSlice({
    name: 'projectSlice',
    initialState,
    reducers: {
        addProject(state, action) {

        },
        removeProject(state, action) {
            state.projectList = state.projectList.filter((prj => {
                return prj._id !== action.payload;
            }));
        },
        updateProject(state, action) {
            const idx = state.projectList.findIndex(({_id}) => _id === action.payload._id);
            if (idx >= 0) {
                state.projectList[idx] = action.payload;
            } else {
                state.projectList.unshift(action.payload);
            }
        },
        setProjectList(state, action) {
            state.projectList = action.payload;
        },
        setActiveProject(state, action) {
            state.activeProject = action.payload;
        }
    }
});

export const loadActiveProject = (projectId) => {
    return dispatch => {
        if (projectId) {
        axios.get('http://localhost:8080/v1/projects/' + projectId, {
            headers: {Authorization: `Bearer ${localStorage.getItem(STORAGE_APITOKEN)}`}
        })
            .then(response => {
                dispatch(projectActions.setActiveProject(response.data));
            });
        } else {
            // create a new empty project
            // TODO - consider setting up some defaults like date, etc...
            dispatch(projectActions.setActiveProject({}));
        }

    }
}

export const loadProjectList = () => {
    return dispatch => {
        axios.get('https://my-react.local:3000/v1/me/projects', {
            headers: {Authorization: `Bearer ${localStorage.getItem(STORAGE_APITOKEN)}`}
        })
            .then(response => {
                dispatch(projectActions.setProjectList(response.data));
            });
    }
}

export const removeProject = (projectId) => {
    return dispatch => {
        axios.delete('https://my-react.local:3000/v1/me/projects/' + projectId,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer ' + localStorage.getItem(STORAGE_APITOKEN)
                }
            })
            .then(response => {
                console.log(response.data);
                dispatch(projectActions.removeProject(projectId))
            });
    }
}

export const updateProject = (projectId, data) => {
    return dispatch => {
        axios.patch('http://localhost:8080/v1/me/projects/' + projectId, JSON.stringify(data), { // receive two parameter endpoint url ,form data
            headers: {Authorization: `Bearer ${localStorage.getItem(STORAGE_APITOKEN)}`, 'Content-Type': 'application/json',}
        })
            .then(response => {
                dispatch(projectActions.updateProject(response.data));
                dispatch(projectActions.setActiveProject(response.data));
            });
    }
}

export const createProject = (data) => {
    return dispatch => {
        axios.post('http://localhost:8080/v1/me/projects', JSON.stringify(data), { // receive two parameter endpoint url ,form data
            headers: {
                Authorization: `Bearer ${localStorage.getItem(STORAGE_APITOKEN)}`,
                'Content-Type': 'application/json',
            }
        })
            .then(response => {
                dispatch(projectActions.updateProject(response.data));
                dispatch(projectActions.setActiveProject(response.data));
            });
    }
}

export const projectActions = projectSlice.actions;
export default projectSlice.reducer;