import {configureStore} from "@reduxjs/toolkit";

import authReducer from './auth-slice';
import uiReducer from './ui-slice';
import profileReducer from './profile-slice';

const store = configureStore({
    reducer: {authSlice: authReducer, uiSlice: uiReducer, profileSlice: profileReducer}
});

export default store;