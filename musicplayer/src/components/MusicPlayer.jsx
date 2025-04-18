import React,{useRef,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { togglePlay, nextPlay , prevPlay } from '../features/playerSlice';
import songs from '../data/song';


const MusicPlayer = ({ id }) => {
  const dispatch = useDispatch();
  const audioRef = useRef(null);  //initially audio.current property set to null.
  const toggleButton = useSelector((state) => state.player.toggleButton); // Get current state

  const song = songs.find((s) => s.id === id);
  if (!song) return null;

  const handleTogglePlay = () => {
    dispatch(togglePlay());
  };



//   functions to handle the next song and prev song :

const playNext = ()=>{
    dispatch(nextPlay());
}

const playPrev = ()=>{
    dispatch(prevPlay());
}


//need to handle the audio husing useRef and html <ausio element>
// use useEffect to change the audio play/pause based on togglebutton action:

useEffect(()=>{
    if (!audioRef.current) 
        {
            console.log("not mounted");   
            return;
        }
    
    if (toggleButton) {
        audioRef.current.play();
      } else {
        audioRef.current.pause();
      }
},[toggleButton,song?.src])




  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white flex items-center justify-between px-6 py-4 z-50 shadow-md">
      {/* Song Info */}
      <div className="flex items-center space-x-4">
        <img
          src={song.cover}
          alt={song.title}
          className="w-14 h-14 object-cover rounded-md"
        />
        <div>
          <h4 className="text-lg font-semibold">{song.title}</h4>
          <p className="text-sm text-gray-400">{song.artist}</p>
        </div>
      </div>

      {/* Controls */}
      <div className="flex items-center space-x-6 text-2xl">
        <button onClick = {playPrev} className="hover:text-gray-400">⏮️</button>

        {/* Play/Pause Toggle */}
        <button onClick={handleTogglePlay} className="hover:text-gray-400">
          {toggleButton ? '⏸️' : '▶️'}
        </button>

        <button onClick = {playNext} className="hover:text-gray-400">⏭️</button>

        <audio controls ref={audioRef} src={song.src} />
      </div>
    </div>
  );
};

export default MusicPlayer;
