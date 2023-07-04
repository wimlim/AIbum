import React, { useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import reportWebVitals from './reportWebVitals';
import {RouterProvider} from "react-router-dom";
import {AIbum_router} from "./AIbum_router";
import "./index.css";
import { initialState, GlobalShareReducer, GlobalShareContext, GlobalShareContextProps } from './utils/GlobalShareReducer';
import { getPhotos } from './server/PhotoServer';
import { PhotoProps, BackendPictureProps } from './defaultConfiguration';
import { message } from 'antd';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

const App:React.FC = ()=>{

  const [state,dispatch] = React.useReducer(GlobalShareReducer,initialState);

  useEffect(
    ()=>
    {
      if(window.location.pathname==="/login")return;
      let pictures:PhotoProps[]=[];
      getPhotos({}).then(
          (response)=>{
              console.log(response)   
              message.info("正在获取图片信息");
              return response.json();
          }
      ).then(
          (data:BackendPictureProps[])=>{
              pictures= data.map(
                  (picture)=>{
                      return {
                          id:picture.id,
                          name:picture.name,
                          url:picture.image_data,
                          time:new Date(picture.date),
                      } as PhotoProps
                  } 
              )
              dispatch({type:"set",payload:pictures});
              message.success("图片信息获取成功");
          }
      ).catch(
          (error)=>{
              console.log(error);
          })
          dispatch({type:"set",payload:pictures});
    },[]
  )
  const store:GlobalShareContextProps = {
    state:state,
    dispatch:dispatch
  }

  console.log("state value:",state);
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
