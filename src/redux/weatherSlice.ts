'use client';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

interface CityWeather {
  name: string;
  temperature: number;
  humidity: number;
  windSpeed: number;
  forecast: { date: string; temp: number }[];
}

export interface WeatherState {
  cities: CityWeather[];
  pinnedCities: string[];
  status: 'idle' | 'loading' | 'failed';
  error: string | null;
}

const initialState: WeatherState = {
  cities: [],
  pinnedCities: [],
  status: 'idle',
  error: null,
};

export const fetchWeather = createAsyncThunk('weather/fetchWeather', async (city: string) => {
  try {
    const response = await axios.get(
      `https://api.weatherapi.com/v1/forecast.json?key=${process.env.REACT_APP_WEATHER_APP}&q=${city}&days=5&aqi=no&alerts=no`
    );

    if (!response.data || !response.data.location || !response.data.current || !response.data.forecast) {
      throw new Error('Invalid API response format');
    }

    return {
      name: response.data.location.name,
      temperature: response.data.current.temp_c,
      humidity: response.data.current.humidity,
      windSpeed: response.data.current.wind_kph,
      forecast: response.data.forecast.forecastday.map((day: { date: string; day: { avgtemp_c: string } }) => ({
        date: day.date,
        temp: day.day.avgtemp_c,
      })),
    };
  } catch (error: unknown) {
    console.log(error);
  }
});

export const weatherSlice = createSlice({
  name: 'weather',
  initialState,
  reducers: {
    pinCity: (state, action) => {
      if (!state.pinnedCities.includes(action.payload)) {
        state.pinnedCities.push(action.payload);
      }
    },
    removeCity: (state, action) => {
      state.cities = state.cities.filter((city) => city.name !== action.payload);
      state.pinnedCities = state.pinnedCities.filter((city) => city !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchWeather.pending, (state) => {
        state.status = 'loading';
        state.error = null;
      })
      .addCase(fetchWeather.fulfilled, (state, action) => {
        state.status = 'idle';

        if (!action.payload || !action.payload.name) {
          state.error = 'Invalid weather data received.';
          return;
        }

        const isCityAlreadyAdded = state.cities.some(
          (city) => city.name.toLowerCase() === action.payload?.name.toLowerCase()
        );

        if (!isCityAlreadyAdded) {
          state.cities.push(action.payload);
        }
      })
      .addCase(fetchWeather.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.payload as string;
      });
  },
});

export const { pinCity, removeCity } = weatherSlice.actions;
export default weatherSlice.reducer;
