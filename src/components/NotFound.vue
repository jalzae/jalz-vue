<template>
  <div class="w-full bg-red-500 text-white justify-center items-center flex">
    <img
      v-if="isImage"
      :class="classing"
      :src="src"
    />
    <p class="text-4xl text-center">Not Found Feature</p>
  </div>
</template>
<script lang='ts'>
import { defineComponent } from "vue";
export default defineComponent({
  setup() {},
  mixins: [],
  components: {},
  props: {
    isImage: {
      type: Boolean,
      default: false,
    },
    src: {
      type: String,
      default: "",
    },
    classing: {
      type: String,
      default: "",
    },
  },
  methods: {},
  mounted() {},
  computed: {},
  watch: {},
  created() {},
});
</script>