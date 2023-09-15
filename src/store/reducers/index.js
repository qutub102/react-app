import { combineReducers } from "@reduxjs/toolkit";
import formReducer from './formReducer'

const reducers = combineReducers({
    form: formReducer
})

export default reducers