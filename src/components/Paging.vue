<template>
  <div class="mt-8">
    <button
      :class="{ hidden: page == 1 }"
      type="button"
      class="btn btn-primary"
      @click="prev"
    >
      <i class="fas fa-chevron-left"></i>
    </button>

    <button
      :class="{ hidden: total_page == 1 || total_page == 0 }"
      type="button"
      class="btn btn-default ml-3 btn-round float-end"
    >
      Page: {{ page }} of {{ total_page }}
    </button>

    <button
      :class="{ hidden: page == total_page }"
      type="button"
      class="btn btn-primary ml-3 float-end"
      @click="next"
    >
      <i class="fas fa-chevron-right"></i>
    </button>
  </div>
</template>

<script>
export default {
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
};
</script>
