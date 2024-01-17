<template>
        <div class="flex flex-row-reverse w-auto ml-5  float-right">
      <div slot="icon" class="relative mr-5">
        <div
          class="absolute text-xs rounded-full -mt-1 -mr-2 px-1 font-bold top-0 right-0 bg-red-700 text-white"
        >{{this.$store.state.rental.length }}</div>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          class="w-6 h-6 mt-2 fill-current text-green-400"
          @click="rental"
        >
          <path d="M2 2c0-1.1.9-2 2-2h12a2 2 0 012 2v18l-8-4-8 4V2z" />
        </svg>
      </div>
    </div>
</template>

<script>

export default {

  methods: {
    rental () {
      this.$router.push('/rental')
    }
  }
}
</script>
