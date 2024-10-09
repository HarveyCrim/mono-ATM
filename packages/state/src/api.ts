import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react"

const base_url = "http://localhost:4000"

export const api = createApi({
    baseQuery: fetchBaseQuery({baseUrl: base_url}),
    reducerPath: "api",
    tagTypes: [],
    endpoints: (build) => ({
        
    })
})