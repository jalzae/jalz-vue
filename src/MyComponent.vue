<template>
  <div class="my-component p-4 bg-blue-500 text-white">
    <p>{{title}}</p>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
  },
  name: "MyComponent",
};
</script>

<style scoped>
@import "tailwindcss/tailwind.css";
</style>
