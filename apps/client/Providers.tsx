"use client"
import {Provider} from "react-redux"
import { setupListeners } from "@reduxjs/toolkit/query"
import persistStore from "redux-persist/lib/persistStore"
import {AppStore, makeStore} from "@repo/state/store"
import { useRef } from "react"
import { PersistGate } from "redux-persist/integration/react"
import { SessionProvider } from "next-auth/react"

export const Providers = ({children}: {children: React.ReactNode}) => {
    const storeRef = useRef<AppStore>()
    if(!storeRef.current){
        storeRef.current = makeStore()
        setupListeners(storeRef.current.dispatch)
    }
    const persistor = persistStore(storeRef.current)
    return (
        <Provider store = {storeRef.current}>
            <PersistGate loading = {null} persistor={persistor}>
                <SessionProvider>
                    {children}
                </SessionProvider>
            </PersistGate>
        </Provider>
    )
}
