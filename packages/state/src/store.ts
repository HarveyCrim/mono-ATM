import { combineReducers, configureStore } from "@reduxjs/toolkit";
import bankReducer from "./bankSlice"
import { persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import { api } from "./api";
import createWebStorage from "redux-persist/es/storage/createWebStorage";

import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux"
import { create } from "domain";

const createNoopStorage = () => {
    return {
        getItem(_key: any){
            return Promise.resolve(null)
        },
        setItem(_key: any, value: any){
            return Promise.resolve(value)
        },
        removeItem(_key: any){
            return Promise.resolve()
        }
    }
}

const storage = typeof window == "undefined" ? createNoopStorage() : createWebStorage("local")

const persistConfig = {
    key: "root",
    storage,
    whitelist: ["bank"]
}

const rootReducer = combineReducers({
    bank: bankReducer,
    [api.reducerPath]: api.reducer
})

const persistedReducer = persistReducer(persistConfig, rootReducer)

export const makeStore = () => {
    return configureStore({
        reducer: persistedReducer,
        middleware: (getDefault) => 
            getDefault({
                serializableCheck: {
                    ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
                }
            }).concat(api.middleware)
    })
}
export type AppStore = ReturnType<typeof makeStore>
export type IRootState = ReturnType<AppStore["getState"]>
export type AppDispatch = AppStore["dispatch"]
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<IRootState> = useSelector