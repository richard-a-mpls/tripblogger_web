import {createSlice} from "@reduxjs/toolkit";

const initialState = {
    pageState: 'welcome_message'
};

const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        showProjectView(state) {
            state.pageState = 'project_view'
        },
        showWelcomePage(state) {
            state.pageState = 'welcome_message';
        },
        changePageState(state, action) {
            state.pageState = action.payload;
        },
        setPageState(state, action) {
            state.pageState = action.payload;
        }
    }
});

export const uiActions = uiSlice.actions;

export default uiSlice.reducer;
