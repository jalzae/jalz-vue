<template>
  <div>
    <canvas
      ref="canvas"
      @mousedown="startDrawing"
      @mousemove="draw"
      @mouseup="stopDrawing"
      @mouseleave="stopDrawing"
      class="drawing-canvas"
    ></canvas>

    <button @click="clearCanvas">Clear</button>
    <button
      @click="saveDrawing"
      :disabled="!hasDrawn"
    >Save</button>

    <div v-if="savedImage">
      <p>Saved Image:</p>
      <img
        :src="savedImage"
        alt="Drawing preview"
        class="preview-image"
      />
      <a
        :href="savedImage"
        download="drawing.png"
      >Download Image</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isDrawing: false,
      hasDrawn: false,
      ctx: null,
      savedImage: null,
    };
  },
  mounted() {
    const canvas = this.$refs.canvas;
    canvas.width = 500;
    canvas.height = 300;
    this.ctx = canvas.getContext("2d");
    this.ctx.lineWidth = 3;
    this.ctx.lineCap = "round";
    this.ctx.strokeStyle = "black";
  },
  methods: {
    startDrawing(event) {
      this.isDrawing = true;
      this.hasDrawn = true; // ✅ Detects drawing
      this.ctx.beginPath();
      this.ctx.moveTo(event.offsetX, event.offsetY);
    },
    draw(event) {
      if (!this.isDrawing) return;
      this.ctx.lineTo(event.offsetX, event.offsetY);
      this.ctx.stroke();
    },
    stopDrawing() {
      this.isDrawing = false;
    },
    clearCanvas() {
      this.ctx.clearRect(
        0,
        0,
        this.$refs.canvas.width,
        this.$refs.canvas.height
      );
      this.hasDrawn = false; // Reset draw detection
      this.savedImage = null;
    },
    saveDrawing() {
      this.savedImage = this.$refs.canvas.toDataURL("image/png"); // Get Base64 image
      this.$emit('submitDraw', this.savedImage);
    },
  },
};
</script>

<style>
.drawing-canvas {
  border: 1px solid black;
  cursor: crosshair;
}
.preview-image {
  width: 200px;
  margin-top: 10px;
  border: 1px solid #ccc;
}
</style>
