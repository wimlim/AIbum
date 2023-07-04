import React from "react";
import { PhotoProps } from "../defaultConfiguration";

export interface InitialStateProps
{
    photo:PhotoProps[]
}

export interface GlobalShareContextProps
{
    state:InitialStateProps,
    dispatch:React.Dispatch<any>
}

export const initialState:InitialStateProps = {
    photo:[] 
}
export const GlobalShareReducer = (state:InitialStateProps = initialState, action:any) => {
    switch (action.type) {
        case 'add':
            return {photo: [...state.photo, action.payload]};
        case 'set':
            return {photo: action.payload};
        case 'del':
            return {photo: state.photo.filter((item:PhotoProps)=>item.id!==action.payload)};
        default:
            return state;
    }
}

export const GlobalShareContext = React.createContext<GlobalShareContextProps>({state:initialState,dispatch:()=>{}});