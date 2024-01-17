<template>
  <section class="py-12 px-4">
    <div class="flex flex-wrap -mx-4">
      <div class="lg:w-1/2 px-4 mb-4 lg:mb-0">
        <img class="rounded shadow-md" :src="bike.image.path" alt />
      </div>
      <div class="lg:w-1/2 px-4">
        <h2 class="text-4xl mb-4 font-heading">{{ bike.name }}</h2>
        <p class="mb-6 text-gray-500 leading-relaxed">{{ bike.name }}</p>
        <div class="flex mb-6">
          <div class="flex flex-col ml-4">
            <div class="h-1/2">
              <ul>
                <li>
                  <strong>Cena za dzień:</strong>
                  ${{bike.price}}
                </li>
                <li>
                  <strong>Rezerwacja:</strong>
                  {{dates.start}} - {{dates.end}}
                </li>
                <li>
                  <strong>Liczba dni:</strong>
                  {{dates.daysBetween}}
                </li>
                <li>
                  <strong>Cena:</strong>
                  ${{dates.price}}
                </li>
              </ul>
            </div>
            <div class="h-1/2">
            <br>
              <router-link
                class="bg-green-400 text-white font-bold py-3 px-4 rounded inline-block"
                :to="{ name: 'Reservation' }"
              >Kontynuuj</router-link>
            </div>
          </div>
        </div>
        <div class="pt-4 border-t">
          <h3 class="mb-4">Dostępny w:</h3><span
            class="inline-block bg-gray-300 rounded-full px-3 py-1 text-sm font-semibold text-gray-600 mr-2"
            v-for="location in bike.locations"
            :key="location.index"
          >{{ location.name }}</span>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { DateTime } from 'luxon'
export default {
  computed: {
    bike () {
      return this.$store.getters.currentBike
    },
    dates () {
      const start = DateTime.fromISO(this.$store.getters.pickupReservation)
      const end = DateTime.fromISO(this.$store.getters.dropOffReservation)
      const daysBetween = end.diff(start, ['days'])
      const price = this.bike.price * daysBetween.values.days
      return {
        start: start.toFormat('dd/MM/yyyy'),
        end: end.toFormat('dd/MM/yyyy'),
        daysBetween: daysBetween.values.days,
        price
      }
    }
  },
  beforeMount () {
    this.$store.dispatch('getBike', this.$route.params.slug)
    if (this.$store.getters.pickupReservation === '') {
      this.$store.dispatch('setDates', {
        value: localStorage.getItem('pickup'),
        type: 'pickup'
      })
    }
    if (this.$store.getters.dropOffReservation === '') {
      this.$store.dispatch('setDates', {
        value: localStorage.getItem('dropoff'),
        type: 'dropoff'
      })
    }
  }
}
</script>
