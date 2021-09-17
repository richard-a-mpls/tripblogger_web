import {createSlice} from "@reduxjs/toolkit";
import axios from "axios";
import {STORAGE_APITOKEN} from "./auth-slice";

const initialState = {
    projectList: [],
    publicProjectList: [],
    connectionsProjectList: [],
    activeProject: {}
};

export const projectsEndpoint = (process.env.REACT_APP_PROJECTS_API || "https://tripblogger-api-spring.azurewebsites.net") + "/v1/projects";
export const projectsMeEndpoint = (process.env.REACT_APP_PROJECTS_API || "https://tripblogger-api-spring.azurewebsites.net") + "/v1/me/projects";
export const prevProjectsEndpoint = (process.env.REACT_APP_PYTHON_API || "https://tripblogger-api.azurewebsites.net") + "/v1/projects";



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
        },
        setPublicProjectList(state, action) {
            state.publicProjectList = action.payload;
        },
        setConnectionsProjectList(state, action) {
            state.connectionsProjectList = action.payload;
        }
    }
});

export const loadActiveProject = (projectId) => {
    return dispatch => {
        if (projectId) {
        axios.get(`${projectsMeEndpoint}/${projectId}`, {
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
        axios.get(projectsMeEndpoint, {
            headers: {Authorization: `Bearer ${localStorage.getItem(STORAGE_APITOKEN)}`}
        })
            .then(response => {
                dispatch(projectActions.setProjectList(response.data));
            });
    }
}

export const loadPublicProjectList = (isAuthenticated) => {
    return dispatch => {
        console.log(projectsEndpoint);
        console.log(process.env.REACT_APP_PROJECTS_API);

        let options = {};
        if (localStorage.getItem(STORAGE_APITOKEN) && isAuthenticated) {
            options = {headers: {Authorization: `Bearer ${localStorage.getItem(STORAGE_APITOKEN)}`}}
        } else {
            options = {headers: {Authorization: `Bearer nothing`}}
        }
        axios.get(projectsEndpoint, options)
            .then(response => {
                console.log(response.data);
                dispatch(projectActions.setPublicProjectList(response.data));
            });
    }
}

export const removeProject = (projectId) => {
    return dispatch => {
        axios.delete(`${projectsMeEndpoint}/${projectId}`,
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
        axios.patch(`${projectsMeEndpoint}/${projectId}`, JSON.stringify(data), { // receive two parameter endpoint url ,form data
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
        axios.post(projectsMeEndpoint, JSON.stringify(data), { // receive two parameter endpoint url ,form data
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