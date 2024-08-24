<template>
  <button
    @click="action()"
    class="bg-gradient-to-r from-lime-400 to-yellow-500 rounded-l-full rounded-r-full flex flex-row w-full justify-center items-center md:min-h-50  md:p-2"
    :class="kelas"
  >
    <span
      :class="kelasjudul"
      class="w-2/3 text-white"
    >{{ judul }}</span>
    <span class="w-1/3 text-center text-white">
      <i class="fas fa-right-long rounded-l-full rounded-r-full text-green-400 rounded-icon"></i>
    </span>
  </button>
</template>
<script>
export default {
  mixins: [],
  components: {},
  props: {
    kelas: String,
    judul: String,
    kelasjudul: String,
    action: {
      type: String,
      required: true,
    },
  },
  methods: {
    action() {
      this.$emit(this.action);
    },
  },
};
</script>

<style>
.rounded-icon {
  justify-content: center;
  background-color: #faf8f8aa;
  padding-left: 8px;
  padding-right: 8px;
}
</style>