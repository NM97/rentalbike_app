<template>
  <div class="mt-4 w-1/3 lg:w-64 fixed md:left-0 h-screen lg:block bg-gray-100 z-30 h-64" id="main-nav">
    <div class="mb-4 px-4">
      <p class="pl-4 text-xl font-semibold mb-1">MAIN</p>
      <div
        @click="dashboard"
        class="w-full flex items-center text-green-400 h-10 pl-4 bg-gray-100 hover:bg-gray-200 rounded-lg cursor-pointer"
      >
        <svg class="h-6 w-6 fill-current mr-2" viewBox="0 0 20 20">
          <path
            d="M8 20H3V10H0L10 0l10 10h-3v10h-5v-6H8v6z"
          />
        </svg>
        <span class="text-gray-700">Dashboard</span>
      </div>
      <div
        @click="todo"
        class="w-full flex items-center text-green-400 h-10 pl-4 hover:bg-gray-200 rounded-lg cursor-pointer"
      >
        <svg class="h-6 w-6 fill-current mr-2" viewBox="0 0 20 20">
          <path
            d="M2 4v14h14v-6l2-2v10H0V2h10L8 4H2zm10.3-.3l4 4L8 16H4v-4l8.3-8.3zm1.4-1.4L16 0l4 4-2.3 2.3-4-4z"
          />
        </svg>
        <span class="text-gray-700">ToDo</span>
      </div>
    </div>

    <div class="mb-4 px-4">
      <p class="pl-4 text-xl font-semibold mb-1">WYPOŻYCZALNIA</p>
      <div
        @click="addbike"
        class="w-full flex items-center text-green-400 h-10 pl-4 hover:bg-gray-200 rounded-lg cursor-pointer"
      >
        <svg class="h-6 w-6 fill-current mr-2" viewBox="0 0 20 20">
          <path
            d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 110-20 10 10 0 010 20zm0-2a8 8 0 100-16 8 8 0 000 16z"
          />
        </svg>
        <span class="text-gray-700">Dodaj rower</span>
      </div>
      <div
        @click="bikeslist"
        class="w-full flex items-center text-green-400 h-10 pl-4 hover:bg-gray-200 rounded-lg cursor-pointer"
      >
        <svg class="h-6 w-6 fill-current mr-2" viewBox="0 0 20 20">
          <path
            d="M1 4h2v2H1V4zm4 0h14v2H5V4zM1 9h2v2H1V9zm4 0h14v2H5V9zm-4 5h2v2H1v-2zm4 0h14v2H5v-2z"
          />
        </svg>
        <span class="text-gray-700">Lista rowerów</span>
      </div>
      <div
        @click="addtype"
        class="w-full flex items-center text-green-400 h-10 pl-4 hover:bg-gray-200 rounded-lg cursor-pointer"
      >
        <svg class="h-6 w-6 fill-current mr-2" viewBox="0 0 20 20">
          <path
            d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 110-20 10 10 0 010 20zm0-2a8 8 0 100-16 8 8 0 000 16z"
          />
        </svg>
        <span class="text-gray-700">Dodaj typ roweru</span>
      </div>
      <div
        @click="typeslist"
        class="w-full flex items-center text-green-400 h-10 pl-4 hover:bg-gray-200 rounded-lg cursor-pointer"
      >
        <svg class="h-6 w-6 fill-current mr-2" viewBox="0 0 20 20">
          <path
            d="M1 4h2v2H1V4zm4 0h14v2H5V4zM1 9h2v2H1V9zm4 0h14v2H5V9zm-4 5h2v2H1v-2zm4 0h14v2H5v-2z"
          />
        </svg>
        <span class="text-gray-700">Lista typów rowerów</span>
      </div>
      <div
        @click="rental"
        class="w-full flex items-center text-green-400 h-10 pl-4 hover:bg-gray-200 rounded-lg cursor-pointer"
      >
        <svg class="h-6 w-6 fill-current mr-2" viewBox="0 0 20 20">
          <path
            d="M1 4h2v2H1V4zm4 0h14v2H5V4zM1 9h2v2H1V9zm4 0h14v2H5V9zm-4 5h2v2H1v-2zm4 0h14v2H5v-2z"
          />
        </svg>
        <span class="text-gray-700">Lista wypożyczeń</span>
      </div>
      <div
        @click="addlocation"
        class="w-full flex items-center text-green-400 h-10 pl-4 hover:bg-gray-200 rounded-lg cursor-pointer"
      >
        <svg class="h-6 w-6 fill-current mr-2" viewBox="0 0 20 20">
          <path
            d="M11 9h4v2h-4v4H9v-4H5V9h4V5h2v4zm-1 11a10 10 0 110-20 10 10 0 010 20zm0-2a8 8 0 100-16 8 8 0 000 16z"
          />
        </svg>
        <span class="text-gray-700">Dodaj lokalizację</span>
      </div>
      <div
        @click="locationslist"
        class="w-full flex items-center text-green-400 h-10 pl-4 hover:bg-gray-200 rounded-lg cursor-pointer"
      >
        <svg class="h-6 w-6 fill-current mr-2" viewBox="0 0 20 20">
          <path
            d="M1 4h2v2H1V4zm4 0h14v2H5V4zM1 9h2v2H1V9zm4 0h14v2H5V9zm-4 5h2v2H1v-2zm4 0h14v2H5v-2z"
          />
        </svg>
        <span class="text-gray-700">Lista lokalizacji</span>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  methods: {
    dashboard () {
      this.$router.push('/admin/dashboard')
    },
    todo () {
      this.$router.push('/admin/todo')
    },
    bikeslist () {
      this.$router.push('/admin/bikeslist')
    },
    addbike () {
      this.$router.push('/admin/addbike')
    },
    rental () {
      this.$router.push('/admin/rental')
    },
    locationslist () {
      this.$router.push('/admin/locationslist')
    },
    addlocation () {
      this.$router.push('/admin/addlocation')
    },
    typeslist () {
      this.$router.push('/admin/typeslist')
    },
    addtype () {
      this.$router.push('/admin/addtype')
    },
    settings () {
      this.$router.push('/admin/settings')
    }
  }
}
</script>
