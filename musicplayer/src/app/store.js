import {configureStore} from '@reduxjs/toolkit';
import playerReducer from '../features/playerSlice';
import playlistReducer from '../features/playlistSlice'
export const store = configureStore({
    reducer:{
        player:playerReducer,
        playlists:playlistReducer,
    }
})