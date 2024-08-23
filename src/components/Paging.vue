<template>
  <center class="mt-8">
    <button
      :class="{ hiden: page == 1 }"
      type="button"
      class="btn btn-primary"
      @click="prev"
    >
      <i class="fas fa-chevron-left"></i>
    </button>

    <button
      :class="{ hiden: total_page == 1 || total_page == 0 }"
      type="button"
      class="btn btn-default ml-3 btn-round float-end"
    >
      Page: {{ page }} of {{ total_page }}
    </button>

    <button
      :class="{ hiden: page == total_page }"
      type="button"
      class="btn btn-primary ml-3 float-end"
      @click="next"
    >
      <i class="fas fa-chevron-right"></i>
    </button>
  </center>
</template>
<script>
import { defineComponent } from "vue";
export default defineComponent({
  mixins: [],
  components: {},
  props: {
    page: Number,
    per_page: Number,
    total_page: Number,
  },
  methods: {
    async prev() {
      this.$emit("prevpage");
    },
    async next() {
      this.$emit("nextpage");
    },
  },
  data() {
    return {};
  },
  mounted() {},
  computed: {},
  watch: {},
});
</script>

<style>
.hiden {
  display: none !important;
}
</style>