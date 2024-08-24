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
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    keywords: { type: String },
  },
  methods: {
    search() {
      this.$emit("search");
    },
  },
});
</script>
