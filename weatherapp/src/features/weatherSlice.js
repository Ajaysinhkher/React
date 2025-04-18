import {createSlice,createAsyncThunk} from '@reduxjs/toolkit'


const API_KEY = '2426dab20b76e15f23909df3f711cbb5';

// creating a const function to fetch data from third party api using asyncthunk
export const fetchWeather = createAsyncThunk('weather/fetchWeather',
    async(params, thunkAPI)=>{

    //   console.log(params);
      
          try{
            let url = '';

            if (params.lat && params.lon) {
              url = `https://api.openweathermap.org/data/2.5/weather?lat=${params.lat}&lon=${params.lon}&appid=${API_KEY}&units=metric`;
            } else if (params.city) {
              url = `https://api.openweathermap.org/data/2.5/weather?q=${params.city}&appid=${API_KEY}&units=metric`;
            } else {
              throw new Error('No location provided');
            }
      
            const response = await fetch(url);
            if (!response.ok) {
              throw new Error('Location not found');
            }
      
            const data = await response.json();
            return data;

        }catch(err){
            return thunkAPI.rejectWithValue(err.message);
        }
    }
);


const weatherSlice = createSlice({
    name:'weather',
    initialState:{
        city:'',
        weatherData: null,
        status:'idle',
        error:null
    },

    reducers: {},

    extraReducers: (builder) => {
        builder
          .addCase(fetchWeather.pending, (state) => {
            state.status = 'loading';
            state.error = null;
          })
          .addCase(fetchWeather.fulfilled, (state, action) => {
            state.status = 'succeeded';
            state.weatherData = action.payload;
          })
          .addCase(fetchWeather.rejected, (state, action) => {
            state.status = 'failed';
            state.error = action.payload || 'Something went wrong';
          });
      },
});

export default weatherSlice.reducer;