<template>
  <div class="dashboard">
    <div class="w-full">
      <div class="flex bg-white">
        <Sidebar />

        <div class="w-full bg-gray-100 pl-0 lg:pl-64 min-h-screen" id="main-content">
          <div class="p-6 bg-gray-100 mb-20">
            <form class="w-full max-w-lg">
              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-password"
                  >Nazwa</label>
                  <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="name"
                    v-model="name"
                    name="label"
                    type="text"
                  />
                </div>
              </div>
              <div class="md:flex md:items-center">
                <div class="md:w-1/3">
                  <button
                    @click="addType"
                    class="shadow bg-green-400 hover:bg-green-600 focus:shadow-outline focus:outline-none text-white font-bold py-2 px-4 rounded"
                    type="button"
                  >Dodaj</button>
                </div>
                <div class="md:w-2/3"></div>
              </div>
            </form>
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
  methods: {
    addType () {
      const typeData = new URLSearchParams()
      typeData.append('name', this.name)
      this.$store.dispatch('addType', typeData)
    }
  }
}
</script>
