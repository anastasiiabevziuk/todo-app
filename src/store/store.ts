import { configureStore } from '@reduxjs/toolkit';
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux';
import { listsApi } from '../api/listApi';
import { itemsApi } from '../api/itemApi';
import authSlice from "./slice/authSlice";



export const store = configureStore({
    reducer: {
        [listsApi.reducerPath]: listsApi.reducer,
        [itemsApi.reducerPath]: itemsApi.reducer,
        authSlice,
    },
    middleware: (getDefaultMiddlware) => getDefaultMiddlware().concat([listsApi.middleware, itemsApi.middleware]),
    
});

export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch
export type RootState = ReturnType<typeof store.getState>
export const useTypedSelector: TypedUseSelectorHook<RootState> = useSelector