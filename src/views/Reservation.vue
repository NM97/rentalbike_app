<template>
  <div class="container pt-8">
    <div class="rounded overflow-hidden shadow-lg p-4">
      <div class="flex flex-wrap">
        <div class="w-1/2 p-2">
        <h2 class="mb-8">Rejstracja</h2>

        <form class="w-full max-w-md mb-8" @submit.prevent="registerUser">
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3 md:w-3/4">
              <input
                class="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                id="name"
                type="text"
                name="name"
                v-model="name"
                placeholder="Imię"
              />
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3 md:w-3/4">
              <input
                class="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                id="surname"
                type="text"
                name="surname"
                v-model="surname"
                placeholder="Nazwisko"
              />
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3 md:w-3/4">
              <input
                class="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                id="email"
                name="email"
                type="email"
                v-model="email"
                placeholder="Adres email"
              />
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3 md:w-3/4">
              <input
                class="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                id="password"
                type="password"
                name="password"
                v-model="password"
                placeholder="Hasło"
              />
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3 md:w-3/4">
              <input
                class="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                id="password_confirmation"
                type="password"
                name="password_confirmation"
                v-model="password_confirmation"
                placeholder="Potwierdzenie hasła"
              />
            </div>
          </div>

          <button
            class="mt-3 text-lg font-semibold md:w-3/4
                bg-green-400 w-full text-white rounded-lg
                px-6 py-3 block shadow-xl hover:text-white hover:bg-green-600"
          >Zarejestruj</button>
        </form>
        </div>
        <div class="w-1/2 p-2">
        <h2 class="mb-8">Jeśli jesteś już użytkownikiem, zaloguj się</h2>

        <form class="w-full max-w-md" @submit.prevent="loginUser">
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3 md:w-3/4">
              <input
                class="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                id="login_email"
                type="text"
                name="login_email"
                v-model="login_email"
                placeholder="Adres email"
              />
            </div>
          </div>
          <div class="flex flex-wrap -mx-3 mb-6">
            <div class="w-full px-3 md:w-3/4">
              <input
                class="text-md block px-3 py-2 rounded-lg w-full bg-white border-2 border-gray-300 placeholder-gray-600 shadow-md focus:placeholder-gray-500 focus:bg-white focus:border-gray-600 focus:outline-none"
                id="login_password"
                type="password"
                name="login_password"
                v-model="login_password"
                placeholder="Hasło"
              />
            </div>
          </div>

          <button class="mt-3 text-lg font-semibold md:w-3/4
                bg-green-400 w-full text-white rounded-lg
                px-6 py-3 block shadow-xl hover:text-white hover:bg-green-600">Zaloguj</button>
        </form>

        <div
          class="bg-orange-lightest border-l-4 border-orange-300 text-orange-600 p-4 mt-4"
          role="alert"
          v-if="invalidCredentials"
        >Adres email lub hasło są nieprawidłowe</div>

        <div
          class="bg-orange-lightest border-l-4 border-orange-300 text-orange-600 p-4 mt-4"
          role="alert"
          v-for="(error, index) in loginErrors"
          :key="index"
        >{{ error }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      name: '',
      surname: '',
      email: '',
      password: '',
      password_confirmation: '',
      login_email: '',
      login_password: ''
    }
  },
  computed: {
    invalidCredentials () {
      return this.$store.getters.invalidCredentials
    },
    loginErrors () {
      return this.$store.getters.loginErrors
    }
  },
  methods: {
    registerUser () {
      const user = new URLSearchParams()
      user.append('name', this.name)
      user.append('surname', this.surname)
      user.append('email', this.email)
      user.append('password', this.password)
      user.append('password_confirmation', this.password_confirmation)
      this.$store.dispatch('registerUser', user)
    },
    loginUser () {
      const user = new URLSearchParams()
      user.append('login', this.login_email)
      user.append('password', this.login_password)
      this.$store.dispatch('loginUser', user)
    }
  }
}
</script>
