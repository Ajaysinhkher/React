import React, { useState,useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { fetchPlaylists,deletePlaylist } from '../features/playlistSlice';
import songs from '../data/song';

function Playlist() {

    
const dispatch = useDispatch();
const {playlists,loading,error} = useSelector((state)=>state.playlists);
// console.log(playlists);

  const [activePlaylist, setActivePlaylist] = useState(null);

  //get song details to show in the playlists 
  const getSongDetails = (id) => songs.find((song) => song.id === id);

  const togglePlaylist = (id) => {
    setActivePlaylist(prev => (prev === id ? null : id));
  };

    //get data from ayncthunk api 
  useEffect(() => {
    dispatch(fetchPlaylists());
  }, [dispatch]);


  const handleDelete = (id)=>{
    if (window.confirm("Are you sure you want to delete this playlist?")) {
      dispatch(deletePlaylist(id));
    }
  }
  // console.log(playlists);
  
  return (
    <div className="absolute right-4 top-24 w-72">
      <h2 className="text-xl font-bold mb-4 text-center border-b pb-2">🎵 Playlists</h2>

      {playlists.map((playlist) => (
        <div key={playlist.id} className="mb-4 border rounded-lg shadow bg-white">
          <div className="flex items-center justify-between px-4 py-2 hover:bg-gray-100">
            <button
              onClick={() => togglePlaylist(playlist.id)}
              className="text-left text-base font-semibold w-full"
            >
              {playlist.name}
            </button>
            <button
              onClick={() => handleDelete(playlist.id)}
              className="ml-2 text-gray-400 hover:text-red-600 transition"
              title="Delete Playlist"
            >
              🗑️
            </button>
          </div>

          {activePlaylist === playlist.id && (
            <ul className="px-4 pb-3">
              {playlist.songs.length > 0 ? (
                playlist.songs.map((songId) => {
                  const song = getSongDetails(songId);
                  return (
                    <li
                      key={songId}
                      className="p-2 mt-1 border rounded text-sm hover:bg-gray-50"
                    >
                      <strong>{song.title}</strong> — {song.artist}
                    </li>
                  );
                })
              ) : (
                <li className="text-sm text-gray-500 p-2">No songs in this playlist.</li>
              )}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

export default Playlist;
