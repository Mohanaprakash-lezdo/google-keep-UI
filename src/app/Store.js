import {configureStore} from '@reduxjs/toolkit';
import notesReducer from '../features/NotesSlice';
import authReducer,{authMiddleware} from "../features/authSlice";

const store=configureStore({
    reducer:{
        notes:notesReducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authMiddleware),
})


export default store