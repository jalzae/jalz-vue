<template>
  <div>
    <input
      type="text"
      class="custom-input border border-gray-300 rounded outline-none p-2 w-full mt-2"
      v-model="keywords"
      placeholder="Cari sesuatu ??..."
      @keypress.enter="search"
    />
    <br />
    <br />
  </div>
</template>

<script>
export default {
  data() {
    return { keywords: "" };
  },
  methods: {
    search() {
      this.$emit("search", this.keywords);
    },
  },
};
</script>
