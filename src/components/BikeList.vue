<template>
    <div class="flex justify-between flex-wrap">
      <bike
        v-for="(bike, index) in filteredBikes"
        :key="index"
        :id="bike.id"
        :name="bike.name"
        :description="bike.description"
        :image="bike.image.path"
        :price="bike.price"
        :available="bike.available"
        :slug="bike.slug"
      />
    </div>
</template>

<script>
import Bike from '../components/Bike'

export default {
  components: {
    Bike
  },
  props: {
    filtered: {
      type: Boolean,
      default: false
    }
  },
  computed: {
    bikes () {
      return this.$store.getters.allBikes
    },
    filteredBikes () {
      return this.$store.getters.filteredBikes
    }
  }
}
</script>
