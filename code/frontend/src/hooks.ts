/**
 * @brief   跟随官方文档，使用Redux Toolkit创建store
 */

import { TypedUseSelectorHook,useDispatch,useSelector } from "react-redux";

import type { RootState,AppDispatch } from "./store";

export const useAppDispatch : () => AppDispatch = useDispatch;
export const useAppSelector : TypedUseSelectorHook<RootState> = useSelector;