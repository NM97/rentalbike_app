
<template>
  <div class="flex content-center items-center justify-center h-full">
    <div
      v-if="modal"
      @click.self="toggleModal"
      class="animated fadeIn fixed z-50 pin overflow-auto bg-smoke-dark flex"
    >
      <div
        class="border-solid border-2 border-green-500 animated fadeInUp fixed shadow-inner max-w-md md:relative pin-b pin-x align-top m-auto justify-end md:justify-center p-8 bg-white md:rounded w-full md:h-auto md:shadow flex flex-col o;''verflow-visible scrolling-touch"
      >
        <h2
          class="text-4xl text-center font-hairline md:leading-loose text-grey md:mt-8 mb-4"
        >Wypożyczenie</h2>
        <table class="w-full text-sm lg:text-base" cellspacing="0">
          <tbody>
            <tr v-for="bike in this.$store.state.rental" :key="bike.index">
              <td class="pb-4 md:table-cell" >
                <a href="#">
                  <img
                    :src="bike.bikeImage"
                    class="w-40 rounded"
                    alt="bike"
                  />
                </a>
              </td>
              <td class="text-left">
                  <p class="m-2">{{bike.bikeName}}</p>
                  <span class="text-sm lg:text-base font-medium m-2">{{bike.bikePrice}} zł</span>
                  <br>
                    <button @click="$store.commit('removeFromRental', bike)" class="text-gray-700 ml-2">
                    <small class="text-center">(Usuń)</small>
                    </button>
              </td>
            </tr>
          </tbody>
        </table>
        <div class="inline-flex justify-center">
          <button
            @click="finalize"
            class="bg-grey-lighter flex-1 border-b-2 md:flex-none border-green ml-2 hover:bg-green-lightest text-grey-darkest font-bold py-4 px-6 rounded"
          >Finalizuj</button>
          <button
            @click="toggleModal"
            class="bg-grey-lighter flex-1 md:flex-none border-b-2 border-red ml-2 hover:bg-red-lightest text-grey-darkest font-bold py-4 px-6 rounded"
          >Kontynuuj</button>
        </div>
      </div>
      <span @click="toggleModal" class="absolute pt-4 px-4">
        <svg
          class="h-12 w-12 text-grey hover:text-grey-darkest"
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <title>Close</title>
          <path
            d="M14.348 14.849a1.2 1.2 0 0 1-1.697 0L10 11.819l-2.651 3.029a1.2 1.2 0 1 1-1.697-1.697l2.758-3.15-2.759-3.152a1.2 1.2 0 1 1 1.697-1.697L10 8.183l2.651-3.031a1.2 1.2 0 1 1 1.697 1.697l-2.758 3.152 2.758 3.15a1.2 1.2 0 0 1 0 1.698z"
          />
        </svg>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'mini-rental',
  data: function () {
    return {
      modal: true
    }
  },
  methods: {
    finalize () {
      this.$router.push('/rental')
    },
    toggleModal () {
      this.modal = !this.modal
    }
  }
}
</script>
