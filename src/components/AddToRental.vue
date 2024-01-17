<template>
  <div class="add-to-rental">
    <button
      @click="addToRental"
      class="bg-green-500 hover:bg-green-700 text-white font-bold ml-6 py-2 px-4 rounded-full"
    >Dodaj</button>
  </div>
</template>

<script>
export default {
  name: 'add-to-rental',
  props: {
    id: Number,
    name: String,
    image: String,
    price: Number,
    days: Number
  },

  data () {
    return {
      bike: {
        bike_id: this.id,
        bikeName: this.name,
        bikePrice: this.price,
        bikeImage: this.image,
        bikeDays: this.days
      }
    }
  },
  methods: {
    addToRental () {
      this.$store.commit('addToRental', this.bike)
    }
  }
}
</script>
