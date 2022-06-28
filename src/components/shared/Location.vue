<template>
  <div class="location-box">
    <div v-if="city" class="location">{{ location }}</div>
    <div class="date"> {{ date }} </div>
  </div>
</template>

<script lang="ts">
import { Vue } from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

export default class Location extends Vue {
  @Prop({ type: String }) city!: string
  @Prop({ type: String }) country!: string
  @Prop({ type: String }) date!: string

  get location () : string {
    return `${this.city}, ${this.country}`
  }
}
</script>

<style scoped>
  .location-box .location {
    color: #FFF;
    font-size: 32px;
    font-weight: 500;
    text-align: center;
    text-shadow: 1px 3px rgba(0, 0, 0, 0.25);
  }

  .location-box .date {
    color: #FFF;
    font-size: 20px;
    font-weight: 300;
    font-style: italic;
    text-align: center
  }
</style>
