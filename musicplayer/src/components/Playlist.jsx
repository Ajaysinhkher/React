import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchPlaylists, deletePlaylist } from '../features/playlistSlice';
import { playSong } from '../features/playerSlice';
import songs from '../data/song';
import { DNA } from 'react-loader-spinner';

function Playlist() {
  const dispatch = useDispatch();
  const { playlists, loading, error } = useSelector((state) => state.playlists);
  const [activePlaylist, setActivePlaylist] = useState(null);

  const getSongDetails = (id) => songs.find((song) => song.id === id);
  const togglePlaylist = (id) => setActivePlaylist((prev) => (prev === id ? null : id));
  const handlePlaySong = (e, songId) => {
    e.preventDefault();
    dispatch(playSong(songId));
  };

  useEffect(() => {
    dispatch(fetchPlaylists());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this playlist?')) {
      dispatch(deletePlaylist(id));
    }
  };

  return (
    <div className="md:absolute md:right-4 top-20 w-full md:w-80 max-h-[80vh] overflow-y-auto z-20 px-4 md:px-0">
      <div className="bg-white rounded-lg shadow-xl border border-gray-200 p-4">
        <h2 className="text-lg font-bold mb-3 text-center border-b pb-2">🎵 Playlists</h2>

        {loading ? (
          <div className="flex justify-center items-center py-6">
            <DNA visible={true} height={60} width={60} ariaLabel="dna-loading" />
          </div>
        ) : error ? (
          <p className="text-center text-red-500">Error: {error}</p>
        ) : playlists.length === 0 ? (
          <p className="text-center text-gray-500">No playlists created yet.</p>
        ) : (
          playlists.map((playlist) => (
            <div key={playlist.id} className="mb-4 border rounded-md bg-gray-50 overflow-hidden">
              <div className="flex items-center justify-between px-4 py-2 bg-gray-100">
                <button
                  onClick={() => togglePlaylist(playlist.id)}
                  className="text-left font-semibold text-sm md:text-base w-full truncate"
                >
                  {playlist.name}
                </button>
                <button
                  onClick={() => handleDelete(playlist.id)}
                  className="text-gray-500 hover:text-red-500 transition ml-2"
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
                        onClick={(e) => handlePlaySong(e, songId)}
                        key={songId}
                        className="p-2 flex items-center gap-3 border-b last:border-b-0 hover:bg-white rounded-md cursor-pointer transition"
                      >
                        <img
                          src={song.cover}
                          alt={song.title}
                          className="w-12 h-12 rounded object-cover shadow"
                        />
                        <div className="flex flex-col overflow-hidden">
                          <span className="font-medium text-sm truncate">{song.title}</span>
                          <span className="text-xs text-gray-500 truncate">{song.artist}</span>
                        </div>
                      </li>
                      );
                    })
                  ) : (
                    <li className="text-sm text-gray-500 p-2">No songs in this playlist.</li>
                  )}
                </ul>
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default Playlist;
