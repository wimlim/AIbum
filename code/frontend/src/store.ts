/**
 * @brief   store.ts is the file that contains the store of the application using React Redux.
 * @file    store.ts
 * @description React Redux store.
 */

import {configureStore} from '@reduxjs/toolkit';
import picturesSlice from './picturesSlice';

export const store = configureStore({  
    reducer: {
        // Add reducers here
        allPictures: picturesSlice
    }
})

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;