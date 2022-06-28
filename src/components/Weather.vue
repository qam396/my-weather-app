<template>
  <div>
    <main>
      <!-- component that show loading text -->
      <loader v-if="loading"></loader>
      <h1 class="center header">Weather App</h1>
      <div class="search-box">
        <input
          type="text"
          class="search-bar"
          placeholder="Search by city name..."
          v-model="query"
          @keyup.enter="fetchWeather()" />
      </div>

      <div v-if="error" class="bar error"> {{ error }} </div>

      <div class="weather-wrap" v-if="weather">
        <!-- component that shows location of the search city -->
        <location
          :city="weather.name"
          :country="weather.sys.country"
          :date="currentDate" />
        <!-- component that shows weather related information -->
        <information
          :temperature="Math.round(weather.main.temp)"
          :main="weather.weather[0].main"
          :evening="evening" />
        <div class="center">
          <!-- Navigation link to week details page -->
          <router-link :to="{ name: 'WeatherWeek',
            params: {
                lat: weather.coord.lat,
                lon: weather.coord.lon
            }}" tag="button">View weather for full week</router-link>
        </div>
      </div>
    </main>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'
import { WeatherData } from '../store/types'
import Loader from './shared/Loader.vue'
import Location from './shared/Location.vue'
import Information from './shared/Information.vue'
import { mapGetters, mapActions, mapMutations } from 'vuex'
import { AxiosResponse } from 'axios'

@Options({
  components: {
    Loader,
    Information,
    Location
  },
  computed: {
    // Get selected weather and set it to local variable
    ...mapGetters({ weather: 'selectedWeather' })
  },
  methods: {
    // Map actions and Mutation to use in the component
    ...mapActions(['getWeather']),
    ...mapMutations(['clearWeather'])
  }
})
export default class App extends Vue {
  loading = false
  query = ''
  weather: WeatherData | undefined
  evening = false
  getWeather!: (query: string) => Promise<AxiosResponse<unknown, unknown>>
  clearWeather!: () => Promise<void>
  error = ''

  get currentDate (): string {
    return new Date().toDateString()
  }

  get backgroundImage (): string {
    return this.evening ? 'night-background' : 'day-background'
  }

  /**
   * Call action store to fetch weather and set it to weather state
   * @param body (optional) A new LedgerAggregatedItem to be created
   * @return Created LedgerAggregatedItem
   */
  fetchWeather () : void {
    this.loading = true
    this.error = ''
    this.getWeather(this.query)
      .then(() => this.setResults())
      .catch((error) => {
        this.error = error
        console.log(error)
      })
      .finally(() => { this.loading = false })
  }

  /**
   * Use weather icon and set evening if icon contains n 'night' 
   * @param body (optional) A new LedgerAggregatedItem to be created
   * @return Created LedgerAggregatedItem
   */
  setResults () : void {
    const timeOfDay = this.weather?.weather[0].icon
    if (timeOfDay?.includes('n')) {
      this.evening = true
    }
  }
}
</script>

<style>
  .search-box {
    width: 100%;
    margin-bottom: 30px;
  }
  .search-box .search-bar {
    display: block;
    width: 100%;
    padding: 15px;
    color: #313131;
    font-size: 20px;

    appearance: none;
    border: none;
    outline: none;
    background: none;

    box-shadow: 0px 0px 8px rgba(0, 0, 0, 0.25);
    background-color: rgba(255, 255, 255, 0.5);
    border-radius: 0px 16px 0px 16px;
    transition: 0.4s;
  }
  .search-box .search-bar:focus {
    box-shadow: 0px 0px 16px rgba(0, 0, 0, 0.25);
    background-color: rgba(255, 255, 255, 0.75);
    border-radius: 16px 0px 16px 0px;
  }
  .center {
    text-align: center;
  }
  .day-background {
    background-image: url('../assets/background-day.jpg');
    background-size: cover;
    background-position: center;
    margin-left: 500px;
    margin-right: 500px;
    border-radius: 16px;
  }
  .night-background {
    background-image: url('../assets/background-night.jpg');
    background-size: cover;
    background-position: center;
    margin-left: 500px;
    margin-right: 500px;
    border-radius: 16px;
  }
  .bar {
    padding: 10px;
    margin: 10px;
    color: #333;
    background: #fafafa;
    border: 1px solid #ccc;
  }
  .error {
    color: #ba3939;
    background: #ffe0e0;
    border: 1px solid #a33a3a;
  }
  .header {
    color: white;
    padding-bottom: 30px;
  }
</style>
