<template>
  <div id="app">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
      integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />

    <h1>Test Vue Components</h1>
    <FallbackImage
      src="/images/profile.jpg"
      alt="Profile photo"
      image-class="rounded-full w-20 h-20 object-cover"
    />
  </div>
</template>

<script>
import FallbackImage from "./components/Img.vue";
export default {
  components: {
    FallbackImage,
  },
  methods: {},
  data() {
    return {};
  },
};
</script>
