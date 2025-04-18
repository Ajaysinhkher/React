import React from 'react';
import { useDispatch } from 'react-redux';
import { playSong } from '../features/playerSlice'


const SongCard = ({song}) => {
  const dispatch = useDispatch();
 

  const handleClick = () => {
    dispatch(playSong(song.id));  //see the structure at slice 
    // console.log(song.id);
    
  };

  return (
    <div onClick={handleClick} className="cursor-pointer w-40 m-4 text-center">
      <img src={song.cover} alt={song.title} className="w-full h-40 object-cover rounded-md"/>
      <h4 className="mt-2 text-base font-semibold">{song.title}</h4>
      <p className="text-sm text-gray-500">{song.artist}</p>
    </div>



  );
};

export default SongCard;
