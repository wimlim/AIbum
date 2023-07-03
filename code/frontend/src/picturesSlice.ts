import {createSlice, PayloadAction} from '@reduxjs/toolkit';
import type { RootState } from './store';
import { PhotoProps } from './defaultConfiguration';

interface PicturesState {
    pictures: PhotoProps[];
}

const initialState: PicturesState = {
    pictures: []
}

export const picturesSlice = createSlice({
    name: 'pictures',
    initialState,
    reducers:{
        addPicture:(state, action: PayloadAction<PhotoProps>) => {
            state.pictures.push(action.payload);
        },
        setPictures:(state, action: PayloadAction<PhotoProps[]>) => {
            state.pictures = action.payload;
        },
        removePictre:(state, action: PayloadAction<number>) => {
            //state.pictures.splice(action.payload,1);
        }
    },
});

export const { addPicture ,setPictures,removePictre} = picturesSlice.actions;

export const allPictures = (state: RootState) => state.allPictures.pictures;

export default picturesSlice.reducer;