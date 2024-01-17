<template>
  <div class="ReservationForm p-5 bg-white flex items-end shadow-lg font-bold">
    <div class="mr-4">
      <input-select
        id="localization"
        :label="'Wybierz lokalizacje'"
        :options="locations"
        @onSelect="setLocation"
      />
    </div>
    <div class="mr-4">
      <input-select-type id="type" :label="'Typ'" :options="types" @onSelect="1" />
    </div>
    <div class="mr-4">
      <input-selectb-type id="btype" :label="'Rodzaj'" @onSelect="1" />
    </div>
    <div class="mr-4">
      <label for>Odbiór</label>
      <datetime
        id="pickup"
        v-model="date"
        input-class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-500 py-3
        px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-400 mt-2"
        @input="setDate($event, 'pickup')"
        :min-datetime="now"
      />
    </div>
    <div>
      <label for>Zwrot</label>
      <datetime
        id="dropoff"
        v-model="date"
        input-class="block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-500 py-3
        px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-400 mt-2"
        @input="setDate($event, 'dropoff')"
        :min-datetime="now"
      />
    </div>
    <button
      class="bg-green-400 text-white font-bold py-3 px-4 rounded ml-4"
      @click="filterBikes"
    >Filtruj rowery</button>
  </div>
</template>

<script>
import InputSelect from './forms/InputSelector'
import InputSelectType from './forms/InputSelectorType'
import InputSelectbType from './forms/InputSelectorbType'
// import BikeList from '../components/BikeList'
import { Datetime } from 'vue-datetime'

export default {
  components: {
    InputSelect,
    InputSelectType,
    InputSelectbType,
    Datetime
    // BikeList
  },
  mounted () {
    this.$store.dispatch('getTypes')
  },
  computed: {
    locations () {
      return this.$store.getters.allLocations
    },
    now () {
      const date = new Date(Date.now())
      return date.toISOString()
    },
    now1 () {
      const date = new Date(localStorage.getItem('pickup'))
      return date.toISOString()
    },
    types () {
      return this.$store.getters.allTypes
    }
  },
  methods: {
    filterBikes () {
      this.$store.dispatch('filterBikes')
    },
    filterBikesOnAPI (value) {
      this.$store.dispatch('filterOnAPI', +value)
    },
    setLocation (value) {
      this.$store.dispatch('setLocation', +value)
    },
    setDate (value, type) {
      this.$store.dispatch('setDates', { value, type })
    }
  }
}
</script>
