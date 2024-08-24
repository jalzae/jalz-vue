<template>
  <button
    @click="$emit(action, value)"
    class="rounded-sm text-white p-2 shadow-md"
    :class="background"
  >
    {{ title }}
  </button>
</template>
<script lang="ts">
import { defineComponent } from "vue";
export default defineComponent({
  props: {
    title: String,
    background: String,
    action: String,
    value: String,
  },
});
</script>
