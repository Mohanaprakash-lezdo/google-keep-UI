import {configureStore} from '@reduxjs/toolkit';
import notesReducer from '../features/NotesSlice';

const store=configureStore({
    reducer:{
        notes:notesReducer
    }
})


export default store