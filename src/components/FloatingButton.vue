<template>
  <div
    class="fixed bottom-4 right-4"
    :class="classing"
  >
    <button
      @click="$emit(action)"
      class="bg-green-500 p-4 rounded-full shadow-lg hover:bg-green-600 focus:outline-none focus:shadow-outline-green"
    >
      <img
        :src="image"
        alt="Icon"
        class="w-6 h-6"
      />
    </button>
  </div>
</template>

<script>

export default{
  props: {
    image: {
      type: String,
      default: "",
    },
    action: {
      type: String,
      default: "",
    },
    classing: {
      type: String,
      default: "",
    },
  },
  methods: {},
}
</script>