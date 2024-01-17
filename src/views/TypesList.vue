<template>
  <div class="dashboard">
    <div class="w-full">
      <div class="flex bg-white">
        <Sidebar />

        <div
          class="w-full bg-gray-100 pl-0 lg:pl-64 min-h-screen"
          id="main-content"
        >
          <div class="p-6 bg-gray-100 mb-20">
                          <table class="table-auto">
              <thead>
                <tr>
                  <th class="px-4 py-2">ID</th>
                  <th class="px-4 py-2">Nazwa</th>
                  <th class="px-4 py-2">Usuń</th>
                </tr>
              </thead>
              <tbody class="text-center">
                <tr v-for="type in types" :key="type.index">
                  <td class="border px-4 py-2">{{type.id}}</td>
                  <td class="border px-4 py-2">{{type.name}}</td>
                  <td class="px-4 py-2">
                    <button
                      @click="deleteType(type.id)"
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
    types () {
      return this.$store.getters.allTypes
    }
  },
  mounted () {
    this.$store.dispatch('getTypes')
  },
  methods: {
    deleteType (value) {
      if (confirm('Czy na pewno chcesz usunąć ten rodzaj rowerów?')) {
        this.$store.dispatch('deleteType', +value)
      }
    }
  }
}
</script>
