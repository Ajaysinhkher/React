import { createSlice,createAsyncThunk  } from "@reduxjs/toolkit";
import axios from 'axios';
import songs from '../data/song';
import { Children } from "react";

const API_URL = "https://6801e29781c7e9fbcc439ddd.mockapi.io/Playlists"

const initialState = {
    playlists: [],
    showForm:false,
    selectedPlaylist:'',
    newPlaylistName:',',
    loading: false,
    error: null,
};

export const fetchPlaylists  = createAsyncThunk('playlists/fetchPalaylists',
    async(thunkAPI)=>{
        try{
            const response  = await axios.get(API_URL);
            // console.log(response.data);
            return response.data;

        }catch(error){
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)


export const createPlaylist = createAsyncThunk('playlists/createPlaylist',
    async(playlistData,thunkAPI)=>{
        const newplaylist = {
            name:playlistData.newPlaylistName,
            songs:[playlistData.id]
        }
        // console.log(newplaylist);
        
        try{
            console.log("playlistdata",playlistData);
            
            const response = await axios.post(API_URL,newplaylist);

            console.log(response.data);
            return response.data;
            
        }catch(error){
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)


const playlistSlice = createSlice({
    name:'playlists',
    initialState,

    reducers:{
        openPlaylistForm:(state)=>{
            state.showForm = true 
        },

        closePlaylistForm: (state) => {
            state.showForm = false;
            state.selectedPlaylist = '';
            state.newPlaylistName = '';
          },
        setSelectedPlaylist: (state, action) => {
            state.selectedPlaylist = action.payload;
        },
        setNewPlaylistName: (state, action) => {
            state.newPlaylistName = action.payload;
          },
    },

    extraReducers:(builder)=>{
     builder
        .addCase(fetchPlaylists.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchPlaylists.fulfilled,(state,action)=>{
            state.playlists = action.payload;
        })
        .addCase(fetchPlaylists.rejected,(state,action)=>{
            state.error = action.payload;
            state.loading = false;
        })

        // to create playlist:
        .addCase(createPlaylist.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(createPlaylist.fulfilled, (state, action) => {
            state.playlists.push(action.payload);
            state.loading = false;
          })
          .addCase(createPlaylist.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
          });
    }

});

export const { openPlaylistForm,setSelectedPlaylist ,setNewPlaylistName,closePlaylistForm} = playlistSlice.actions;
export default playlistSlice.reducer;