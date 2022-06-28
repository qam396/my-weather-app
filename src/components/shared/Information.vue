<template>
  <div class="weather-box" >
    <div class="date"> {{ date }} </div>
    <div class="temp">
      <div style="height:120px">
        <img class="img" :src="require(`/src/assets/${fetchWeatherIcon()}`)">
      </div>
      <div>
        {{ temperature }} °C
      </div>
    </div>
    <div class="weather">{{ main }}</div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

export default class Information extends Vue {
  @Prop({ type: String, default: '' }) date!: string
  @Prop({ type: Number, default: 0 }) temperature!: number
  @Prop({ type: String, default: '' }) main!: string
  @Prop({ type: Boolean, default: false }) evening!: boolean

  /**
   * Set weather icon based on weather type
   * @return string containing name of the image
   */
  fetchWeatherIcon () : string {
    switch (this.main) {
      case 'Snow':
        return 'Cloud-Snow-Alt.svg'
      case 'Clouds':
        return 'Cloud.svg'
      case 'Fog':
        return 'Cloud-Fog.svg'
      case 'Dust':
        return 'Cloud-Snow-Alt.svg'
      case 'Drizzle':
      case 'Rain':
        return 'Cloud-Drizzle.svg'
      default:
        return this.evening ? 'Moon.svg' : 'Sun.svg'
    }
  }
}
</script>

<style scoped>
  .weather-box {
    text-align: center;
  }

  .weather-box .temp {
    display: inline-block;
    padding: 10px 25px;
    color: #FFF;
    font-size: 102px;
    font-weight: 900;

    text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
    background-color: rgba(255, 255, 255, 0.25);
    border-radius: 16px;
    margin: 30px 0px;

    box-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  }

  .img {
    height: 180px;
  }

  .weather-box .weather {
    color: #FFF;
    font-size: 48px;
    font-weight: 700;
    font-style: italic;
    text-shadow: 3px 6px rgba(0, 0, 0, 0.25);
  }

  .date {
    color: #FFF;
    font-size: 20px;
    font-weight: 300;
    font-style: italic;
    text-align: center
  }
</style>
