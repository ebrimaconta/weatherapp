import { renderHook, act } from '@testing-library/react';
import React from 'react';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import { weatherSlice, WeatherState } from '../redux/weatherSlice';
import { useWeatherFetch } from './useWeather';
import 'jest-localstorage-mock';
import '@testing-library/jest-dom';

describe('useWeatherFetch', () => {
  let store: ReturnType<typeof configureStore>;
  let wrapper: React.FC<{ children: React.ReactNode }>;

  beforeEach(() => {
    const preloadedState: { weather: WeatherState } = {
      weather: {
        cities: [],
        status: 'idle',
        error: null,
        pinnedCities: [],
      },
    };

    store = configureStore({
      reducer: { weather: weatherSlice.reducer },
      preloadedState,
    });

    jest.spyOn(store, 'dispatch');

    wrapper = ({ children }) => <Provider store={store}>{children}</Provider>;
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should return initial state', () => {
    const { result } = renderHook(() => useWeatherFetch(), { wrapper });
    expect(result.current.cities).toEqual([]);
    expect(result.current.status).toBe('idle');
    expect(result.current.error).toBeNull();
  });

  it('should dispatch fetchWeather action when searchWeather is called with a valid city', async () => {
    const { result } = renderHook(() => useWeatherFetch(), { wrapper });
    await act(async () => {
      await result.current.searchWeather('New York');
    });
    expect(store.dispatch).toHaveBeenCalled();
  });

  it('should not dispatch fetchWeather action when searchWeather is called with an empty city', async () => {
    const { result } = renderHook(() => useWeatherFetch(), { wrapper });
    await act(async () => {
      await result.current.searchWeather('');
    });
    expect(store.dispatch).not.toHaveBeenCalled();
  });
});
