<template>
  <div class="flex justify-center my-6">
    <div
      class="flex flex-col w-full p-8 text-gray-800 bg-white shadow-lg pin-r pin-y md:w-4/5 lg:w-4/5"
    >
      <div class="flex-1">
        <table class="w-full text-sm lg:text-base" cellspacing="0">
          <thead>
            <tr class="h-12 uppercase">
              <th class="hidden md:table-cell"></th>
              <th class="text-left">Rower</th>
              <th class="text-center pl-5 lg:pl-0">
                <span class="lg:hidden" title="Quantity">Ilość dni</span>
                <span class="hidden lg:inline">Ilość dni</span>
              </th>
              <th class="text-right">Cena</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="bike in this.$store.state.rental" :key="bike.index">
              <td class="hidden pb-4 md:table-cell">
                <img :src="bike.bikeImage" class="w-40 rounded" alt="bike" />
              </td>
              <td>
                <p class="mb-2">{{bike.bikeName}}</p>
                <button @click="$store.commit('removeFromRental', bike)" class="text-gray-700">
                  <small class="text-center">(Usuń)</small>
                </button>
              </td>
              <td class="text-center">
                <p class="mb-2">{{bike.bikeDays}}</p>
              </td>
              <td class="text-right md:table-cell">
                <span class="text-sm lg:text-base font-medium">{{bike.bikePrice}} zł</span>
              </td>
            </tr>
          </tbody>
        </table>

        <hr class="pb-6 mt-6" />
        <div class="my-4 mt-6 -mx-2 lg:flex">
          <div class="lg:px-2 lg:w-1/2">
          </div>
          <div class="lg:px-2 lg:w-1/2">
            <div class="p-4 bg-gray-100 rounded-full">
              <h1 class="ml-2 font-bold uppercase">Podsumowanie</h1>
            </div>

            <div class="flex justify-between pt-4 border-b">
              <div
                class="lg:px-4 lg:py-2 m-2 text-lg lg:text-xl font-bold text-center text-gray-800"
              >Koszt wypożyczenia</div>
              <div
                class="lg:px-4 lg:py-2 m-2 lg:text-lg font-bold text-center text-gray-900"
              >{{total}} zł</div>
            </div>
            <button
              class="flex justify-center w-full px-10 py-3 mt-6 font-medium text-white uppercase bg-gray-800 rounded-full shadow item-center hover:bg-gray-700 focus:shadow-outline focus:outline-none"
              @click="reservation"
            >
              <span class="ml-2 mt-5px">Realizuj wypożyczenie</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  methods: {
    reservation () {
      this.$router.push('/reservation')
    }
  },
  computed: {
    total () {
      return this.$store.state.rental.reduce((sum, bike) => {
        return sum + (bike.bikePrice)
      }, 0)
    }
  }
}
</script>
