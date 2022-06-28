<template>
    <div class="loading">
        Loading...
    </div>
</template>

<script lang="ts">
import { Vue, Options } from 'vue-class-component'

@Options({})
export default class Loader extends Vue {

}
</script>

<style scoped>
  .loading {
    color: #FFF;
    text-align: center;
    position: fixed;
    top: 50%;
    left: 45%;
    font-size: 32px;
  }
</style>
