<template>
  <div>
    <link
      rel="stylesheet"
      href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
      integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
      crossorigin="anonymous"
      referrerpolicy="no-referrer"
    />

    <div id="iconBar">
      <button
        @click="toggleMode"
        :class="{ active: isHtml }"
      >
        <i class="fas fa-exchange-alt"></i>
      </button>
      <button
        @click="removeFormatting"
        :disabled="isHtml"
      >
        <i class="fas fa-eraser"></i>
      </button>
      <button
        @click="formatText('bold')"
        :class="{ active: isBold }"
        :disabled="isHtml"
      >
        <i class="fas fa-bold"></i>
      </button>
      <button
        @click="formatText('italic')"
        :class="{ active: isItalic }"
        :disabled="isHtml"
      >
        <i class="fas fa-italic"></i>
      </button>
      <button
        @click="formatText('underline')"
        :class="{ active: isUnderline }"
        :disabled="isHtml"
      >
        <i class="fas fa-underline"></i>
      </button>
    </div>

    <div v-if="isHtml">
      <textarea
        v-model="content"
        @input="$emit('update:model', content)"
        class="editor-area"
      ></textarea>
    </div>
    <div
      v-else
      ref="editor"
      contenteditable="true"
      @blur="updateHtml"
      @keyup="updateFormatting"
      @mouseup="updateFormatting"
      v-html="content"
      style="direction: inherit;"
      class="editor-area"
    ></div>
  </div>
</template>

<script>
export default {
  props: {
    model: String,
  },
  data() {
    return {
      isHtml: false,
      content: this.model,
      isBold: false,
      isItalic: false,
      isUnderline: false,
    };
  },
  watch: {
    model(newVal) {
      if (newVal !== this.content) {
        this.content = newVal;
      }
    },
  },
  methods: {
    toggleMode() {
      this.isHtml = !this.isHtml;
    },
    updateHtml(event) {
      this.content = event.target.innerHTML;
      this.$emit("update:model", this.content);
    },
    formatText(command) {
      document.execCommand(command, false, null);
      this.updateFormatting();
    },
    updateFormatting() {
      this.isBold = document.queryCommandState("bold");
      this.isItalic = document.queryCommandState("italic");
      this.isUnderline = document.queryCommandState("underline");
    },
    removeFormatting() {
      document.execCommand("removeFormat", false, null);
      this.updateFormatting();
    },
  },
};
</script>


<style scoped>
#iconBar {
  display: flex;
  gap: 5px;
  margin-bottom: 10px;
  border: 1px solid #eee;
  padding: 4px;
  background: #eee;
}
button {
  background: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
}

button:hover {
  background: rgba(0, 0, 0, 0.1);
}
button:disabled {
  cursor: not-allowed;
  opacity: 0.5;
}
button.active {
  background: rgba(0, 0, 255, 0.2);
}
.editor-area {
  min-height: 200px;
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  font-size: 16px;
}
</style>