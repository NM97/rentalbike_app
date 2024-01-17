<template>
  <div class="dashboard">
    <div class="w-full">
      <div class="flex bg-white">
        <Sidebar />

        <div class="w-full bg-gray-100 pl-0 lg:pl-64 min-h-screen" id="main-content">
          <div class="p-6 bg-gray-100 mb-20">
            <table class="table-auto">
              <thead>
                <tr>
                  <th class="px-4 py-2">Nazwa</th>
                  <th class="px-4 py-2">Opis</th>
                  <th class="px-4 py-2">Cena za dzień</th>
                  <th class="px-4 py-2">Dostępność</th>
                  <th class="px-4 py-2">Oznacz jako dostępny/niedostępny</th>
                  <th class="px-4 py-2">Usuń</th>
                  <th class="px-4 py-2">Edytuj</th>
                </tr>
              </thead>
              <tbody class="text-center">
                <tr v-for="bike in bikes" :key="bike.index">
                  <td class="border px-4 py-2">{{bike.name}}</td>
                  <td class="border px-4 py-2"><p v-html="bike.description" /></td>
                  <td class="border px-4 py-2">{{bike.price}}</td>
                  <td class="border px-4 py-2">
                    <span
                      class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
                      :class="{'bg-green-400': bike.available, 'bg-red-400': !bike.available}"
                    >
                      <template v-if="bike.available">Dostępny</template>
                      <template v-if="!bike.available">Niedostępny</template>
                    </span>
                  </td>
                  <td class="px-4 py-2">
                    <button
                      v-if="bike.available !== 0"
                      @click="markBikeNotAvailable(bike.id)"
                      class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                    >
                      <svg class="h-6 w-6 fill-current" viewBox="0 0 20 20">
                        <path
                          d="M2.93 17.07A10 10 0 1117.07 2.93 10 10 0 012.93 17.07zm12.73-1.41A8 8 0 104.34 4.34a8 8 0 0011.32 11.32zM6.7 9.29L9 11.6l4.3-4.3 1.4 1.42L9 14.4l-3.7-3.7 1.4-1.42z"
                        />
                      </svg>
                    </button>
                    <button
                      v-else
                      @click="markBikeAvailable(bike.id)"
                      class="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-full"
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
                      @click="deleteBike(bike.id)"
                      class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
                    >
                      <svg class="h-6 w-6 fill-current" viewBox="0 0 20 20">
                        <path
                          d="M2.93 17.07A10 10 0 1117.07 2.93 10 10 0 012.93 17.07zm1.41-1.41A8 8 0 1015.66 4.34 8 8 0 004.34 15.66zm9.9-8.49L11.41 10l2.83 2.83-1.41 1.41L10 11.41l-2.83 2.83-1.41-1.41L8.59 10 5.76 7.17l1.41-1.41L10 8.59l2.83-2.83 1.41 1.41z"
                        />
                      </svg>
                    </button>
                  </td>
                  <td class="px-4 py-2">
                    <button
                      @click="editBike(bike.id)"
                      class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full"
                    >
                      <svg class="h-6 w-6 fill-current" viewBox="0 0 20 20">
                        <path d="M12.3 3.7l4 4L4 20H0v-4L12.3 3.7zm1.4-1.4L16 0l4 4-2.3 2.3-4-4z" />
                      </svg>
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from '../components/Sidebar'
export default {
  name: 'Dashboard',
  components: {
    Sidebar
  },
  computed: {
    bikes () {
      return this.$store.getters.allBikes
    }
  },
  methods: {
    markBikeNotAvailable (value) {
      if (confirm('Czy na pewno chcesz ustawić jak niedostęny?')) {
        this.$store.dispatch('markBikeNotAvailable', +value)
      }
    },
    markBikeAvailable (value) {
      if (confirm('Czy na pewno chcesz ustawić jak dostęny?')) {
        this.$store.dispatch('markBikeAvailable', +value)
      }
    },
    deleteBike (value) {
      if (confirm('Czy na pewno chcesz usunąć ten rower?')) {
        this.$store.dispatch('deleteBike', +value)
      }
    },
    editBike (value) {
      confirm('Czy na pewno chcesz edytować ten rower?')
      this.$router.push('/admin/editbike/' + value)
    }
  }
}
</script>
