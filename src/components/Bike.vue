<template>
  <div class="max-w-xs bg-white shadow-lg rounded-lg overflow-hidden my-10">
    <div class="px-4 py-2">
      <h1 class="text-gray-900 font-bold text-1xl uppercase">{{name}}</h1>
      <p class="text-gray-600 text-sm mt-1" v-html="description" />
    </div>
    <img class="h-56 w-full object-cover mt-2" :src="image" alt="bike" />
    <h1 class="text-gray-900 float-right mr-2">
      Cena:
      <a class="text-green-400 font-bold">{{dates.rprice}} zł</a>
    </h1>
    <br />
    <div class="flex items-center justify-between px-4 py-2 bg-gray-900">
      <div class="text-gray-200 font-bold text-xl">
        <availability-badge :available="available" />
      </div>
      <add-to-rental
        v-if="available===1"
        :id="id"
        :name="name"
        :image="image"
        :price="dates.rprice"
        :days="dates.days"
      />
    </div>
  </div>
</template>

<script>
import { DateTime } from 'luxon'
import AvailabilityBadge from '../components/AvailabilityBadge'
import AddToRental from '../components/AddToRental'
export default {
  components: {
    AvailabilityBadge,
    AddToRental
  },
  props: {
    id: {
      type: Number,
      default: null
    },
    name: {
      type: String,
      required: true
    },
    description: {
      type: String,
      default: ''
    },
    slug: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: null
    },
    price: {
      type: Number,
      default: null
    },
    available: {
      type: Number,
      default: 1
    }
  },
  computed: {
    dates () {
      const start = DateTime.fromISO(this.$store.getters.pickupReservation)
      const end = DateTime.fromISO(this.$store.getters.dropOffReservation)
      const daysBetween = end.diff(start, ['days'])
      const rprice = this.price * (daysBetween / 86400000)
      const days = (daysBetween / 86400000)
      return {
        rprice,
        days
      }
    }
  }
}
</script>
