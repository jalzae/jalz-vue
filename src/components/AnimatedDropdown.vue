<template>
  <div
    :class="['animated-dropdown-container', classCustom?.container]"
    :style="containerStyle"
  >
    <select
      :value="modelValue"
      @input="$emit('update:modelValue', $event.target.value)"
      @focus="focused = true"
      @blur="focused = false"
      :class="[
        'animated-dropdown', 
        { 'dropdown-focused': focused },
        classCustom?.dropdown
      ]"
      :style="dropdownStyle"
      :disabled="disabled"
    >
     
      <option
        v-for="items in options"
        :key="items[value]"
        :value="items[value]"
      >
        {{ items[display] }}
      </option>
    </select>
    <label
      :class="[
        'animated-label',
        { 
          'label-active': focused || modelValue,
          'label-focused': focused 
        },
        classCustom?.label,
        (focused || modelValue) && classCustom?.labelActive,
        focused && classCustom?.labelFocused
      ]"
      :style="labelStyle"
    >
      {{ label }}
    </label>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";

const props = defineProps({
  modelValue: {
    type: [String, Number],
    default: "",
  },
  label: {
    type: String,
    default: "Select an option",
  },
  options: {
    type: Array,
    default: () => [],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  value: { type: String },
  display: { type: String },
  classCustom: {
    type: Object,
    default: null,
  },
  // Style customization props
  colors: {
    type: Object,
    default: () => ({}),
    // Can include: borderColor, focusBorderColor, labelColor, labelFocusColor, backgroundColor
  },
  padding: {
    type: Object,
    default: () => ({}),
    // Can include: top, right, bottom, left or just a single value
  },
  margin: {
    type: Object,
    default: () => ({}),
    // Can include: top, right, bottom, left or just a single value
  },
});

defineEmits(["update:modelValue"]);

const focused = ref(false);

// Compute styles based on props
const containerStyle = computed(() => {
  const style = {};

  if (props.margin) {
    if (props.margin.top) style.marginTop = formatSize(props.margin.top);
    if (props.margin.right) style.marginRight = formatSize(props.margin.right);
    if (props.margin.bottom)
      style.marginBottom = formatSize(props.margin.bottom);
    if (props.margin.left) style.marginLeft = formatSize(props.margin.left);
    if (props.margin.value) style.margin = formatSize(props.margin.value);
  }

  return style;
});

const dropdownStyle = computed(() => {
  const style = {};

  if (props.colors) {
    if (props.colors.borderColor) style.borderColor = props.colors.borderColor;
    if (props.colors.backgroundColor)
      style.backgroundColor = props.colors.backgroundColor;
    if (focused.value && props.colors.focusBorderColor) {
      style.borderColor = props.colors.focusBorderColor;
      style.boxShadow = `0 0 0 1px ${props.colors.focusBorderColor}`;
    }
  }

  if (props.padding) {
    if (props.padding.top) style.paddingTop = formatSize(props.padding.top);
    if (props.padding.right)
      style.paddingRight = formatSize(props.padding.right);
    if (props.padding.bottom)
      style.paddingBottom = formatSize(props.padding.bottom);
    if (props.padding.left) style.paddingLeft = formatSize(props.padding.left);
    if (props.padding.value) style.padding = formatSize(props.padding.value);
  }

  return style;
});

const labelStyle = computed(() => {
  const style = {};

  if (props.colors) {
    if (props.colors.labelColor) style.color = props.colors.labelColor;
    if (focused.value && props.colors.labelFocusColor) {
      style.color = props.colors.labelFocusColor;
    }
  }

  if (props.padding && props.padding.left) {
    style.left = formatSize(props.padding.left);
  }

  return style;
});

// Helper function to format size values
function formatSize(size) {
  if (typeof size === "number") {
    return `${size}px`;
  }
  return size;
}
</script>

<style scoped>
.animated-dropdown-container {
  position: relative;
  width: 100%;
}

.animated-dropdown {
  width: 100%;
  padding: 16px 16px 8px 16px;
  font-size: 16px;
  border: 1px solid #ccc;
  border-radius: 4px;
  outline: none;
  transition: all 0.2s ease;
  background-color: white;
  appearance: none;
  background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='16' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpath d='m6 9 6 6 6-6'/%3E%3C/svg%3E");
  background-repeat: no-repeat;
  background-position: right 12px center;
  cursor: pointer;
  margin-top: 4px;
}

.animated-dropdown:focus {
  border-color: #0590be;
  box-shadow: 0 0 0 1px #0590be;
  margin-top: 4px;
}

.dropdown-focused {
  border-color: #0590be;
  box-shadow: 0 0 0 1px #0590be;
  margin-top: 4px;
}

.animated-dropdown:disabled {
  background-color: #f3f4f6;
  cursor: not-allowed;
  opacity: 0.7;
  margin-top: 4px;
}

.animated-label {
  position: absolute;
  left: 16px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 16px;
  color: #6b7280;
  pointer-events: none;
  transition: all 0.2s ease;
}

.label-active {
  top: 8px;
  font-size: 12px;
  transform: translateY(0);
}

.label-focused {
  color: #0590be;
}
</style>