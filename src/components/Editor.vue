<template>
  <div class="w-full">
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
      integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />
    <div class="toolbar">
      <button
        @click="format('bold')"
        title="Bold"
      >
        <i class="fa fa-bold"></i>
      </button>
      <button
        @click="format('italic')"
        title="Italic"
      >
        <i class="fa fa-italic"></i>
      </button>
      <button
        @click="format('underline')"
        title="Underline"
      >
        <i class="fa fa-underline"></i>
      </button>
    </div>

    <div
      class="editor"
      contenteditable="true"
      @input="updateContent"
      ref="editor"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    content: String,
  },
  methods: {
    updateContent(event) {
      const newContent = event.target.innerHTML;
      // Emit the updated content to the parent
      this.$emit("update:content", newContent);
    },
    format(command) {
      document.execCommand(command, false, null);
    },
  },
  watch: {
    content(newValue) {
      if (this.$refs.editor.innerHTML !== newValue) {
        this.$refs.editor.innerHTML = newValue;
      }
    },
  },
  mounted() {
    this.$refs.editor.innerHTML = this.content || "";
  },
};
</script>

<style>
.editor {
  border: 1px solid #ccc;
  padding: 10px;
  min-height: 100px;
}

/* Toolbar styling */
.toolbar {
  display: flex;
  justify-content: start;
  gap: 10px;
  background-color: #f4f4f4;
  border-bottom: 1px solid #ccc;
  padding: 10px;
}

/* Buttons styling */
.toolbar button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 18px;
  color: #333;
  transition: color 0.2s ease;
}

.toolbar button:hover {
  color: #007bff;
}
</style>


