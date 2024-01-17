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
                    name="name"
                    type="text"
                  />
                </div>
              </div>

              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-password"
                  >Opis</label>
                  <textarea
                    class="no-resize appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 h-48 resize-none"
                    id="bikeData"
                    v-model="description"
                    name="description"
                  ></textarea>
                </div>
              </div>
<div class="w-full flex flex-no-wrap">
              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-3/4 px-3">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-password"
                  >Cena za dzień</label>
                  <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="price"
                    type="number"
                    v-model="price"
                    name="price"
                  />
                </div>
              </div>

              <div class="flex flex-wrap -mx-3 mb-6 mt-8">
                <div class="w-1/4 px-3">
                  <label class="flex justify-start items-start">
                    <div
                      class="bg-white border-2 rounded border-gray-400 w-6 h-6 flex flex-shrink-0 justify-center items-center mr-2 focus-within:border-blue-500"
                    >
                      <input type="checkbox" id="available" class="opacity-0 absolute" v-model="available" name="available"/>
                      <svg
                        class="fill-current hidden w-4 h-4 text-green-500 pointer-events-none"
                        viewBox="0 0 20 20"
                      >
                        <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
                      </svg>
                    </div>
                    <div class="select-none">Dostępny</div>
                  </label>
                </div>
              </div>
</div>
              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-password"
                  >Lokalizacja</label>
                  <input-select id="location" v-model="location" name="location" :options="locations" />
                </div>
              </div>

              <div class="flex flex-wrap -mx-3 mb-6">
                <div class="w-full px-3">
                  <label
                    class="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2"
                    for="grid-password"
                  >Zdjęcie roweru</label>
                  <input
                    class="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                    id="file"
                    type="file"
                    v-on:change="''"
                    name="file"
                  />
                </div>
              </div>

              <div class="md:flex md:items-center">
                <div class="md:w-1/3">
                  <button
                    @click="addBike"
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
import InputSelect from '../components/forms/InputSelector'
import Sidebar from '../components/Sidebar'
export default {
  name: 'Dashboard',
  components: {
    Sidebar,
    InputSelect
  },
  computed: {
    locations () {
      return this.$store.getters.allLocations
    }
  },
  methods: {
    addBike () {
      // const bikeData = new URLSearchParams()
      console.log(this.name)
      console.log(this.description)
      console.log(this.price)
      console.log(this.location.value)
      console.log(this.file)
      console.log(this.available)
      // addBike.append('returned', 0)
      // this.$store.dispatch('addBike', bikeData)
    }
  }
}
</script>

<style>
  input:checked + svg {
  display: block;
  }
</style>
