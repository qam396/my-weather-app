import { WeatherData } from '@/store/types'
import { shallowMount, VueWrapper } from '@vue/test-utils'
import Weather from 'src/components/Weather.vue'
import { Vue } from 'vue-class-component'
import Vuex from 'vuex'

describe('weather page', () => {
  let wrapper: VueWrapper<Vue>
  let vm: any

  beforeEach(async () => {
    const state = {
      weather: () => { return { name: 'london' } as WeatherData }
    }

    const getters = {
      selectedWeather: () => { return state.weather }
    }

    const storeMockData = new Vuex.Store({
      modules: {
        projects: {
          namespaced: true,
          state,
          getters
        }
      }
    })

    wrapper = shallowMount(Weather, {
      props: {},
      global: {
        plugins: [storeMockData]
      }
    })

    if (wrapper !== undefined) {
      vm = wrapper.vm
      vm.loading = false
    }
  })

  it('should passes the sanity check and create wrapper', () => {
    expect(wrapper).toBeTruthy()
  })

  it('should return weather back', () => {
    expect(wrapper.element).toMatchSnapshot()
  })

  it('should have a one search box', () => {
    expect(wrapper.findAll('.search-box')).toHaveLength(1)
  })

  it('should not weather wrap unless weather is defined', () => {
    expect(wrapper.findAll('.weather-wrap')).toHaveLength(0)
  })

  it('should show loading text', () => {
    vm.loading = false
    vm.test()
    expect(vm.loading).toBeTruthy()
  })
})
