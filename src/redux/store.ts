import { configureStore } from "@reduxjs/toolkit";
import { useDispatch } from "react-redux";
import { baseApi } from "./api/baseApi";

const store = configureStore({
    reducer: {
        [baseApi.reducerPath]: baseApi.reducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(baseApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export const useAppDispatch = useDispatch.withTypes<AppDispatch>()
export default store