<template>
  <div class="md:w-1/2 sm:w-full bg-gray-50 rounded-lg shadow-md items-center text-center md:p-8 mb-4 mx-4 p-2">
    <h1
      class="font-bold text-gray-700 md:mb-4"
      :class="judulClass"
    >{{ judul }}</h1>
    <div
      :class="desClass"
      v-html="deskripsi"
    >
    
    </div>
  </div>
</template>
<script>

export default{
  props: {
    judul: String,
    deskripsi: String,
    judulClass: {
      type: String,
      default: "",
    },
    desClass: {
      type: String,
      default: "",
    },
  },
}
</script>