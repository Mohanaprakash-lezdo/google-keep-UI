import {configureStore} from '@reduxjs/toolkit';
import notesReducer from '../features/NotesSlice';
import authReducer from "../features/authSlice";

const store=configureStore({
    reducer:{
        notes:notesReducer,
        auth: authReducer,
    }
})


export default store