import { createStore } from 'vuex'
import axios from 'axios'
import { WeatherData } from './types'
import { API_KEY, API_BASE_URL } from '@/helpers/constants'
import createPersistedState from 'vuex-persistedstate'

export default createStore({
  // plugins: [createPersistedState()],
  state: {
    weather: null as WeatherData | null
  },
  mutations: {
    setWeather (state, weather) {
      state.weather = weather
    },
    clearWeather (state) {
      state.weather = null
    }
  },
  actions: {
    getWeather ({ commit }, query) {
      return axios.get(`${API_BASE_URL}weather?q=${query}&units=metric&APPID=${API_KEY}`)
        .then((result) => {
          commit('setWeather', result.data)
        })
        .catch(() => {
          commit('clearWeather')
          throw new Error('Oops.. city not found.')
        })
    },
    dailyForecast () {
      return axios.get(`${API_BASE_URL}onecall?lat=${this.state.weather?.coord.lat}&lon=${this.state.weather?.coord?.lon}&exclude=current,hourly,minutely,alerts&units=metric&appid=${API_KEY}`)
        .then((result) => { return result.data })
        .catch(console.error)
    }
  },
  getters: {
    selectedWeather (state) {
      return state.weather
    }
  }
})
