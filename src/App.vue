<template>
  <div class="min-h-screen flex items-center justify-center bg-gray-50 p-4">
    <div class="w-full max-w-md space-y-6 bg-white p-8 rounded-xl shadow-md">
      <h1 class="text-2xl font-bold text-gray-800 text-center">Animated Input Demo</h1>

      <form
        @submit.prevent="handleSubmit"
        class="space-y-4"
      >
        <AnimatedInput
          v-model="formData.name"
          label="Full Name"
        />

        <AnimatedInput
          v-model="formData.email"
          label="Email Address"
          type="email"
          :colors="{
              borderColor: '#3b82f6',
              focusBorderColor: '#2563eb',
              labelColor: '#6b7280',
              labelFocusColor: '#2563eb',
            }"
          :padding="{
              top: 20,
              bottom: 12,
            }"
        />

        <AnimatedInput
          v-model="formData.password"
          label="Password"
          type="password"
        />

        <button
          type="submit"
          class="w-full py-2 px-4 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
        >
          Submit
        </button>
      </form>

      <div
        v-if="submitted"
        class="mt-4 p-4 bg-emerald-50 text-emerald-700 rounded-md"
      >
        <p><strong>Name:</strong> {{ formData.name }}</p>
        <p><strong>Email:</strong> {{ formData.email }}</p>
        <p><strong>Password:</strong> ********</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive } from "vue";
import AnimatedInput from "../src/components/AnimatedInput.vue";

const formData = reactive({
  name: "",
  email: "",
  password: "",
});

const submitted = ref(false);

const handleSubmit = () => {
  submitted.value = true;
  // In a real app, you would handle form submission here
  console.log("Form submitted:", formData);
};
</script>