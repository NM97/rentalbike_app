@import "tailwindcss/base";
@import _ from 'lodash';
@import Vue from 'vue';
<style>
#menu-toggle:checked + #menu {
  display: block;
}
</style>
<template>
  <header class="lg:px-16 px-6 bg-gray-800 flex flex-wrap items-center lg:py-0 py-2">
    <label for="menu-toggle" class="pointer-cursor lg:hidden block">
      <svg
        class="fill-current text-green-400 mr-6"
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
      >
        <title>Menu</title>
        <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z" />
      </svg>
    </label>
    <div class="flex-1 flex justify-between items-center">
      <a href="/">
        <span class="font-bold text-3xl tracking-tight text-green-400">Rental-bike</span>
      </a>
    </div>
    <input class="hidden" type="checkbox" id="menu-toggle" />

    <div class="hidden lg:flex lg:items-center lg:w-auto w-full" id="menu">
      <nav>
        <ul class="lg:flex items-center justify-between text-base text-gray-300 pt-4 lg:pt-0">
          <li>
            <a
              class="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-green-300"
              href="/"
            >Strona domowa</a>
          </li>
          <li>
            <a
              class="lg:p-4 py-3 px-0 block border-b-2 border-transparent hover:border-green-300"
              href="/about"
            >O nas</a>
          </li>
        </ul>
      </nav>
    </div>
    <div>
      <mini-rental2/>
    </div>
    <div>
      <button
        v-if="this.$store.getters.token !== ''"
        class="bg-green-500 hover:bg-green-700 text-white font-bold ml-6 py-2 px-4 rounded-full"
        @click="logout"
      >Wyloguj</button>
    </div>
  </header>
</template>

<script>
import MiniRental2 from '../components/MiniRental2'
export default {
  components: {
    MiniRental2
  },
  methods: {
    logout () {
      this.$store.dispatch('logout').then(() => {
        window.localStorage.clear()
      })
    },
    data () {
      return {
        isOpen: false
      }
    }
  }
}
</script>
