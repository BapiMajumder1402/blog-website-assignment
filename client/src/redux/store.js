import { configureStore } from '@reduxjs/toolkit';
import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage'; 
import authReducer from './reducers/authSlice';
import { setupListeners } from '@reduxjs/toolkit/query';
import blogApi from './apis/blogApis';
import commentsApi from './apis/commentApis';

const persistConfig = {
    key: 'root',
    storage,
};


const persistedAuthReducer = persistReducer(persistConfig, authReducer);

const store = configureStore({
    reducer: {
        auth: persistedAuthReducer,
        [blogApi.reducerPath]: blogApi.reducer, 
        [commentsApi.reducerPath]: commentsApi.reducer, 
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(blogApi.middleware,commentsApi.middleware), 
});


setupListeners(store.dispatch);


export const persistor = persistStore(store);
export default store;
