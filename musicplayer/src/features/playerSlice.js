import { createSlice } from "@reduxjs/toolkit";
import songs from '../data/song'

const initialState = {
    songs:songs,
    currentId: null,
    isPlaying: false,
    toggleButton:false,
}

const playerSlice = createSlice({
    name:'player',
    initialState,
    reducers:{
        playSong:(state,action)=>{
          state.currentId = action.payload,
          state.isPlaying = true,
          state.toggleButton = true;
          // console.log(state.toggleButton);     
        },

        togglePlay:(state)=>{
            state.isPlaying = !state.isPlaying,
            state.toggleButton = !state.toggleButton
        },
        nextPlay:(state)=>{
            state.currentId++
            if(state.currentId > state.songs.length)
            {
                state.currentId = 1
            }
        },

        prevPlay:(state)=>{
            state.currentId--
            // console.log(state.currentId);
            
            if(state.currentId == 0 )
            {
                state.currentId = state.songs.length
                // console.log(state.currentId);
                
            }
        },

    },
});

export const  { playSong,togglePlay,nextPlay ,prevPlay} = playerSlice.actions;
export default playerSlice.reducer;

