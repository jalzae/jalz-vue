<template>
  <div class="flex py-2 px-4 rounded-lg border border-amber-800">
    <p
      v-for="items, index in list"
      :key="items.action"
      :class="items.class"
      class="cursor-pointer text-amber-800"
      @click="$emit(items.action)"
    >
      <span
        v-if="index > 0"
        class="mx-2 text-amber-200"
      >|</span>
      <i
        :class="items.icon"
        class="mr-1"
      ></i>
      {{ items.text }}
    </p>
  </div>
</template>
<script lang='ts'>
import { defineComponent } from "vue";
import { actions } from "../model/tables";
export default defineComponent({
  props: {
    list: {
      type: Array as () => actions[],
      default: [],
    },
  },
});
</script>