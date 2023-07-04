import React from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {RouterProvider} from "react-router-dom";
import {AIbum_router} from "./AIbum_router";
import "./index.css";
import {store} from "./store";
import { initialState, GlobalShareReducer, GlobalShareContext, InitialStateProps, GlobalShareContextProps } from './utils/GlobalShareReducer';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const App:React.FC = ()=>{

  const [state,dispatch] = React.useReducer(GlobalShareReducer,initialState);

  const store:GlobalShareContextProps = {
    state:state,
    dispatch:dispatch
  }

  return (
    <React.StrictMode>
      <GlobalShareContext.Provider value={store}>
        <RouterProvider router={AIbum_router}/>
      </GlobalShareContext.Provider>
    </React.StrictMode>
  )
}

root.render(
  <App/>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
