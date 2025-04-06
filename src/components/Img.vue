<template>
  <img
    :src="imageSrc"
    :alt="alt"
    :class="imageClass"
    @error="onImageError"
  />
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true,
    },
    alt: {
      type: String,
      default: "",
    },
    fallbackSrc: {
      type: String,
      default: null,
    },
    imageClass: {
      type: String,
      default: "",
    },
  },

  data() {
    return {
      imageSrc: "",
      // Base64 encoded placeholder image (gray background with image icon)
      defaultFallback:
        "data:image/svg+xml;base64," +
        btoa(`
    <svg width="200" height="200" xmlns="http://www.w3.org/2000/svg">
      <rect width="100%" height="100%" fill="#eee"/>
      <text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle"
        font-size="20" font-family="Arial, sans-serif" fill="#999">
        Not Found
      </text>
    </svg>
  `),
    };
  },

  created() {
    // Initialize with the provided source
    this.imageSrc = this.src;
  },

  methods: {
    onImageError() {
      // If current src is already the fallbackSrc, then set base64 fallback
      if (this.imageSrc === this.fallbackSrc && this.fallbackSrc !== null) {
        this.imageSrc = this.defaultFallback;
      } else if (this.fallbackSrc) {
        this.imageSrc = this.fallbackSrc;
      } else {
        this.imageSrc = this.defaultFallback;
      }
    },
  },

  watch: {
    // Update image source if the prop changes
    src(newSrc) {
      this.imageSrc = newSrc;
    },
  },
};
</script>