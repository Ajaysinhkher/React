import React, { useState ,useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchWeather } from '../features/weatherSlice';

const Weather = () => {
  const dispatch = useDispatch();
  const [city, setCity] = useState('');
  const [userLocation,setUserLocation] = useState(null);


  const getUserLocation = () => {
    // if geolocation is supported by the users browser
    if (navigator.geolocation) {
     
        
      // get the current users location
      navigator.geolocation.getCurrentPosition(
        (position) => {
          // save the geolocation coordinates in two variables
          const { latitude, longitude } = position.coords;
         
          
          // update the value of userlocation variable
          setUserLocation({ lat:latitude, lon:longitude });
        },
        // if there was an error getting the users location
        (error) => {
          console.error('Error getting user location:', error);
        }
      );
    }
    // if geolocation is not supported by the users browser
    else {
      console.error('Geolocation is not supported by this browser.');
    }
  };

  useEffect(()=>{
    getUserLocation();
  },[]);

  useEffect(()=>{
    if(userLocation)
    {
        dispatch(fetchWeather(userLocation))
    }

  },[userLocation, dispatch])


  const { weatherData, status, error } = useSelector((state) => state.weather);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim() !== '') {
      dispatch(fetchWeather({city}));
    }
  };

  return (
    <div className="flex flex-col items-center text-center mt-20">
      <h2 className="text-4xl font-semibold mb-6">🌦 Weather App</h2>
      <form onSubmit={handleSubmit} className="mb-4 flex justify-center">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="p-3 text-lg w-60 border border-gray-300 rounded-l-md focus:outline-none"
        />
        <button
          type="submit"
          className="p-3 text-lg bg-blue-500 text-white rounded-r-md hover:bg-blue-600"
        >
          Get Weather
        </button>
      </form>


      {status === 'loading' && <p className="text-lg">Loading...</p>}
      {status === 'failed' && <p className="text-red-600">{error}</p>}

      {status === 'succeeded' && weatherData && (
        <div className="mt-6 max-w-sm w-full p-6 bg-blue-100 rounded-sm shadow-lg">
          <h2 className="text-2xl font-semibold">{weatherData.name}</h2>
          <p className="text-lg text-blue-500 mt-2">🌡 {weatherData.main.temp}°C</p>
          <p className="text-lg text-gray-600 mt-2">🌥 {weatherData.weather[0].description}</p>
        </div>
      )}
    </div>
  );
};

export default Weather;
