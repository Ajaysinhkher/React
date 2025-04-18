import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { playSong } from "../features/playerSlice";
import {
  openPlaylistForm,
  setSelectedPlaylist,
  setNewPlaylistName,
  closePlaylistForm,
  fetchPlaylists,
  createPlaylist,
} from "../features/playlistSlice";


const SongCard = ({ song }) => {
  const dispatch = useDispatch();

  // UI states
  const [showOptions, setShowOptions] = useState(false);
  const { showForm, selectedPlaylist, newPlaylistName, playlists } =
    useSelector((state) => state.playlists);

  // fetch api  from api:
  let existingPlaylists = [];
  existingPlaylists = playlists; //playlists is an object stored in an array
  // console.log("existingPlaylist:", existingPlaylists);

  // manage states for musicplayer
  const handleClick = () => {
    dispatch(playSong(song.id));
  };

  const handleMoreClick = (e) => {
    e.stopPropagation();
    // console.log("add to cart",showOptions);
    setShowOptions((prev) => !prev);
    // console.log(showOptions);
  };

  // console.log(showOptions);
  const handleAddToPlaylist = (e) => {
    e.stopPropagation();
    setShowOptions(false);
    dispatch(openPlaylistForm());
    // console.log(showForm);
  };

  const handleConfirmAdd = (e) => {
    e.stopPropagation();
    // const playlistToUse = newPlaylistName.trim() || selectedPlaylist;
    const id = song.id;
    
    if (newPlaylistName.trim()) {
      console.log("inside newplay");
      dispatch(createPlaylist({newPlaylistName,id}));
      dispatch(closePlaylistForm());
    }
    else{

      // dispatch()
    }
    

    // Reset
    setSelectedPlaylist("");
    setNewPlaylistName("");
    dispatch(closePlaylistForm());
  };

  const closeModal = () => {
    dispatch(closePlaylistForm());
    setSelectedPlaylist("");
    setNewPlaylistName("");
    setShowOptions(false);
  };

  return (
    <>
      {/* Main Song Card */}
      <div
        onClick={handleClick}
        className="relative cursor-pointer w-44 m-4 text-center bg-white shadow-md rounded-xl p-3 transition hover:shadow-lg"
      >
        {/* More Button */}
        <div className="absolute top-2 right-2" onClick={handleMoreClick}>
          <button className="text-gray-600 text-lg font-bold px-2 hover:text-black">
            ⋮
          </button>
        </div>

        {/* Dropdown menu */}
        {showOptions && (
          <div className="absolute right-2 top-10 bg-white border border-gray-200 rounded shadow-md text-left z-10 w-40">
            <button
              onClick={handleAddToPlaylist}
              className="block px-4 py-2 text-sm hover:bg-gray-100 w-full text-left"
            >
              Add to Playlist
            </button>
          </div>
        )}

        <img
          src={song.cover}
          alt={song.title}
          className="w-full h-40 object-cover rounded-md"
        />
        <h4 className="mt-2 text-base font-semibold truncate">{song.title}</h4>
        <p className="text-sm text-gray-500 truncate">{song.artist}</p>
      </div>

      {/* Modal Form */}
      {showForm && (
        <form
          className="fixed inset-0 bg-black bg-opacity-40 z-30 flex items-center justify-center"
          onSubmit={handleConfirmAdd}
        >
          <div
            className="bg-white p-5 rounded-lg shadow-xl w-80 relative z-40"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-lg font-bold mb-3">Add to Playlist</h3>

            <label className="text-sm font-semibold">Select Playlist:</label>
            <select
              value={selectedPlaylist}
              onChange={(e) => dispatch(setSelectedPlaylist(e.target.value))}
              className="w-full mt-1 mb-3 border rounded px-2 py-1 text-sm"
            >
              <option value="">-- Choose one --</option>
              {existingPlaylists.map((playlist) => (
                <option key={playlist.id} value={playlist.name}>
                  {playlist.name}
                </option>
              ))}
            </select>

            <label className="text-sm font-semibold">Or New Playlist:</label>
            <input
              type="text"
              placeholder="Enter playlist name"
              value={newPlaylistName}
              onChange={(e) => dispatch(setNewPlaylistName(e.target.value))}
              className="w-full mt-1 mb-3 border rounded px-2 py-1 text-sm"
            />

            <div className="flex justify-end space-x-2">
              <button
                onClick={closeModal}
                className="px-4 py-1 bg-gray-300 text-sm rounded hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmAdd}
                className="px-4 py-1 bg-blue-500 text-white text-sm rounded hover:bg-blue-600"
              >
                Add
              </button>
            </div>
          </div>
        </form>
      )}
    </>
  );
};

export default SongCard;
