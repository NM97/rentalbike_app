<template>
  <section class="w-full top-0">
    <div class="container mx-auto px-4 h-full">
      <div class="flex content-center items-center justify-center h-full">
        <div class="w-full lg:w-4/12 px-4 pt-32">
          <div
            class="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0"
          >
            <div class="flex-auto px-4 lg:px-10 py-10 pt-0">
              <div
                class="mt-8 text-gray-900 text-center mb-3 font-bold"
              >Logowanie do panelu administracyjnego</div>
              <form>
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-gray-700 text-xs font-bold mb-2"
                    for="grid-password"
                  >Email</label>
                  <input
                    type="email"
                    class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"
                    style="transition: all 0.15s ease 0s;"
                    id="login_email"
                    name="login_email"
                    v-model="login_email"
                    placeholder="Adres email"
                  />
                </div>
                <div class="relative w-full mb-3">
                  <label
                    class="block uppercase text-gray-700 text-xs font-bold mb-2"
                    for="grid-password"
                  >Hasło</label>
                  <input
                    type="password"
                    class="px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:shadow-outline w-full"

                    style="transition: all 0.15s ease 0s;"
                    id="login_password"
                    name="login_password"
                    v-model="login_password"
                    placeholder="Hasło"
                  />
                </div>
                <div class="text-center mt-6">
                  <button
                    class="bg-green-400 text-white active:bg-green-300 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                    type="button"
                    style="transition: all 0.15s ease 0s;"
                    @click="loginEmployee"
                  >Zaloguj</button>
                </div>
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
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
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
    loginEmployee () {
      const user = new URLSearchParams()
      user.append('login', this.login_email)
      user.append('password', this.login_password)
      this.$store.dispatch('loginEmployee', user)
    }
  }
}
</script>
