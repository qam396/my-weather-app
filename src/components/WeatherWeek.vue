<template>
  <div v-if="weather">
    <router-link :to="{name: 'Weather'}" tag="button">Back to search</router-link>
    <location
      :city="weather.name"
      :country="weather.sys.country"
      :date="currentDate" />
    <div class="float-child" v-for="(daily, index) in dailyData" :key="index">
      <information
        :date="dayName(daily.dt)"
        :temperature="daily.temp.day.toFixed(0)"
        :main="daily.weather[0].main"
        />
    </div>
  </div>
</template>

<script lang="ts">
import { Daily, WeatherData } from '@/store/types'
import { Options, Vue } from 'vue-class-component'
import Information from './shared/Information.vue'
import Location from './shared/Location.vue'
import { mapGetters, mapActions } from 'vuex'

@Options({
  components: {
    Information,
    Location
  },
  computed: {
    ...mapGetters({ weather: 'selectedWeather' })
  },
  methods: {
    ...mapActions(['dailyForecast'])
  }
})
export default class WeatherWeek extends Vue {
    loading = false
    dailyData: Daily[] = []
    weather: WeatherData | undefined
    dailyForecast!: () => Promise<WeatherData>

    /**
   * Fetch daily forecast from store (8s9jg state: weather)
   */
    fetchForecast (): void {
      this.loading = true
      if (!this.weather) { this.$router.push({ name: 'Weather' }) }
      try {
        this.dailyForecast()
          .then((result) => this.setResults(result))
      } catch (error) {
        alert('leave page')
        console.log(error)
      }
    }

    /**
   * User result object to set values for daily data
   * @param weatherData fetched from external api
   * @return Created LedgerAggregatedItem
   */
    setResults (results: WeatherData) : void {
      this.dailyData = results.daily
      this.loading = false
    }

    /**
   * Fetch day name by using daytime
   * @param daytime number for weatherdata object
   * @return Day name string
   */
    dayName (dt: number) : string {
      return new Date(dt * 1000).toDateString()
    }

    /**
   * Called after the instance has been mounted
   * @return none
   */
    mounted () : void {
      this.fetchForecast()
    }
}
</script>
<style scoped>
.float-container {
    border: 3px solid #fff;
    padding: 20px;
}
.float-child {
  width: 25%;
  float: left;
  padding: 20px;
}
</style>
