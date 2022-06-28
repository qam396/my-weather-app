<template>
  <div>
    <main>
      <router-view/>
    </main>
  </div>
</template>

<script lang="ts">
import { Options, Vue } from 'vue-class-component'

@Options({})
export default class App extends Vue {

}
</script>

<style>
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  body {
    font-family: 'monstserrat', sans-serif;
  }
  #app {
    background-image: url('./assets/background-weather-app.png');
    background-size: cover;
    background-position: bottom;
    transition: 0.4s;
    height: 1100px;
  }
  main {
    min-height: 100vh;
    padding: 25px;
  }
</style>
