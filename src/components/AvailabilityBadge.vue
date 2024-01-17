<template>
        <span
        class="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2"
        :class="{'bg-green-400': available, 'bg-red-400': !available}"
        >
            <template v-if="available">
                Dostępny
            </template>
            <template v-if="!available">
                Niedostępny
            </template>
        </span>
</template>

<script>
export default {
  props: {
    available: {
      type: Number,
      default: 1
    }
  }
}
</script>
