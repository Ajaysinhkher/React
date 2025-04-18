import React, { useState,useEffect } from 'react';
import { useSelector,useDispatch } from 'react-redux';
import { fetchPlaylists } from '../features/playlistSlice';
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

  console.log(playlists);
  

  return (
    <div className="absolute right-4 top-24 w-64">
      <h2 className="text-xl font-bold mb-4 text-center border-b pb-2">🎵 Playlists</h2>

      {playlists.map((playlist) => (
        <div key={playlist.id} className="mb-4 border rounded-lg shadow bg-white">
          <button onClick={() => togglePlaylist(playlist.id)} className="w-full px-4 py-2 font-semibold text-left hover:bg-gray-100">
            {playlist.name}
          </button>

          {activePlaylist === playlist.id && (
            <ul className="px-4 pb-3">
              {playlist.songs.map((songId) => {
                const song = getSongDetails(songId);
                return (
                  <li key={songId} className="p-2 mt-1 border rounded text-sm hover:bg-gray-50">
                    <strong>{song.title}</strong> — {song.artist}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      ))}
    </div>
  );
}

export default Playlist;
