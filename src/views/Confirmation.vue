<template>
  <div class="container pt-8">
    <div class="rounded overflow-hidden shadow-lg p-8">
      <h2 class="mb-0">Czy te informacje są prawidłowe?</h2>
      <ul class="my-8">
        <li>
          Imię:
          <strong>{{user.name}}</strong>
        </li>
        <li>
          Nazwisko:
          <strong>{{user.surname}}</strong>
        </li>
        <li>
          Rower/Rowery:
          <strong v-for="bike in this.$store.state.rental" :key="bike.index"><ul class="list-disc pl-4"><li>{{bike.bikeName}}</li></ul></strong>
        </li>
        <li>
          Data odbioru:
          <strong>{{pickup.formatted}}</strong>
        </li>
        <li>
          Data zwrotu:
          <strong>{{dropoff.formatted}}</strong>
        </li>
      </ul>

      <button class="bg-green-400 text-white font-bold py-3 px-4 rounded inline-block" @click="makeReservation">
              Dokonaj rezerwacji
      </button>
    </div>
  </div>
</template>

<script>
import { DateTime } from 'luxon'
// const moment = require('moment')
export default {
  computed: {
    user () {
      return this.$store.getters.user
    },
    bike () {
      return this.$store.getters.currentBike
    },
    pickup () {
      return {
        original: this.$store.getters.pickupReservation,
        formatted: DateTime.fromISO(this.$store.getters.pickupReservation).toFormat('dd/MM/yyyy')
      }
    },
    dropoff () {
      return {
        original: this.$store.getters.dropOffReservation,
        formatted: DateTime.fromISO(this.$store.getters.dropOffReservation).toFormat('dd/MM/yyyy')
      }
    },
    total () {
      return this.$store.state.rental.reduce((sum, bike) => {
        return sum + (bike.bikePrice)
      }, 0)
    },
    bike_id () {
      const cartItems = JSON.parse(localStorage.getItem('rental'))
      return cartItems.map(item => item.bike_id)
    }
  },
  methods: {
    makeReservation () {
      const pickup = DateTime.fromISO(this.pickup.original).toFormat('yyyy-MM-dd')
      const dropoff = DateTime.fromISO(this.dropoff.original).toFormat('yyyy-MM-dd')
      const reservationData = new URLSearchParams()
      reservationData.append('user_id', this.user.id)
      reservationData.append('bike_id', this.bike_id)
      reservationData.append('pickup', pickup)
      reservationData.append('dropoff', dropoff)
      reservationData.append('price', this.total)
      reservationData.append('returned', 0)
      this.$store.dispatch('makeReservation', reservationData)
      confirm('Dziękujemy za skorzystanie z naszych usług')
      this.$store.dispatch('logout').then(() => {
        window.localStorage.clear()
      })
    }
  }
}
</script>
