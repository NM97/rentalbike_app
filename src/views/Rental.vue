<template>
  <div class="dashboard">
    <div class="w-full">
      <div class="flex bg-white">
        <Sidebar />

        <div class="w-full bg-gray-100 pl-0 lg:pl-64 min-h-screen" id="main-content">
          <div class="p-6 bg-gray-100 mb-20">
            <thead>
              <tr>
                <th class="px-4 py-2">Osoba</th>
                <th class="px-4 py-2">Rower</th>
                <th class="px-4 py-2">Odbiór</th>
                <th class="px-4 py-2">Zwrot</th>
                <th class="px-4 py-2">Zwrócono</th>
                <th class="px-4 py-2">Oznacz jak zwrócone</th>
                <th class="px-4 py-2">Usuń</th>
              </tr>
            </thead>
            <tbody class="text-center">
              <tr v-for="(rental, index)  in rentals" :key="index">
                <td
                  class="border px-4 py-2"
                >{{rental.user.name}} {{rental.user.surname}} {{rental.user.email}}</td>
                <td class="border px-4 py-2">{{rental.bikes.name}}</td>
                <td class="border px-4 py-2">{{rental.pickup}}</td>
                <td class="border px-4 py-2">{{rental.dropoff}}</td>
                <td class="border px-4 py-2">
                  <span
                    class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
                    :class="{'bg-green-400': rental.returned, 'bg-red-400': !rental.returned}"
                  >
                    <template v-if="rental.returned">Zwrócone</template>
                    <template v-if="!rental.returned">Niezwrócone</template>
                  </span>
                </td>
                <td class="px-4 py-2">
                  <button
                    v-if="rental.returned !== 1"
                    @click="markReturned(rental.id)"
                    class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
                  >
                    <svg class="h-6 w-6 fill-current" viewBox="0 0 20 20">
                      <path
                        d="M2.93 17.07A10 10 0 1117.07 2.93 10 10 0 012.93 17.07zm12.73-1.41A8 8 0 104.34 4.34a8 8 0 0011.32 11.32zM6.7 9.29L9 11.6l4.3-4.3 1.4 1.42L9 14.4l-3.7-3.7 1.4-1.42z"
                      />
                    </svg>
                  </button>
                  <button
                    v-else
                    disabled
                    @click="markReturned(rental.id)"
                    class="bg-gray-500 text-white font-bold py-2 px-4 rounded-full"
                  >
                    <svg class="h-6 w-6 fill-current" viewBox="0 0 20 20">
                      <path
                        d="M2.93 17.07A10 10 0 1117.07 2.93 10 10 0 012.93 17.07zm12.73-1.41A8 8 0 104.34 4.34a8 8 0 0011.32 11.32zM6.7 9.29L9 11.6l4.3-4.3 1.4 1.42L9 14.4l-3.7-3.7 1.4-1.42z"
                      />
                    </svg>
                  </button>
                </td>
                <td class="px-4 py-2">
                  <button
                    @click="deleteRental(rental.id)"
                    class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                  >
                    <svg class="h-6 w-6 fill-current" viewBox="0 0 20 20">
                      <path
                        d="M2.93 17.07A10 10 0 1117.07 2.93 10 10 0 012.93 17.07zm1.41-1.41A8 8 0 1015.66 4.34 8 8 0 004.34 15.66zm9.9-8.49L11.41 10l2.83 2.83-1.41 1.41L10 11.41l-2.83 2.83-1.41-1.41L8.59 10 5.76 7.17l1.41-1.41L10 8.59l2.83-2.83 1.41 1.41z"
                      />
                    </svg>
                  </button>
                </td>
              </tr>
            </tbody>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar'
// import axios from 'axios'
// import Swal from 'sweetalert2'
export default {
  name: 'Dashboard',
  components: {
    Sidebar
  },
  computed: {
    rentals () {
      const that = this
      function compare (a, b) {
        if (a.id < b.id) {
          return 1
        }
        if (a.id > b.id) {
          return -1
        }
        return 0
      }
      return that.$store.getters.allRentals.sort(compare)
    }
  },
  mounted () {
    return this.$store.dispatch('getRentals')
  },
  methods: {
    deleteRental (value) {
      if (confirm('Czy na pewno chcesz usunąć te wypożyczenie?')) {
        this.$store.dispatch('deleteRental', +value)
      }
    },
    markReturned (value) {
      if (confirm('Czy napewno chcesz oznaczyć te wypożyczenie jako zwrócone?')) {
        this.$store.dispatch('markReturned', +value)
      }
    }
  }
}
</script>
