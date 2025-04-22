import React from "react";
import {useSelector} from 'react-redux'
import SongCard from './SongCard'
import MusicPlayer from './MusicPlayer';
import Playlist from "./Playlist";


const SongList = ()=>{
    
   
    const {songs,currentId}  = useSelector((state)=>state.player)
    // console.log(currentId);
        
    return (
      <div style={{ display: 'flex', flexWrap: 'wrap' }}>
      {songs.map((song, index) => (
        <SongCard key={song.id} song={song} index={index} />
      ))}
      
    {currentId !==null ? <MusicPlayer id={currentId}/>:''}

    {/* proivde the condition to render the playlist component  */}
    <Playlist/>
    </div>
  );
}

export default SongList