<template>
  <div>
    <div
      v-if="status"
      class="w-full overflow-x-hidden overflow-y-auto max-h-screen fixed inset-0 z-50 outline-none focus:outline-none justify-center items-center flex"
    >
      <div
        class="relative my-10 mx-4 transition-all"
        :class="[
    'bg-white rounded-lg shadow-lg overflow-y-auto max-h-screen',
    size === 'full' ? 'w-full' :
    size === 'xl' ? 'w-4/5' :
    size === 'md' ? 'w-1/2' :
    size === 'sm' ? 'w-1/4' : ''
  ]"
      >
        <!--content-->
        <div class="border-0 rounded-lg shadow-lg bg-white outline-none focus:outline-none">
          <!--header-->
          <div class="flex items-start justify-between p-5 border-b border-solid border-slate-200 rounded-t">
            <h3 :class="headClass">
              {{ selected.title ?? "Not Found" }}
            </h3>
            <button
              class="text-red-500 p-4"
              @click="close"
            >X</button>
          </div>

          <div
            :class="bodyClass"
            class="w-full h-full p-8"
          >
            <component :is="selected.component" />
          </div>

          <!--footer-->
          <div class="flex items-center justify-end p-6 border-t border-solid border-slate-200 rounded-b">
            <component :is="selected.footer" />
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="status"
      :class="customClass"
      class="opacity-25 fixed inset-0 z-40 bg-black"
    ></div>
  </div>
</template>

<script>
import NotFound from "./NotFound.vue";
export default {
  props: {
    headClass: { type: String, default: "" },
    bodyClass: { type: String, default: "" },
    customClass: { type: String, default: "" },
    status: { type: Boolean, default: false },
    size: { type: String, default: "full" },
    selected: {
      type: Object,
      default: {
        title: "Not Found",
        component: NotFound,
        footer: null,
      },
    },
  },
  methods: {
    close() {
      this.$emit("close");
    },
  },
};
</script>