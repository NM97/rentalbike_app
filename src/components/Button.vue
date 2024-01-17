<template>
  <button
    class="py-3 px-5 text-white text-2x1"
    :class="{'bg-black': dark, 'bg-pink-300': !dark}"
  >This is a button.</button>
</template>

<script>
export default {
  name: 'Button',
  props: {
    dark: {
      type: Boolean,
      default: false
    }
  }
}
</script>
