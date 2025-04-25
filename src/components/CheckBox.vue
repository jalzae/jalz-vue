<template>
  <div class="checkbox-wrapper">
    <label
      :for="generatedId"
      class="checkbox-label"
    >{{ label }}</label>

    <label
      :for="generatedId"
      class="custom-checkbox"
    >
      <input
        :id="generatedId"
        type="checkbox"
        :checked="modelValue"
        @change="toggleChecked"
        class="hidden-checkbox"
        aria-hidden="true"
      />
      <span class="checkmark"></span>
    </label>
  </div>
</template>


<script setup>
import { computed } from "vue";
const props = defineProps({
  modelValue: {
    type: Boolean,
    default: false,
  },
  id: {
    type: String,
    default: "",
  },
  label: {
    type: String,
    default: "",
  },
});

const emit = defineEmits(["update:modelValue"]);

const toggleChecked = () => {
  emit("update:modelValue", !props.modelValue);
};
const generatedId = computed(() => {
  return props.id || props.label.toLowerCase().replace(/\s+/g, "");
});
</script>
<style scoped>
.checkbox-wrapper {
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 600px;
  width: 100%;
  gap: 1rem;
}

.checkbox-label {
  font-size: 1rem;
  font-weight: 500;
  flex-grow: 1;
}

.custom-checkbox {
  display: inline-block;
  width: 24px;
  height: 24px;
  position: relative;
  cursor: pointer;
  flex-shrink: 0;
}

.hidden-checkbox {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}

.checkmark {
  width: 100%;
  height: 100%;
  background-color: white;
  border: 2px solid #4b5563; /* abu-abu */
  border-radius: 4px; /* biar kotaknya nggak terlalu tajam */
  box-sizing: border-box;
  position: relative;
  display: block;
}

/* Tanda centang */
.hidden-checkbox:checked + .checkmark::after {
  content: "";
  position: absolute;
  left: 6px;
  top: 2px;
  width: 6px;
  height: 12px;
  border: solid #2563eb; /* biru */
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}

.hidden-checkbox:checked + .checkmark::after {
  content: "";
  position: absolute;
  left: 6px;
  top: 2px;
  width: 6px;
  height: 12px;
  border: solid #2563eb; /* biru */
  border-width: 0 2px 2px 0;
  transform: rotate(45deg);
}
</style>
