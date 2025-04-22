import { createSlice,createAsyncThunk  } from "@reduxjs/toolkit";
import axios from 'axios';

const API_URL = "https://6801e29781c7e9fbcc439ddd.mockapi.io/Playlists"

const initialState = {
    playlists: [],
    showForm:false,
    selectedPlaylist:'',
    selectedSongId:null,
    newPlaylistName:'',
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
            // console.log("playlistdata",playlistData);
            
            const response = await axios.post(API_URL,newplaylist);

            // console.log(response.data);
            return response.data;
            
        }catch(error){
            return thunkAPI.rejectWithValue(error.message)
        }
    }
)


export const addtoExistingPlaylist = createAsyncThunk('playlists/addtoExistingPlaylist',
    async({playlistId,songId},thunkAPI)=>{

        try{

            const state = thunkAPI.getState();
            const playlist  = state.playlists.playlists.find((p)=>p.id === playlistId);
            // console.log("selected playlist is :",playlist);

            if(!playlist)
            {
                throw error
            }

            const updatedSongs = playlist.songs.includes(songId)
            ? playlist.songs
            : [...playlist.songs, songId];

            // console.log(updatedSongs);
            
            const response = await axios.put(`${API_URL}/${playlistId}`, {
                ...playlist,
                songs: updatedSongs
        });

        return response.data;

    }catch (error) {

    
        return thunkAPI.rejectWithValue(error.message);
    }
 }
);


export const deletePlaylist = createAsyncThunk('playlists/deletePlaylist',
    async (playlistId, thunkAPI) => {
        await axios.delete(`${API_URL}/${playlistId}`);
        return playlistId;
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
            // console.log(state.selectedPlaylist);
            
        },
        setNewPlaylistName: (state, action) => {
            state.newPlaylistName = action.payload;
        },
        setSelectedSongId: (state, action) => {
            state.selectedSongId = action.payload;   
        },
    },

    extraReducers:(builder)=>{
     builder
        .addCase(fetchPlaylists.pending,(state)=>{
            state.loading = true;
            state.error = null;
        })
        .addCase(fetchPlaylists.fulfilled,(state,action)=>{
            state.loading = false;
            state.playlists = action.payload;
        })
        .addCase(fetchPlaylists.rejected,(state,action)=>{
            state.error = action.payload || 'failed to fetch the playlist';
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
          })
          .addCase(addtoExistingPlaylist.pending, (state) => {
            state.loading = true;
            state.error = null;
          })
          .addCase(addtoExistingPlaylist.fulfilled, (state, action) => {
            const updated = action.payload;
            const index = state.playlists.findIndex(p => p.id === updated.id);
            if (index !== -1) {
              state.playlists[index] = updated;
            }
            state.loading = false;
          })
          .addCase(addtoExistingPlaylist.rejected, (state, action) => {
            state.error = action.payload;
            state.loading = false;
          })
          .addCase(deletePlaylist.fulfilled, (state, action) => {
            state.playlists = state.playlists.filter(
              (p) => p.id !== action.payload
            );
          });
    }

});

export const { openPlaylistForm,setSelectedPlaylist ,setNewPlaylistName,closePlaylistForm,setSelectedSongId} = playlistSlice.actions;
export default playlistSlice.reducer;