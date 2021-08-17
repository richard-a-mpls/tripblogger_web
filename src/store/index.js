import {configureStore} from "@reduxjs/toolkit";

import authReducer from './auth-slice';
import uiReducer from './ui-slice';

const store = configureStore({
    reducer: {authSlice: authReducer, uiSlice: uiReducer}
});

export default store;